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

    if (
      chat.joinedRooms[roomId] &&
      chat.isGroupRoom(chat.joinedRooms[roomId])
    ) {
      chat.usersOnline[roomId].add(user);
    }
    client.emit(Events.USER_ENTER_ROOM, roomId, new User(client, user));
  }
}

module.exports = UserEnterHandler;
