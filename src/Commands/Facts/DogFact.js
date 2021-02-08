const Base = require('../../BaseCommand'),
    fetch = require('node-fetch');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'dog-fact',
            desc: 'Get a random cat fact.',
            usage: 'dog-fact',
            category: 'Facts',
            alli: ['dogfact', 'df']
        });
    };

    async run(msg, args, data){

        const res = await (await (fetch(`${this.bot.baseApiUrl}/facts/dog?key=${this.bot.config.apiKey}`))).json();
        
        msg.channel.createMessage(res.fact);

    };
};