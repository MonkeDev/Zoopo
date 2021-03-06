const { Client } = require('eris'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    ExtendedMap = require('./ExtendedMap');

class ZoopoClient extends Client {
    constructor(token, options, config) {
        super(token, options);

        this.config = config;

        this.commands = new ExtendedMap();
        this.alli = new ExtendedMap();

        this.db = {
            guilds: new (require('./Database/GuildManager'))()
        };

        this.colors = {
            main: 0xf7c38e,
            red: 0xff1800,
            yellow: 0xFFFF00,
            green: 0x008000
        };

        this.emojis = {
            loading: '<a:loading:787073325822115841>'
        };

        this.baseApiUrl = 'https://api.monkedev.com'
    };

    loadCommands(dir) {
        const Commands = fs.readdirSync(dir);
        Commands.forEach(cmd => {
            if(!cmd.endsWith('.js')) return this.loadCommands(dir + `/${cmd}`);

            const file = new (require(dir + `/${cmd}`))(this);
            this.commands.set(file.name, file);
            file.alli.forEach(alli => {
                this.alli.set(alli, file.name);
            });

            console.log(`Command ${file.name} loaded!`);
        });
    };

    loadEvents(dir) {
        const Events = fs.readdirSync(dir);
        Events.forEach(event => {
            if(!event.endsWith('.js')) return this.loadEvents(dir + `/${event}`);

            const file = new (require(dir + `/${event}`))(this);
            if(this.config.onceEvents.includes(file.name)) {
                this.once(file.name, (...args) => file.run(...args));
                console.log(`Event ${file.name} loaded as once event!`);
            } else {
                this.on(file.name, (...args) => file.run(...args));
                console.log(`Event ${file.name} loaded!`);
            }
        });
    };

    async connectDatabase() {
        await mongoose.connect(this.config.mongoURI, this.config.mongooseOptions);
        console.log('MongoDB connected!');
    };

    isUrl(url) {
        const pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?'+ 
        '(\\/[-a-z\\d%@_.~+&:]*)*'+ 
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i'); 
        if(!pattern.test(url)) return false;
        else return url;
    };

};

module.exports = ZoopoClient;