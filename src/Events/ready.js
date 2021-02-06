const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'ready'
        });
    };

    async run() {
        console.log(this.bot.user.username + '#' + this.bot.user.discriminator + ' is ready!');
        this.bot.guilds.forEach(async guild => {
            await new Promise(res => {
                setTimeout(() => {
                    res();
                }, Math.floor(Math.random() * 1000));
            });
            
            guild.getInvites().then(invites => {
                this.bot.inviteCache.set(guild.id, invites);
            });

        })
    }
}