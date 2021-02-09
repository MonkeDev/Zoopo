const Base = require('../../BaseCommand');
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'invite',
            desc: 'Get a link to invite me to your server!',
            usage: 'invite'
        });
    };

    async run(msg, args, data){

        msg.channel.createMessage({
            content: `<https://discord.com/api/oauth2/authorize?client_id=${this.bot.user.id}&permissions=52224&redirect_uri=https%3A%2F%2Fmonkedev.com&scope=bot>`
        })

    }
};