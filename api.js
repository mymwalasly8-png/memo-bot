import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

// --- مفاتيح الذكاء الاصطناعي (OpenAI) ---
global.openai_key = 'sk-0';
global.openai_org_id = 'org-3';

// --- مفاتيح الـ APIs (خلوها زي ما هي باش يخدم البوت) ---
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = global.keysZens[Math.floor(global.keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = global.keysxteammm[Math.floor(global.keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = global.keysneoxrrr[Math.floor(global.keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['BrunoSobrino_2']; 
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.APIs = {
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
};

global.APIKeys = {
  'https://api.xteam.xyz': `${global.keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${global.keysneoxr}`,
  'https://api.zahwazein.xyz': `${global.keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

// --- نظام الألعاب (RPG) - تعريب أمير ---
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    const emot = {
      level: '🧬 المستوى',
      limit: '🪙 الماسات',
      exp: '⚡ خبرة',
      bank: '🏦 المصرف',
      diamond: '💎 الماس',
      health: '❤️ الصحة',
      kyubi: '🌀 سحر ميمو',
      joincount: '💵 توكن',
      emerald: '💚 زمرد',
      stamina: '✨ طاقة',
      role: '💪 الرتبة',
      premium: '🎟️ مميز',
      pointxp: '📧 نقاط الخبرة',
      gold: '👑 ذهب',
      trash: '🗑 قمامة',
      crystal: '🔮 كريستال',
      intelligence: '🧠 ذكاء الفرفور',
      string: '🕸️ خيوط',
      keygold: '🔑 مفتاح ذهبي',
      keyiron: '🗝️ مفتاح حديد',
      emas: '🪅 هدايا',
      fishingrod: '🎣 صنارة صيد',
      gems: '🍀 جوهرة',
      magicwand: '⚕️ عصا سحرية',
      mana: '🪄 تعويذة',
      agility: '🤸‍♂️ خفة حركة',
      darkcrystal: '♠️ كريستال أسود',
      iron: '⛓️ حديد',
      rock: '🪨 صخر',
      potion: '🥤 مشروب طاقة',
      superior: '💼 حقيبة كبيرة',
      robo: '🚔 شرطة ميمو',
      upgrader: '🧰 تطوير',
      wood: '🪵 خشب',
      strength: '🦹‍♀️ قوة المطور',
      arc: '🏹 قوس',
      armor: '🥼 درع حماية',
      bow: '🏹 قوس خارق',
      pickaxe: '⛏️ فأس منجم',
      sword: '⚔️ سيف المطور',
      common: '📦 صندوق عادي',
      uncoommon: '🥡 صندوق نادر',
      mythic: '🗳️ صندوق أسطوري',
      legendary: '🎁 صندوق الملوك',
      petFood: '🍖 ماكلة الحيوان',
      pet: '🍱 صندوق الحيوانات',
      money: '👾 عملات ميمو',
      chicken: '🐓 دجاجة',
      cow: '🐄 بقرة',
      dog: '🐕 كلب ميمو',
      dragon: '🐉 تنين النار',
      elephant: '🐘 فيل',
      fox: '🦊 ثعلب مكار',
      lion: '🦁 أسد ليبيا',
      panda: '🐼 باندا',
      snake: '🐍 حنش',
      wolf: '🐺 ذيب',
      tiger: '🐅 نمر',
      fish: '🐟 حوتة',
      knife: '🔪 موس بوشوكية'
    };
    const results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
};

// --- نظام المتجر (RPG Shop) ---
global.rpgshop = {
  emoticon(string) {
    string = string.toLowerCase();
    const emottt = {
      exp: '⚡ طاقة',
      limit: '🪙 عملات أمير',
      diamond: '💎 الماسات',
      joincount: '💵 فلوس',
      emerald: '💚 زمرد',
      berlian: '♦️ جوهرة',
      gold: '👑 ذهب الملك',
      money: '👾 نقاط ميمو',
      tiketcoin: '🎫 تذاكر الحظ',
      stamina: '✨ مجهود',
      potion: '🥤 دواء حية',
      trash: '🗑 قمامة',
      wood: '🪵 لوح خشب',
      rock: '🪨 حجرة',
      string: '🕸️ خيوط',
      iron: '⛓️ حديد صلب',
      sword: '⚔️ سيف قاطع',
      umpan: '🪱 طعمة صيد',
      common: '📦 صندوق الرزق',
      uncoommon: '🥡 صندوق الحظ',
      mythic: '🗳️ صندوق ميمو الخارق',
      legendary: '🎁 كنز المطور أمير',
      petFood: '🍖 عشاء الحيوانات',
      kucing: '🐈 قطوس ميمو',
      naga: '🐉 دراغون بول',
      fox: '🦊 ثعلب',
      kuda: '🐎 حصان أصيل',
      wolf: '🐺 ذيب الغابة',
      anjing: '🐶 كلب الحراسة'
    };
    const results = Object.keys(emottt).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emottt[results[0][0]];
  }
};

// --- نظام تحديث الملف ---
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("تم تحديث إعدادات ميمو وأمير بنجاح! 🔥"));
  import(`${file}?update=${Date.now()}`);
});

