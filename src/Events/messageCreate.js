const Base = require('../BaseEvent');
const fetch = require('node-fetch').default;
module.exports = class messageCreate extends Base {
    constructor(bot) {
        super(bot, {
            name: 'messageCreate'
        });

        this.chatCooldown = new Map();
    };

    async run(msg) {

        msg.channel.send = msg.channel.createMessage;
        // if(msg.channel.guild.id != this.bot.config.logs.guildID) return;
        
        const { content, guildID, member, channel } = msg;

        const data = {};

        const start = Date.now();
        data.guild = await this.bot.db.guilds.get(guildID);
        data.ping = Date.now() - start;

        if(data.guild.chatChannel === msg.channel.id) {
            if(msg.author.bot) return;
            
            if(this.chatCooldown.has(msg.author.id)) return 
            else {
                this.chatCooldown.set(msg.author.id, Date.now());
                setTimeout(() => {
                    this.chatCooldown.delete(msg.author.id);
                }, 1500);

                const res = await (await fetch(`${this.bot.baseApiUrl}/fun/chat?key=${this.bot.config.apiKey}&msg=${encodeURIComponent(msg.content)}&uid=${msg.author.id}`)).json();
                return msg.channel.send({
                    content: res.response,
                    messageReference: { messageID: msg.id }
                });
            };
        };

        if(msg.content == `<@${this.bot.user.id}>` || msg.content == `<@!${this.bot.user.id}>`) {
            msg.channel.createMessage({
                embed: {
                    color: this.bot.colors.main,
                    title: `Hello, ${msg.author.username} :wave:`,
                    description: `My prefix in **${msg.channel.guild.name}** is **${data.guild.prefix}**.\nI'm a bot created by [MonkeDev](https://monkedev.com) with the purpose of using their [API](https://api.monkedev.com), if you need help join my [support server](https://discord.gg/5q8rQeA3m2)!`
                }
            })
        }
        if(msg.attachments[0]) {
            if (msg.attachments[0].url.endsWith('.png') || msg.attachments[0].url.endsWith('.jpeg') || msg.attachments[0].url.endsWith('.jpg')) {
                msg.channel.lastAttachment = msg.attachments[0];
            };
        };

        if(msg.author.bot || !msg.guildID) return;

       
        if(!content.toLowerCase().startsWith(data.guild.prefix.toLowerCase())) return;
        
    
        const args = content.split(/ +/);

        const cmd = this.bot.commands.get(args[0].slice(data.guild.prefix.length).toLowerCase()) || this.bot.commands.get(this.bot.alli.get(args[0].slice(data.guild.prefix.length).toLowerCase()));

        if(!cmd) return;

        const ME = await msg.channel.guild.members.get(this.bot.user.id);
        if(!msg.channel.permissionsOf(this.bot.user.id).has('sendMessages') || !msg.channel.permissionsOf(this.bot.user.id).has('embedLinks')) return;

        const neededMperms = [];
        cmd.mPerms.forEach(perm => {
            if(!member.permissions.json[perm]) neededMperms.push(perm);
        });

        const neededBperms = [];
        cmd.bPerms.forEach(perm => {
            if(!ME.permissions.json[perm]) neededBperms.push(perm);
        });

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


        cmd.run(msg, args.slice(1), data).catch(err => {
            msg.channel.send('An error has happened, Join my support server for help! || https://discord.gg/5q8rQeA3m2 ||');
            throw err;
        });
    }
}