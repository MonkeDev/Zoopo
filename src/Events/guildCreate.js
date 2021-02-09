const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'guildCreate'
        });
    };

    async run(guild) {

        const logGuild = await this.bot.guilds.get(this.bot.config.logs.guildID);
        const logChannel = logGuild.channels.get(this.bot.config.logs.channelID);

        logChannel.createMessage({
            content: `__**New Guild**__\nName: ${guild.name}\nMemberCount: ${guild.memberCount}`,
        });

    }
}