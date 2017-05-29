'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;
const cloneObject = require('../../../../util/CloneObject');


class FriendUpdatedHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const user = payload.data.user;

        if (client.chat.friends) {
            const oldUser = cloneObject(client.chat.friends.get(user.id));

            client.chat.friends.update(user);

            const data = new FriendUpdatedPayload({ old: oldUser, updated: user })
            client.emit(Events.FRIEND_UPDATED, data);
        }
    }
}

class FriendUpdatedPayload {
    constructor(data) {
        this.oldUser = data.oldUser;
        this.updated = data.updated;
    }
}

module.exports = FriendUpdatedHandler;