class BaseCommand {
    constructor(bot, event) {
        this.bot = bot;

        if(!event.name) throw new Error('No command name.');
        this.name = event.name;

    };
};

module.exports = BaseCommand;