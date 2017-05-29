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
            const data = new UserUnmutedPayload( { userId: userId, user: user, roomId: roomId });
            client.emit(Events.USER_UNMUTED, data);
        }
    }
}

class UserUnmutedPayload {
    constructor(data) {
        this.userId = data.userId;
        this.user = data.user;
        this.roomId = data.roomId;
    }
}

module.exports = UserUnmutedHandler;