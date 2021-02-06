const Base = require('../../BaseCommand'),
    mc = require('../../MessageCollector');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'prefix',
            desc: 'Change my prefix!',
            mPerms: ['manageGuild'],
            usage: 'prefix',
            category: 'Config'
        });
    };

    async run(msg, args, data){

        const message = await msg.channel.createMessage('Please respond with a new prefix, If you want to cancel this respond with `cancel`. You have 10 seconds!')
        const collector = new mc(msg.channel, {
            filter: x => x.author.id == msg.author.id,
        });
        collector.startCollecting();

        collector.on('collect', m => {
            if(m.content == 'cancel') {
                message.edit('Action canceled.');
            } else {
                const newPrefix = m.content.toLowerCase();
                if(newPrefix == data.guild.prefix) return message.edit(`The prefix on this server is already \`${newPrefix}\`.`);
                if(newPrefix.length >= 10) return message.edit(`Your new prefix has to be under 10 characters.`);

                data.guild.prefix = newPrefix;
                data.guild.save().then(d => {
                    message.edit(`My prefix on this server is now \`${d.prefix}\`!`);
                });
  
            };
        });
    
    };
};