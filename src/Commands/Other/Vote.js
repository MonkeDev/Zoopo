const Base = require('../../BaseCommand');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'vote',
            desc: 'Please vote!',
            usage: 'vote'
        });
    };

    async run(msg, args, data){

        msg.channel.createMessage('<https://top.gg/bot/807048838362955798/vote>');
    }
};