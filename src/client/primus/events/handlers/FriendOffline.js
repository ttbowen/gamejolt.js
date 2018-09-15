'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;

class FriendOfflineHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const userId = payload.data.userId;

    if (client.chat.friends) {
      const user = client.chat.friends.get(userId);

      client.chat.friends.offline(userId);
      client.emit(Events.FRIEND_OFFLINE, userId, new User(client, user));
    }
  }
}

module.exports = FriendOfflineHandler;
