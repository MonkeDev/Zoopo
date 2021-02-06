const Base = require('../../BaseCommand');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'help',
            desc: 'If you don\'t know how to use me use this!',
            bPerms: [],
            mPerms: [],
            usage: 'help [command]'
        });
    };

    async run(msg, args, data){

        const toSend = {
            embed: {
                color: this.bot.colors.main,
                fields: [],
                description: `Use \`${data.guild.prefix}help <command>\`, For more help on a command!`
            }
        }

        const allCategorys =  [ ...new Set( this.bot.commands.filter(x => x.value.category, true).map(x => x.category) ) ];

        if(!args[0]) {
            allCategorys.forEach(c => {
                const allCommands =  [ ...new Set( this.bot.commands.filter(x => x.value.category == c, true).map(x => x.name) ) ];
                toSend.embed.fields.push({name: c, value: `\`${allCommands.join('`, `')}\``});
            });
        } else {
            const cmd = await this.bot.commands.get(args[0].toLowerCase()) || this.bot.commands.get(this.bot.alli.get(args[0].toLowerCase()));
            if(!cmd) return msg.channel.createMessage({
                embed: {
                    color: this.bot.colors.red,
                    description: `**${args[0].slice(0, 100)}** is not a command.`
                }
            });
            toSend.embed.description = cmd.desc;
            toSend.embed.title = `Command ${cmd.name}`;

            toSend.embed.fields.push({name: 'Usage', value: cmd.usage == 'None' ? cmd.usage : `\`${data.guild.prefix}${cmd.usage}\``});
            toSend.embed.fields.push({name: 'Alias(es)', value: cmd.alli[0] ? `\`${cmd.alli.join('`, `')}\`` : 'None'});
        };
        

        msg.channel.createMessage(toSend);
    }
};