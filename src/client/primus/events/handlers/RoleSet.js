'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class RoleSetHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const userId = payload.data.userId;
        const roomId = payload.data.roomId;
        const action = payload.data.action;

        if (client.chat.joinedRooms[roomId]) {
            const room = client.chat.joinedRooms[roomId];

            if (room && client.chat.isGroupRoom(room) && client.chat.usersOnline[roomId]) {
                if (action == 'mod') {
                    client.chat.usersOnline[roomId].mod(userId);
                }
                else if (action == 'demod') {
                    client.chat.usersOnline[roomId].demod(userId);
                }
            }
        }
        client.emit(Events.ROLE_SET, payload.data);
    }
}

module.exports = RoleSetHandler;