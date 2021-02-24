const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'brightness',
            usage: 'brightness [imgUrl | user] [val]',
            category: 'Canvas',
            bPerms: ['attachFiles'],
        });
    };

    async run(msg, args, data){

        const user = msg.mentions[0] || this.bot.users.get(args[0]);

        const imgUrl = user ? user.staticAvatarURL : null || this.bot.isUrl(args[0]) ? args[0] : null || msg.channel.lastAttachment ?  msg.channel.lastAttachment.proxy_url : null;

        if(!imgUrl) return msg.channel.createMessage('I could not find a image in this channel, Please provide me with a user or a image URL.');
        if(!this.bot.isUrl(imgUrl)) return msg.channel.createMessage('Please give me a **valid** URL.');
        
        // const buffer = await (await (fetch(`${this.bot.baseApiUrl}/canvas/brightness?key=${this.bot.config.apiKey}&imgUrl=${imgUrl}&val=${Number(args[1]) && Number(args[1]) <= 1 && Number(args[1]) >= .1 ? args[1] : null || '.7'}`))).buffer();
        let buffer;
        try{
            buffer = await (await (fetch(`${this.bot.baseApiUrl}/canvas/brightness?key=${this.bot.config.apiKey}&imgUrl=${imgUrl}&val=${Number(args[1]) && Number(args[1]) <= 1 && Number(args[1]) >= .1 ? args[1] : null || '.7'}`))).buffer()
        } catch (err) {
            console.log(`${__filename} - ${err}`)
            return msg.channel.createMessage('An error happened, Joined my support server for help! ||<https://monkedev.com/r/discord>||');
        }
        
        msg.channel.createMessage('', {file: buffer, name: `brightness.png`});
    };
};