const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'messageCreate'
        });
    };

    async run(msg) {

        if(msg.author.bot || !msg.guildID) return;

        const { content, guildID } = msg;

        const data = {};

        data.guild = await this.bot.db.guilds.get(guildID);
        console.log(data.guild);

        if(!content.startsWith(data.guild.prefix)) return;
        
    
        const args = content.split(/ +/);

        console.log(args)
        const cmd = this.bot.commands.get(args[0].slice(data.guild.prefix.length).toLowerCase());

        if(!cmd) return;

        cmd.run(msg, args, data);
    }
}