const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'messageCreate'
        });
    };

    async run(msg) {
        console.log(msg.content);
    }
}