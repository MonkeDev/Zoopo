const { Client } = require('eris'),
    fs = require('fs'),
    mongoose = require('mongoose');

class ZoopoClient extends Client {
    constructor(token, options, config) {
        super(token, options);

        this.config = config;

        this.commands = new Map();
        this.alli = new Map();

        this.db = {
            guilds: new (require('./Database/GuildManager'))()
        }
    };

    loadCommands(dir) {
        const Commands = fs.readdirSync(dir);
        Commands.forEach(cmd => {
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
    }
};

module.exports = ZoopoClient;