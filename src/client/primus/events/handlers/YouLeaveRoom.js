'use strict';

const Handler = require('./Handler');
const Events = require('../../../../util/Events').Events;

class YouLeaveRoomHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const chat = client.chat;
    const roomId = payload.data.roomId;

    if (chat.joinedRooms[roomId]) {
      delete chat.usersOnline[roomId];
      delete chat.joinedRooms[roomId];
      delete chat.messages[roomId];
    }
    client.emit(Events.YOU_LEAVE_ROOM, payload.data);
  }
}

module.exports = YouLeaveRoomHandler;
