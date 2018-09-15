'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;
const cloneObject = require('../../../../util/CloneObject');

class FriendRemoveHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const userId = payload.data.userId;

    if (client.chat.friends) {
      const user = client.chat.friends.get(userId);

      if (user) {
        const removed = cloneObject(user);
        client.chat.leaveRoom(user.roomId);
        client.emit(Events.FRIEND_REMOVE, userId, new User(client, removed));
      } else {
        client.emit(Events.FRIEND_REMOVE, userId);
      }
      client.chat.friends.remove(userId);
    }
  }
}

module.exports = FriendRemoveHandler;
