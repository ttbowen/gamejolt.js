'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;
const cloneObject = require('../../../../util/CloneObject');


class UserUpdatedHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const chat = client.chat;
        const user = payload.data.user;
        const roomId = payload.data.roomId;

        if (client.chat.usersOnline[roomId]) {
            const oldUser = cloneObject(client.chat.usersOnline[roomId].get(user.id));

            if (chat.joinedRooms[roomId] && chat.isGroupRoom(chat.joinedRooms[roomId])) {
                chat.usersOnline[roomId].update(user);
            }
            const data = new UserUpdatedPayload({ old: oldUser, updated: user });
            client.emit(Events.USER_UPDATED, data);
        }
    }
}

class UserUpdatedPayload {
    constructor(data) {
        this.old = data.oldUser;
        this.updated = data.updated;
    }
}

module.exports = UserUpdatedHandler;