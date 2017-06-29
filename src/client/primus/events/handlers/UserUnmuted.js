'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class UserUnmutedHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const userId = payload.data.userId;
        const roomId = payload.data.roomId;
        const isGlobal = payload.data.isGlobal;

        if (client.chat.joinedRooms[roomId] && client.chat.usersOnline[roomId]) {
            const room = client.chat.joinedRooms[roomId];
            const user = client.chat.usersOnline[roomId].get(userId);

            if (room && client.chat.isGroupRoom(room)) {
                client.chat.usersOnline[roomId].unmute(userId, isGlobal);
            }
            
            if (user) {
                client.emit(Events.USER_UNMUTED, userId, roomId, user);
            } else {
                client.emit(Events.USER_UNMUTED, userId, roomId);
            }
        }
    }
}

module.exports = UserUnmutedHandler;