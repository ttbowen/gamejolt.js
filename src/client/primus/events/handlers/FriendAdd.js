'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;

class FriendAddHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const newFriend = payload.data.user;

    if (client.chat.friends) {
      client.chat.friends.add(newFriend);
    }
    client.emit(Events.FRIEND_ADD, new User(client, newFriend));
  }
}

module.exports = FriendAddHandler;
