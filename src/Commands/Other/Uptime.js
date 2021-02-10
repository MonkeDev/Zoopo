const Base = require('../../BaseCommand');
const pm = require('pretty-ms');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'uptime',
            desc: 'Shows you the bots uptime.',
            usage: 'uptime'
        });
    };

    async run(msg, args, data){
        const toSend = {
            embed: {
                fields: [],
                color: this.bot.colors.main
            }
        }

        const pUp = pm(process.uptime() * 1000);
        const bUp = pm(this.bot.uptime);

        toSend.embed.fields.push({name: '__Bot-Uptime__:', value: bUp, inline: true});
        toSend.embed.fields.push({name: '__Process-Uptime__:', value: pUp, inline: true});

        msg.channel.createMessage(toSend);
    }
};