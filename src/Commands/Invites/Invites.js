const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'invites',
            desc: 'See how many invites a user has.',
            usage: 'invites [user]'
        });
    };

    async run(msg, args, data){

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
        };


        msg.channel.createMessage({
            embed: {
                author: {
                    name: user.username + '#' + user.discriminator,
                    icon_url: user.avatarURL
                },
                footer: {
                    text: `Total: ${userData.invites.real + userData.invites.fake + userData.invites.bonus}`
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
        });



    }
};


