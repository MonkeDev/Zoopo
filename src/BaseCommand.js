class BaseCommand {
    constructor(bot, cmd) {
        this.bot = bot;

        if(!cmd.name) throw new Error('No command name.');
        this.name = cmd.name;
        this.alli = cmd.alli || [];
        this.desc = cmd.desc || 'No description';

        this.bPerms = cmd.bPerms ? cmd.bPerms.includes('embedLinks') ? cmd.bPerms : cmd.bPerms.push('embedLinks') : ['embedLinks'];
        this.mPerms = cmd.mPerms || [];

    };
};

module.exports = BaseCommand;