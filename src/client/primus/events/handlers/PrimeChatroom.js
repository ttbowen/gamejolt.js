'use strict';

const Handler = require('./Handler');
const UserCollection = require('../../../../structures/chat/UserCollection');
const Message = require('../../../../structures/chat/Message');
const Events = require('../../../../util/Events').Events;
const ChatConfig = require('../../../../util/ChatConfig').ChatConfig;

class PrimeChatroomHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const room = payload.data.room;
    const messages = payload.data.messages;
    const users = payload.data.users;

    client.chat.messages[room.id] = [];
    client.chat.joinedRooms[room.id] = room;

    messages.reverse();

    if (room.type === ChatConfig.ROOM_PM) {
      let friend;
      if (friend) {
        room.user = friend;
      }
    }

    for (let message in messages) {
      let newMessage = new Message(client, messages[message]);
      client.chat.messages[room.id].push(newMessage);
    }

    if (client.chat.isGroupRoom(room)) {
      client.chat.usersOnline[room.id] = new UserCollection(users);
    }
    client.emit(Events.PRIME_CHATROOM, payload.data);
  }
}

module.exports = PrimeChatroomHandler;
