const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'shuffle',
            desc: 'shuffle some text',
            usage: 'shuffle <text>',
            category: 'Fun'
        });
    };

    async run(msg, args, data){
        if(!args[0]) return msg.channel.createMessage(`Add an argument brub, \`${data.guild.prefix}shuffle <text>\``);
        const res = await (await (fetch(`${this.bot.baseApiUrl}/fun/shuffle?key=${this.bot.config.apiKey}&content=${encodeURI(args.join(' ').slice(0, 1000) || 'What would you like to shuffle?')}`))).json();
        msg.channel.createMessage({ embed: {
            color: this.bot.colors.main,
            fields: [
                {
                    name: "__Original__:",
                    value: `\`${args.join(' ').slice(0, 1000)}\``,
                    inline: true
                },
                {
                    name: "__Shuffled__:",
                    value: `\`${res.result}\``,
                    inline: true
                }
            ]
        }});
    }
};