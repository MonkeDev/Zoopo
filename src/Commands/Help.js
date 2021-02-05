const Base = require('../BaseCommand');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'help',
            desc: 'If you don\'t know how to use me use this!'
        });
    };
};