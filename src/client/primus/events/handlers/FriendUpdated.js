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
            client.emit(Events.FRIEND_UPDATED, oldUser, user);
        }
    }
}

module.exports = FriendUpdatedHandler;