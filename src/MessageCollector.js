const { EventEmitter } = require('events');
const { Collection, Message } = require('eris');
const { scheduleJob, rescheduleJob } = require('node-schedule');
const defaults = {
    idle: 10000,
    maxCount: 1,
    filter: (msg) => msg.content.length > 0
}

class MessageCollector extends EventEmitter {
    constructor(channel, options = {}) {
        super();
        const cOptions = Object.assign(defaults, options);
        this.channel = channel;
        this.timeout = cOptions.timeout;
        this.maxCount = cOptions.maxCount;
        this.filter = cOptions.filter;
        this.collecting = false;
        this.idle = cOptions.idle;
        this.messages = new Collection(Message);

        this._onMessage = this._onMessage.bind(this);
        this._onMessageUpdate = this._onMessageUpdate.bind(this);
        this._onMessageDelete = this._onMessageDelete.bind(this);
        this._onGuildDelete = this._onGuildDelete.bind(this);
        this._onChannelDelete = this._onChannelDelete.bind(this);

        this.onCollect = this.onCollect.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    /**
     * 
     * @private 
     */
    _onMessage(msg) {
        if (!this.collecting) return;
        if (this.channel.id != msg.channel.id) return;
        if (this.idle && typeof this.idle == "number") rescheduleJob(`${this.channel.id}`, Date.now() + this.idle);
        if (!this.filter(msg)) return;
        this.emit('collect', msg);
    }

    /**
     * 
     * @private 
     */
    _onGuildDelete(guild) {
        if (this.channel.guild.id == guild.id) this.stop();
    }

    /**
     * 
     * @private
     */
    _onChannelDelete(channel) {
        if (this.channel.id == channel.id) this.stop();
    }

    /**
     * @private
     */
    _onMessageUpdate(msg, oldMsg) {
        if (!this.collecting) return;
        if (this.channel.id != msg.channel.id) return;
        if (!this.filter(msg)) return this.messages.remove(msg);
        if (!this.messages.has(oldMsg.id)) return this.emit('collect', msg);
        this.emit('update', msg);
    }

    /**
     * @private
     */
    _onMessageDelete(msg) {
        if (!this.collecting) return;
        if (!this.messages.has(msg.id)) return;
        this.emit('delete', msg);
    }

    /**
     * 
     * @private 
     */
    onCollect(msg) {
        this.messages.add(msg);
        if (this.maxCount && this.messages.size == this.maxCount) { 
            this.stop();
        }
    }

    /**
     * 
     * @private 
     */
    onUpdate(msg) {
        this.messages.update(msg);
    }

    /**
     * 
     * @private 
     */
    onDelete(msg) {
        this.messages.delete(msg);
    }

    startCollecting() {
        this.collecting = true;
        if (this.idle && typeof this.idle == "number") scheduleJob(`${this.channel.id}`, Date.now() + this.idle, () => this.stop());
        return new Promise((res) => {
            this.channel.client.setMaxListeners(this.getMaxListeners() + 1);
            this.channel.client.on('messageCreate', this._onMessage);

            this.channel.client.on('guildDelete', this._onGuildDelete);
            this.channel.client.on('channelDelete', this._onChannelDelete);

            this.setMaxListeners(this.getMaxListeners() + 1);
            this.on('collect', this.onCollect);
            this.on('update', this.onUpdate);
            this.on('delete', this.onDelete);

            if (this.timeout) setTimeout(() => this.stop(), this.timeout);
            this.once('stop', () => res(this));
        });
    }

    stop() {
        this.messages.clear();
        this.collecting = false;
        this.channel.client.setMaxListeners(this.getMaxListeners() - 1);
        this.channel.client.off('messageCreate', this._onMessage);
        this.channel.client.off('guildDelete', this._onGuildDelete);
        this.channel.client.off('channelDelete', this._onChannelDelete);

        this.setMaxListeners(this.getMaxListeners() - 1);
        this.channel.client.off('collect', this.onCollect);
        this.channel.client.off('update', this.onUpdate);
        this.channel.client.off('delete', this.onDelete);
        this.emit("stop");
        return this;
    }

    setIdle(time) {
        if (isNaN(time)) return;
        this.idle = time;
        rescheduleJob(`${this.channel.id}`, Date.now() + this.idle);
        return this;
    }
}
module.exports = MessageCollector;