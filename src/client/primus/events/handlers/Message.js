'use strict';

const Handler = require('./Handler');
const Message = require('../../../../structures/chat/Message');
const Events = require('../../../../util/Events').Events;
const ChatConfig = require('../../../../util/ChatConfig').ChatConfig;

class MessageHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;
    const message = new Message(client, payload.data.message);

    if (client.chat.messages[message.roomId]) {
      client.chat.messages[message.roomId].push(message);

      if (
        client.chat.messages[message.roomId].length >
        ChatConfig.MAX_NUM_MESSAGES
      ) {
        client.chat.messages[message.roomId].splice(0, 1);
      }
    }
    client.emit(Events.MESSAGE, message);
  }
}

module.exports = MessageHandler;
