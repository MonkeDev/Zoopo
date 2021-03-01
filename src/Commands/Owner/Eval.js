const Base = require('../../BaseCommand');
const { inspect } = require("util");
const hastePls = require('haste-pls');

module.exports = class Help extends Base {
    constructor(bot) {
        super(bot, {
            name: 'eval',
            desc: 'EVAL',
            usage: 'EVAL',
            category: 'Owner'
        });
    };

    async run(msg, args, data){

        if(msg.author.id != '695520751842885672') return;

        let input = args.join(" "),
        hasAwait = input.includes("await"),
        hasReturn = input.includes("return"),
        evaled,
        startTime = Date.now()
        if(!input) return msg.channel.send({
            content: "Give me input bruh",
        })

        try{
            evaled = hasAwait ? await eval(`(async () => { ${hasReturn ? " " : "return"} ${input} })()`) : eval(input);
            if(typeof evaled != "string"){
                evaled = inspect(evaled, {
                    depth: +!(inspect(evaled, { depth: 2 }))
                    //depth: 1
                });
            }
        }catch(err){
            evaled = err;
        }

        evaled = evaled.toString();

        evaled = evaled.split(this.bot.config.token).join("botToken");

        if(evaled.length > 1900) {
            const bin = await new hastePls(evaled);
            msg.channel.send(bin.link)
           // evaled = evaled.slice(0, 1900);
        } else msg.channel.send(`${Date.now() - startTime} \`\`\`js\n${evaled}\`\`\``);


        
       
    }
};