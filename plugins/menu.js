import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
try {
// رابط الصورة المباشر (صورتك يا أمير)
let imgUrl = 'https://i.ibb.co/Gf1mZYmc/amir-mimo.jpg' 
let img = await(await fetch(imgUrl)).buffer().catch(_ => null) 

let d = new Date(new Date + 3600000)
let locale = 'ar'
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let user = global.db.data.users[m.sender]
let { money, level, role } = user
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]

let str = `
*☢︎︎☠︎︎📆 التـاريخ:* ${date}
*☢︎︎☠︎︎🕛 وقـت النشـاط:* ${uptime}
*☢︎︎☠︎︎🎖️ المـستوى:* ${level}
*☢︎︎☠︎︎👾 عـملات:* ${money}

*✍︎☢︎︎ اسـم الـبوت : مـيـمـو الـفـرفـور* 🤖
*✍︎☢︎︎ اســم الـمطور : أمـيـر* 👑
*✍︎☢︎︎ تفضل القائمة يا* ${taguser}

_☠︎︎🔏☠︎︎━━ │الـقـروب│━━☠︎︎🔏☠︎︎_
*✓ ضيف | طرد | ترقية | منشن*
*✓ اعفاء | تحذير | مخفي | ايات*

_✓⬇️✯ ━━│الـتـنزيـل│━━✯⬇️✓_
*✓ انستا | شغل | تيكتوك | فيديو*

👑┑━━━حـقـوق الـمـطـور━━━┍👑
*❗ رقـم الـمطـور أمـيـر ↯*
❗ https://wa.me/218922937732
👑┙━━━حـقـوق الـمـطـور━━━┕👑
`.trim()

await conn.sendMessage(m.chat, { 
    image: { url: imgUrl }, 
    caption: str, 
    mentions: [m.sender],
    footer: 'بـوت مـيـمـو الـفـرفـور 👑',
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            mediaType: 1,
            title: '👑 مـطـور الـبـوت أمـيـر 👑',
            body: 'بـوت مـيـمـو الفرفور الليبي 😂🔥',
            thumbnail: img,
            sourceUrl: 'https://wa.me/218922937732'
        }
    }
}, { quoted: m })

} catch (e) {
console.error(e)
conn.reply(m.chat, '[❗ خطأ في القائمة يا غالي ❗]', m)
}}

handler.command = /^(help|الاوامر|menu|أوامر|اوامر)$/i
export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
