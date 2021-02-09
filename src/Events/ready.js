const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'ready'
        });
    };

    async run() {
        console.log(this.bot.user.username + '#' + this.bot.user.discriminator + ' is ready!');
        this.bot.editStatus('idle', {
            name: 'Ping for prefix!',
        });
    };
};