'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class OnlineCountHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const online = payload.data.onlineCount;

        this.eventManager.client.chat.userCount = online;
        client.emit(Events.ONLINE_COUNT, online);
    }
}

module.exports = OnlineCountHandler;