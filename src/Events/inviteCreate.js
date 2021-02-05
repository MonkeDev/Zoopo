const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'inviteCreate'
        });
    };

    async run(guild, invite) {

        let inviteCache = await this.bot.inviteCache.get(guild.id);
        if(inviteCache) inviteCache.push(invite);
        else {
            await guild.getInvites().then(invites => {
                this.bot.inviteCache.set(guild.id, invites);
            });
        };
        
    };
};