const Base = require('../../BaseCommand'),
    fetch = require('node-fetch');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'monkey-fact',
            desc: 'Get a random cat fact.',
            usage: 'monkey-fact',
            category: 'Facts',
            alli: ['monkeyfact', 'mf']
        });
    };

    async run(msg, args, data){

        const res = await (await (fetch(`${this.bot.baseApiUrl}/facts/monkey?key=${this.bot.config.apiKey}`))).json();
        
        msg.channel.createMessage(res.fact);

    };
};