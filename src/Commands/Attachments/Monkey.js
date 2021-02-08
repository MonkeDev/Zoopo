const Base = require('../../BaseCommand'),
    fetch = require('node-fetch');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'monkey',
            desc: 'Get a random monkey image/gif.',
            usage: 'monkey',
            category: 'Attachments',
        });
    };

    async run(msg, args, data){

        const res = await (await (fetch(`${this.bot.baseApiUrl}/attachments/monkey?key=${this.bot.config.apiKey}`))).json();
        
        msg.channel.createMessage({embed: {color: this.bot.colors.main, image: { url: res.url}}});

    };
};