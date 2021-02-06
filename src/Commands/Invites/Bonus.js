const Base = require('../../BaseCommand');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'bonus',
            desc: 'Give a user bonus invites.',
            usage: 'bonus <amount> [user]',
            mPerms: ['manageGuild']
        });
    };

    async run(msg, args, data){

        const howMany = parseInt(args[0]);

        if(!howMany) return msg.channel.createMessage('The amount of bonus invites is required and has to be a number.')

        const user = msg.mentions[0] || msg.channel.guild.members.get(args[0]) || msg.author;

        let userData = await data.guild.users.find(x => x.id == user.id);
        if(!userData) {
            await data.guild.users.push({
                id: user.id,
                invites: {
                    real: 0,
                    fake: 0,
                    bonus: 0
                }
            });
            userData = await data.guild.users.find(x => x.id == user.id);
        }

        userData.invites.bonus += howMany;
        await data.guild.save();

        msg.channel.createMessage(`${user.username + '#' + user.discriminator} now has ${userData.invites.bonus} bonus invite(s)!`);


        /*
        msg.channel.createMessage({
            embed: {
                author: {
                    name: user.username + '#' + user.discriminator,
                    icon_url: user.avatarURL
                },
                color: this.bot.colors.main,
                fields: [
                    
                    {
                        name: 'Real',
                        value: userData.invites.real,
                        inline: true,
                    },
                    {
                        name: 'Fake',
                        value: userData.invites.fake,
                        inline: true,
                    },
                    {
                        name: 'Bonus',
                        value: userData.invites.bonus,
                        inline: true,
                    },

                ]
            }
        })

        */


    }
};

