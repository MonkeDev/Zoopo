const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'invert',
            desc: 'invert a image',
            usage: 'invert [imgUrl | user]',
            category: 'ImageManipulation',
            bPerms: ['attachFiles'],
        });
    };

    async run(msg, args, data){

        const user = msg.mentions[0] || this.bot.users.get(args[0]);

        const imgUrl = user ? user.staticAvatarURL : msg.channel.lastAttachment ?  msg.channel.lastAttachment.proxy_url : null || args[0];

        if(!imgUrl) return msg.channel.createMessage('I could not find a image in this channel, Please provide me with a user or a image URL.');
        if(!this.bot.isUrl(imgUrl)) return msg.channel.createMessage('Please give me a **valid** URL.');
        
        const buffer = await (await (fetch(`${this.bot.baseApiUrl}/canvas/invert?key=${this.bot.config.apiKey}&imgUrl=${imgUrl}`))).buffer();

        msg.channel.createMessage('', {file: buffer, name: `invert.png`});
    };
};