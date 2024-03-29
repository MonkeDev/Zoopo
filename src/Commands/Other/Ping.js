const Base = require('../../BaseCommand');
const pm = require('pretty-ms');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            desc: 'Pong',
            usage: 'ping',
            alli: ['latency']
        });
    };

    async run(msg, args, data){

        const toSend = {
            embed: {
                color: this.bot.colors.main,
                fields: [
                    {
                        name: '__Database__:',
                        value: this.bot.emojis.loading
                    },
                    {
                        name: `__Shard | ${msg.channel.guild.shard.id}__:`,
                        value: this.bot.emojis.loading
                    },
                    {
                        name: '__Message Response__:',
                        value: this.bot.emojis.loading
                    }
                ]
            }
        }


        const message = await msg.channel.createMessage(toSend);
        const End = Date.now() - message.createdAt

        toSend.embed.fields[0].value = pm(data.ping);
        toSend.embed.fields[1].value = pm(msg.channel.guild.shard.latency);
        toSend.embed.fields[2].value = pm(End);

        message.edit(toSend);



        
    }
};