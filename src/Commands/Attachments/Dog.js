const Base = require('../../BaseCommand'),
    fetch = require('node-fetch');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'bird',
            desc: 'Get a random bird image/gif.',
            usage: 'bird',
            category: 'Attachments',
        });
    };

    async run(msg, args, data){

        const res = await (await (fetch(`${this.bot.baseApiUrl}/attachments/bird?key=${this.bot.config.apiKey}`))).json();

        msg.channel.createMessage({embed: {color: this.bot.colors.main, image: { url: res.url}}});

    };
};