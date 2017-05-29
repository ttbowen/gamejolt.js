'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class UserEnterHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const chat = client.chat;
        const user = payload.data.user;
        const roomId = payload.data.roomId;

        if(chat.joinedRooms[roomId] && chat.isGroupRoom(chat.joinedRooms[roomId])) {
            chat.usersOnline[roomId].add(user);
        }
        const data = new UserEnterPayload({ user: user, roomId: roomId });
        client.emit(Events.USER_ENTER_ROOM, data);
    }
}

class UserEnterPayload {
    constructor(data) {
        this.user = data.user;
        this.roomId = data.roomId;
    }
}

module.exports = UserEnterHandler;