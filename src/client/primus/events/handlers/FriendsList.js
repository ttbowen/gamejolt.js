'use strict';

const Handler = require('./Handler');
const Events = require('../../../../util/Events').Events;
const UserCollection = require('../../../../structures/chat/UserCollection');

class FriendsListHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const friendsList = new UserCollection(payload.data.friendsList);

    client.chat.friends = friendsList;
    client.emit(Events.FRIENDS_LIST, friendsList);
  }
}

module.exports = FriendsListHandler;
