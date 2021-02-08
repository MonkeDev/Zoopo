const Base = require('../../BaseCommand');
const fetch = require('node-fetch');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'rate-limit',
            desc: 'See the rate-limit of the API that the bot uses.',
            usage: 'rate-limit',
            alli: ['rl']
        });
    };

    async run(msg, args, data){

        const res = await (await (fetch(`${this.bot.baseApiUrl}/info/ratelimit?key=${this.bot.config.apiKey}`))).json();
        console.log(res)
        const green = res.max / 2.8;
        const yellow = res.max / 1.22;


        msg.channel.createMessage(
            {
                embed: {
                    title: `Rate-limit: ${res.used < green ? 'Good' : null || res.used < yellow ? 'Decent' : null || 'Bad'}`,
                    color: res.used < green ? this.bot.colors.green : null || res.used < yellow ? this.bot.colors.yellow : null || this.bot.colors.red,
                    fields: [
                        {
                            name: 'Used',
                            value: res.used,
                            inline: true
                        },
                        {
                            name: 'Max',
                            value: res.max,
                            inline: true
                        }
                    ]
                }
            }
        );
        
    }
};