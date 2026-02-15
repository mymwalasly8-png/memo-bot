import { smsg } from './lib/simple.js'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function handler(chatUpdate) {
    if (!chatUpdate) return
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return
    if (global.db.data == null) await global.loadDatabase()

    try {
        m = smsg(this, m) || m
        if (!m || m.isBaileys) return

        // 1. نظام ميمو (Gemini) - تم تصحيح السطر هنا
        if (m.text && m.text.toLowerCase().startsWith('ميمو')) {
            let prompt = m.text.replace(/ميمو/i, '').trim()
            if (!prompt) return m.reply('عيون ميمو، ها شن في؟ قول سؤوالك يا غالي')

            try {
                // تأكد أن المفتاح صحيح في Secrets أو سيستخدم المفتاح الاحتياطي المكتوب
                const apiKey = process.env.GOOGLE_AI_KEY || "AIzaSyDAibBYSXMe1tRJpyK5W3UXpTYvvqQLDCw"
                const genAI = new GoogleGenerativeAI(apiKey)
                
                // تنظيف استدعاء الموديل واستخدام الإصدار الأحدث
                const model = genAI.getGenerativeModel({ 
                    model: "gemini-1.5-flash-latest",
                    systemInstruction: "أنت ميمو، بوت واتساب ليبي مرح جداً وذكي. مطورك هو أمير. رد على الناس بلهجة ليبية (طرابلسية، بنغازية، أو شرقية) حسب الجو. خليك صايع وشاطر في الردود وما تكونش رسمي نهائياً."
                })
                
                const result = await model.generateContent(prompt)
                const response = await result.response
                return m.reply(response.text())

            } catch (err) {
                console.error("Gemini Error:", err)
                return m.reply("يا حب، ميمو مكسر راسي شوية (مشكلة في المفتاح أو السيرفر)، جرب بعدين! 🛠️")
            }
        }

        // 2. نظام الأوامر (تنزيل، زواج، إلخ)
        let usedPrefix = (/[./!#]/.exec(m.text) || [''])[0]
        if (usedPrefix) {
            let noPrefix = m.text.replace(usedPrefix, '').trim()
            let [command, ...args] = noPrefix.split` `.filter(v => v)
            command = (command || '').toLowerCase()

            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin || plugin.disabled) continue

                const isAccept = Array.isArray(plugin.command) ? plugin.command.includes(command) : plugin.command === command

                if (isAccept) {
                    let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat).catch(_ => ({})) : {}
                    let participants = m.isGroup ? (groupMetadata.participants || []) : []
                    
                    let extra = {
                        conn: this,
                        usedPrefix,
                        noPrefix,
                        args,
                        command,
                        text: args.join(' '),
                        participants,
                        groupMetadata
                    }

                    try {
                        await plugin.call(this, m, extra)
                    } catch (e) {
                        console.error(e)
                        m.reply(`*❌ خطأ في الأمر:* ${e.message}`)
                    }
                    break
                }
            }
        }
    } catch (e) {
        console.error("Global Handler Error:", e)
    }
}


