const Base = require('../../BaseCommand'),
    fetch = require('node-fetch');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'cat-fact',
            desc: 'Get a random cat fact.',
            usage: 'cat-fact',
            category: 'Facts',
            alli: ['catfact', 'cf']
        });
    };

    async run(msg, args, data){

        const res = await (await (fetch(`${this.bot.baseApiUrl}/facts/cat?key=${this.bot.config.apiKey}`))).json();
        
        msg.channel.createMessage(res.fact);

    };
};