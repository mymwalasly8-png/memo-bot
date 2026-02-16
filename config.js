import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

// --- إعدادات المطور (أمير المالك الحقيقي) ---
global.owner = [
  ['218922937732', '❄️ أمير 🧿', true]
]; // تأكد أن القوس المربع مسكر صح

global.suittag = ['218922937732'];
global.prems = ['218922937732'];

// --- إعدادات البوت (ميمو فالطه) ---
global.packname = 'بوت ميمو';
global.author = '★أمير★';
global.wm = '★بوت ميمو★';
global.titulowm = '🤖 بوت ميمو 🤖';
global.titulowm2 = `乂 بوت ميمو 乂`;
global.igfg = '★بوت ميمو★';
global.gt = '★بوت ميمو★';
global.mysticbot = '★بوت ميمو★';
global.md = 'https://wa.me/218922937732'; 

// --- رسائل التحميل (باللهجة الليبية) ---
global.wait = '*⌛ _اصبر شوية ميمو يجهز في الطلب..._*';
global.waitt = '*⌛ _خليك صبور يا طيري، ميمو قاعد يحمل..._*';
global.waittt = '*⌛ _ميمو الفرفور يشتغل توا، استنى شوية..._*';
global.waitttt = '*⌛ _جاري التحميل بنجاح..._*';

// --- الصور ---
global.imagen1 = './Menu2.jpg'; 
global.imagen4 = './Menu.png';
global.imagen6 = './Menu3.png';

// --- إعدادات الوقت ---
const timezone = 'Africa/Tripoli';
global.dia = moment.tz(timezone).format('dddd');
global.fecha = moment.tz(timezone).format('DD/MM/YYYY');
global.mes = moment.tz(timezone).format('MMMM');
global.año = moment.tz(timezone).format('YYYY');
global.tiempo = moment.tz(timezone).format('hh:mm:ss A');

// --- التذييل ---
global.wm2 = `▸ ${global.dia} ${global.fecha}\n▸ بـوت مـيـمـو الـفـرفـور 😂🔥`;

// --- شخصية ميمو الفرفور ---
global.botName = 'ميمو الفرفور';
global.chatgpt_prompt = `أنت ميمو، بوت ليبي فرفور ومسهوك جداً. مطورك هو أمير. تكلم بلهجة ليبية مخلطة بمصري. ردودك لازم تكون مضحكة وفيها إيموجيات ضحك هلبا 😂💀🔥. استخدم كلمات زي "يا روحي، يا قشطة، يا طيري، لوز اللوز". خليك ديما "بتاع سهوكة" ودمك خفيف وما تردش ردود رسمية أبداً.`;

// --- روابط الزينة ---
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&fontsize=90&text=MEMO',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&text=AMIR',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&fontsize=90&text=MEMO-BOT'
];

// --- نظام التحديث التلقائي ---
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("تم تحديث إعدادات المالك أمير!"));
  import(`${file}?update=${Date.now()}`);
});


