const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'shuffle',
            desc: 'shuffle some text',
            usage: 'shuffle <text>',
            category: 'Util'
        });
    };

    async run(msg, args, data){


        const res = await (await (fetch(`${this.bot.baseApiUrl}/utils/shuffle?key=${this.bot.config.apiKey}&content=${encodeURI(args.join(' ') || 'What would you like to shuffle?')}`))).json();

        msg.channel.createMessage(res.result);


        
    }
};