'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;
const cloneObject = require('../../../../util/CloneObject');


class YouUpdatedHandler extends Handler {

    handle(payload) {

        const client = this.eventManager.client;
        const user = new User(client, payload.data.user);
        const oldUser = cloneObject(client.chat.me);

        client.chat.me = user;
        
        const data = new YouUpdatedPayload({ old: oldUser, updated: user });
        client.emit(Events.YOU_UPDATED, data);
    }
}

class YouUpdatedPayload {
    constructor(data) {
        this.old = data.old;
        this.updated = data.updated;
    }
}

module.exports = YouUpdatedHandler;