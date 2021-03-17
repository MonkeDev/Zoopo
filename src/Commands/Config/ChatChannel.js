const Base = require('../../BaseCommand'),
    mc = require('../../MessageCollector');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'chat-channel',
            desc: 'Set up my chat feature',
            mPerms: ['manageGuild'],
            usage: 'chat-channel <#channel | none>',
            category: 'Config',
            alli: ['cc', 'chatchannel']
        });
    };

    async run(msg, args, data){

        if(!args[0]) return msg.channel.send(`Invalid args, \`${data.guild.prefix}${this.usage}.\``);

        if(args[0].toLowerCase() == 'none') {
            if(data.guild.chatChannel) {
                data.guild.chatChannel = null;
                data.guild.save();
                return msg.channel.send('Chat channel has been removed!');
            } else {
                return msg.channel.send('You do not have a chat channel set.');
            };
        };

        const channel = msg.channelMentions[0] ? msg.channel.guild.channels.get(msg.channelMentions[0]) : null || msg.channel.guild.channels.find(x => x.name.toLowerCase() == args[0].toLowerCase());

        if(!channel) return msg.channel.send(`Invalid args, \`${data.guild.prefix}${this.usage}.\``);
        data.guild.chatChannel = channel.id;
        data.guild.save();

        msg.channel.send(`<#${data.guild.chatChannel}> is now your chat channel!`);

    
    };
};