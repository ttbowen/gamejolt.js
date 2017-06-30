'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;
const cloneObject = require('../../../../util/CloneObject');


class YouUpdatedHandler extends Handler {

    handle(payload) {

        const client = this.eventManager.client;
        const user = payload.data.user;
        const oldUser = cloneObject(client.chat.me);

        client.chat.me = new User(client, user);
        
        client.emit(Events.YOU_UPDATED, new User(client, olduser), new User(client, user));
    }
}

module.exports = YouUpdatedHandler;