'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;
const cloneObject = require('../../../../util/CloneObject');


class FriendRemoveHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const userId = payload.data.userId;

        if (client.chat.friends) {
            const user = client.chat.friends.get(userId);

            if (user) {
                const removed = cloneObject(user);
                client.chat.leaveRoom(user.roomId);
                
                const data = new FriendRemovePayload({ userId: userId, removed: removed });
                client.emit(Events.FRIEND_REMOVE, data);
            } 
            else {
                const data = new FriendRemovePayload({ userId: userId, removed: null });
                client.emit(Events.FRIEND_REMOVE, data);
            }
            client.chat.friends.remove(userId);
        }
    }
}

class FriendRemovePayload {
    constructor(data) {
        this.userId = data.userId;
        this.friendRemoved = data.removed;
    }
}

module.exports = FriendRemoveHandler;