const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'contrast',
            desc: 'Place a contrast filter on a image',
            usage: 'contrast [imgUrl | user]',
            category: 'Canvas',
            bPerms: ['attachFiles'],
        });
    };

    async run(msg, args, data){

        const user = msg.mentions[0] || this.bot.users.get(args[0]);

        const imgUrl = user ? user.staticAvatarURL : null || this.bot.isUrl(args[0]) ? args[0] : null || msg.channel.lastAttachment ?  msg.channel.lastAttachment.proxy_url : null;

        if(!imgUrl) return msg.channel.createMessage('I could not find a image in this channel, Please provide me with a user or a image URL.');
        if(!this.bot.isUrl(imgUrl)) return msg.channel.createMessage('Please give me a **valid** URL.');
        
        // const buffer = await (await (fetch(`${this.bot.baseApiUrl}/canvas/contrast?key=${this.bot.config.apiKey}&imgUrl=${imgUrl}&val=.5`))).buffer();
        let buffer;
        try{
            buffer = await (await (fetch(`${this.bot.baseApiUrl}/canvas/contrast?key=${this.bot.config.apiKey}&imgUrl=${imgUrl}&val=.5`))).buffer()
        } catch (err) {
            console.log(`${__filename} - ${err}`)
            return msg.channel.createMessage('An error happened, Joined my support server for help! ||<https://monkedev.com/r/discord>||');
        }

        msg.channel.createMessage('', {file: buffer, name: `contrast.png`});
    };
};