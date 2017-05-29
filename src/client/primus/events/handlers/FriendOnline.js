'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class FriendOnlineHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const user = new User(payload.data.user);

        if (client.chat.friends) {
            client.chat.friends.online(user);
        }
        client.emit(Events.FRIEND_ONLINE, user);
    }
}

module.exports = FriendOnlineHandler;