const Base = require('../../BaseCommand');
const fetch = require('node-fetch').default;
module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: '8ball',
            desc: 'The magik 8ball will answer a question',
            usage: '8ball <Question>',
            category: 'Fun'
        });
    };

    async run(msg, args, data){
        if(!args[0]) return msg.channel.createMessage(`What is your question? | \`${data.guild.prefix}8ball <Question>\``);
        const res = await (await (fetch(`${this.bot.baseApiUrl}/fun/8ball?key=${this.bot.config.apiKey}`))).json();
        msg.channel.createMessage({ embed: {
            color: this.bot.colors.main,
            title: `:question: | __Question__: \`${args.join('').slice(0, 210)}\``,
            description: `:mag_right: | **__Answer__**: \`${res.answer}\``
        }});     
    }
};