const Base = require('../BaseEvent');
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'messageCreate'
        });
    };

    async run(msg) {

        if(msg.author.bot || !msg.guildID) return;

        const { content, guildID, member, channel } = msg;

        const data = {};

        const start = Date.now();
        data.guild = await this.bot.db.guilds.get(guildID);
        data.ping = Date.now() - start;

        if(!content.startsWith(data.guild.prefix)) return;
        
    
        const args = content.split(/ +/);

        const cmd = this.bot.commands.get(args[0].slice(data.guild.prefix.length).toLowerCase()) || this.bot.commands.get(this.bot.alli.get(args[0].slice(data.guild.prefix.length).toLowerCase()));

        if(!cmd) return;

        const neededMperms = [];
        cmd.mPerms.forEach(perm => {
            if(!member.permissions.json[perm]) neededMperms.push(perm);
        });

        const neededBperms = [];
        cmd.bPerms.forEach(perm => {
            if(!member.permissions.json[perm]) neededBperms.push(perm);
        });

        if(neededBperms.includes('embedLinks')) return;

        if(neededMperms[0]) return channel.createMessage({
            embed: {
                color: this.bot.colors.red,
                title: 'Missing permission(s)',
                description: `You're missing \`${neededMperms.join('` & `')}\` permission(s), Therefore you can't execute this command.`
            }
        });
        if(neededBperms[0]) return channel.createMessage({
            embed: {
                color: this.bot.colors.red,
                title: 'Missing permission(s)',
                description: `I'm missing \`${neededBperms.join('` & `')}\` permission(s), Therefore I can't execute this command.` 
            }
        });


        cmd.run(msg, args.slice(1), data);
    }
}