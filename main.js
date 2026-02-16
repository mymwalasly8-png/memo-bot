// إعدادات البيئة لتعطيل فحص الشهادات
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import './config.js';
import './api.js';
import {createRequire} from 'module';
import path from 'path';
import {fileURLToPath, pathToFileURL} from 'url';
import {platform} from 'process';
import {readdirSync} from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';
import pino from 'pino';
import {Boom} from '@hapi/boom'; 
// استيراد lowdb بالنسخة المستقرة
import { Low, JSONFile } from 'lowdb';

const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore,
    jmp 
} = (await import('@whiskeysockets/baileys')).default;

// إعدادات المسارات
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; 
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; 

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

// --- مفتاح الذكاء الاصطناعي الخاص بك ---
global.googleAiKey = 'AIzaSyD7WzAwXOrT3UCn3nsMIdPc5ZY0L_5z9xE'; 

// إعداد قاعدة البيانات (database.json)
global.db = new Low(new JSONFile(`database.json`));
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = { users: {}, chats: {}, stats: {}, msgs: {}, sticker: {}, settings: {}, ...(global.db.data || {}), };
};
loadDatabase();

// إعداد مجلد الأوامر (Plugins)
const pluginFolder = path.join(global.__dirname(import.meta.url), 'plugins');
const pluginFilter = filename => /\.js$/.test(filename);
global.plugins = {};

async function loadPlugins() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let name = path.join(pluginFolder, filename);
      let plugin = await import(pathToFileURL(name).toString());
      global.plugins[filename] = plugin.default || plugin;
    } catch (e) {
      console.error(`❌ خطأ في تحميل الأمر ${filename}:`, e);
    }
  }
}
await loadPlugins();
console.log(chalk.green(`✅ تم تحميل ${Object.keys(global.plugins).length} أمر بنجاح!`));

// إعدادات الاتصال بالواتساب
global.authFile = `MysticSession`;
const {state, saveCreds} = await useMultiFileAuthState(global.authFile);
const {version} = await fetchLatestBaileysVersion();

const connectionOptions = {
  printQRInTerminal: true, 
  logger: pino({level: 'fatal'}), 
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})),
  },
  browser: ['Memo Bot', 'Chrome', '1.0.0'],
  version,
};

global.conn = makeWASocket(connectionOptions);

async function connectionUpdate(update) {
  const {connection, lastDisconnect, qr} = update;
  
  // طباعة الباركود
  if (qr) {
      console.log(chalk.bold.yellow('\n📸 الباركود جاهز! صوره من تليفونك توة:\n'));
  }
  
  if (connection == 'open') {
      console.log(chalk.green('\n✅ تم الاتصال بنجاح! ميمو بوت شغال توة بذكاء Gemini.. 🕺\n'));
  }
  
  if (connection === 'close') {
    const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    console.log(chalk.red(`❌ تم قطع الاتصال، السبب: ${reason}. جاري إعادة المحاولة...`));
    if (reason !== DisconnectReason.loggedOut) await global.reloadHandler(true).catch(console.error);
  }
}

// معالج الأوامر (Handler)
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) { console.error(e); }

  if (handler.handler) conn.handler = handler.handler.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  conn.ev.on('messages.upsert', (chatUpdate) => {
    const m = chatUpdate.messages[0];
    if (!m.message) return;
    
    // طباعة الرسائل في الـ Terminal لمتابعة الشات
    const senderName = m.pushName || 'مجهول';
    const msgText = m.message.conversation || m.message.extendedTextMessage?.text || 'وسائط';
    console.log(chalk.cyan(`[ شات ]`), chalk.white(`${senderName}:`), chalk.yellow(msgText));
    
    if (conn.handler) conn.handler(chatUpdate);
  });

  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  return true;
};

await global.reloadHandler();
console.log(chalk.cyan("🚀 ميمو بوت الفرفور في انتظارك... صبلي شاهي!"));
