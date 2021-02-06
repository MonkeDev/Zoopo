class BaseCommand {
    constructor(bot, cmd) {
        this.bot = bot;

        if(!cmd.name) throw new Error('No command name.');
        this.name = cmd.name;
        this.alli = cmd.alli || [];
        this.desc = cmd.desc || 'No description';
        this.category = cmd.category || 'Other';
        this.usage = cmd.usage || 'None';

        this.bPerms = cmd.bPerms || ['embedLinks'];
        this.mPerms = cmd.mPerms || [];

    };
};

module.exports = BaseCommand;