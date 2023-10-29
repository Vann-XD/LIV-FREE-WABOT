neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   Func
}) => {
   try {
      let system = global.db.setting
      if (command == 'prefix') {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, '#'), m)
         if (args[0].length > 1) return client.reply(m.chat, Func.texted('bold', `🚩 Enter only 1 prefix.`), m)
         if (evaluate_chars.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa menggunakan prefix ${args[0]} karena akan terjadi error.`), m)
         if (args[0] == system.prefix) return client.reply(m.chat, Func.texted('bold', `🚩 Prefix ${args[0]} is currently used`), m)
         system.onlyprefix = args[0]
         client.reply(m.chat, Func.texted('bold', `🚩 Prefix successfully changed to : ${args[0]}`), m)
      } else if (command == '+prefix') {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, '#'), m)
         if (args[0].length > 1) return client.reply(m.chat, Func.texted('bold', `🚩 Enter only 1 prefix.`), m)
         if (evaluate_chars.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Cannot add prefix ${args[0]} because an error will occur.`), m)
         if (system.prefix.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Prefix ${args[0]} already exists in the database.`), m)
         system.prefix.push(args[0])
         client.reply(m.chat, Func.texted('bold', `🚩 Prefix ${args[0]} successfully added.`), m)
      } else if (command == '-prefix') {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, '#'), m)
         if (args[0].length > 1) return client.reply(m.chat, Func.texted('bold', `🚩 Enter only 1 prefix.`), m)
         if (system.prefix.lenght < 2) return client.reply(m.chat, Func.texted('bold', `🚩 Can't removing more prefix.`), m)
         if (!system.prefix.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Prefix ${args[0]} not exists in the database.`), m)
         system.prefix.forEach((data, index) => {
            if (data === args[0]) system.prefix.splice(index, 1)
         })
         client.reply(m.chat, Func.texted('bold', `🚩 Prefix ${args[0]} successfully removed.`), m)
      }
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['prefix', '+prefix', '-prefix'],
   use: 'symbol',
   category: 'owner',
   owner: true
}, __filename)