'use strict';

const Handler = require('./Handler');
const Room = require('../../../../structures/chat/Room');
const Events = require('../../../../util/Events').Events;


class PublicRoomsHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const rooms = payload.data.rooms;

        for (let room in rooms) {
            let r = rooms[room];
            client.chat.publicRooms.push(new Room(r));
        }
        client.emit(Events.PUBLIC_ROOMS, rooms);
    }
}

module.exports = PublicRoomsHandler;