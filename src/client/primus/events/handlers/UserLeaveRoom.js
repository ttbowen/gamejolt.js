'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;

class UserLeaveHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const chat = client.chat;
    const roomId = payload.data.roomId;
    const userId = payload.data.userId;

    if (client.chat.usersOnline[roomId]) {
      const user = client.chat.usersOnline[roomId].get(userId);

      if (
        chat.joinedRooms[roomId] &&
        chat.isGroupRoom(chat.joinedRooms[roomId])
      ) {
        chat.usersOnline[roomId].remove(userId);
      }

      if (user) {
        client.emit(
          Events.USER_LEAVE_ROOM,
          userId,
          roomId,
          new User(client, user)
        );
      } else {
        client.emit(Events.USER_LEAVE_ROOM, userId, roomId);
      }
    }
  }
}

module.exports = UserLeaveHandler;
