const mongoose = require('mongoose'),
    config = require('../../Config.json');

const Schema = mongoose.model('facts', new mongoose.Schema({
    id: { type: String },
    users: { type: Array, default: [] },
    prefix: { type: String, default: config.defaultPrefix },
    chatChannel: { type: String, require: false }
}));

module.exports = class GuildManager {
    constructor() {
        this.cache = new Map();
        this.schema = Schema;

        Schema.find().then(data => {
            data.forEach(guildData => {
                this.cache.set(guildData.id, guildData);
            })
        });
    };

    async get(id) {
        let data = await this.cache.get(id);
        if(data === undefined) {
            data = await Schema.findOne({id: id});
            if(!data) data = await new Schema({id: id}).save();
            this.cache.set(id, data);
        };
        return data;
    };

};