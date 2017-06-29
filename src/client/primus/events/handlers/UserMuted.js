'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class UserMutedHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const userId = payload.data.userId;
        const roomId = payload.data.roomId;
        const isGlobal = payload.data.isGlobal;

        if (client.chat.joinedRooms[roomId] && client.chat.usersOnline[roomId]) {
            const room = client.chat.joinedRooms[roomId];
            const user = client.chat.usersOnline[roomId].get(userId);

            if (room && client.chat.isGroupRoom(room)) {
                client.chat.usersOnline[roomId].mute(userId, isGlobal);
            }

            if (user) {
                client.emit(Events.USER_MUTED, userId, roomId, user);
            } else {
                client.emit(Events.USER_MUTED, userId, roomId);
            }
        }
    }
}

module.exports = UserMutedHandler;