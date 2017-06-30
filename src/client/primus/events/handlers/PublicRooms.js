'use strict';

const Handler = require('./Handler');
const Room = require('../../../../structures/chat/Room');
const Events = require('../../../../util/Events').Events;


class PublicRoomsHandler extends Handler {

    handle(payload) {
        const client = this.eventManager.client;
        const rooms = payload.data.rooms;

        const publicRooms = [];

        for (let room in rooms) {
            let newRoom = new Room(rooms[room]);
            publicRooms.push(newRoom);
        }
        client.chat.publicRooms = publicRooms;
        client.emit(Events.PUBLIC_ROOMS, publicRooms);
    }
}

module.exports = PublicRoomsHandler;