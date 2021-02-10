const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: '8ball',
            desc: 'Get a 8ball response',
            usage: '8ball [Question]',
            category: 'Fun'
        });
    };

    async run(msg, args, data){


        const res = await (await (fetch(`${this.bot.baseApiUrl}/fun/8ball?key=${this.bot.config.apiKey}`))).json();

        msg.channel.createMessage(res.answer);


        
    }
};