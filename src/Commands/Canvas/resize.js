const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'resize',
            desc: 'pixelate a image',
            usage: 'pixelate [imgUrl | user] <X> <Y>',
            category: 'Canvas',
            bPerms: ['attachFiles'],
        });
    };

    async run(msg, args, data){

        const user = msg.mentions[0] || this.bot.users.get(args[0]);

        const imgUrl = user ? user.staticAvatarURL : null || this.bot.isUrl(args[0]) ? args[0] : null || msg.channel.lastAttachment ?  msg.channel.lastAttachment.proxy_url : null;

        if(!imgUrl) return msg.channel.createMessage('I could not find a image in this channel, Please provide me with a user or a image URL.');
        if(!this.bot.isUrl(imgUrl)) return msg.channel.createMessage('Please give me a **valid** URL.');
        
        const x = parseInt(args[1]) || null;
        const y = parseInt(args[2]) || null;

        if(x && x > 2000) {
            return msg.channel.createMessage('**X** can not be larger then 2000.');
        };
        if(y && y > 2000) {
            return msg.channel.createMessage('**Y** can not be larger then 2000.');
        };

        if(!x && !y) return msg.channel.createMessage('Missing both **X** and **Y** you have to give at-least one.')
        const res = await ( await fetch(encodeURI(`${this.bot.baseApiUrl}/canvas/resize?key=${this.bot.config.apiKey}&imgUrl=${imgUrl}${x ? `&x=${x}` : ''}${y ? `&y=${y}` : ''}`))).buffer();

            
        msg.channel.createMessage('', {file: res, name: 'resized.png'});

    };
};