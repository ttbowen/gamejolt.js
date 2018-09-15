'use strict';

const Handler = require('./Handler');
const Message = require('../../../../structures/chat/Message');
const Events = require('../../../../util/Events').Events;

class NotificationHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;

    if (payload.data.hasOwnProperty('message')) {
      const message = new Message(client, payload.data.message);
      client.emit(Events.MESSAGE, message);
    } else {
      client.emit(Events.NOTIFICATION, payload.data);
    }
  }
}

module.exports = NotificationHandler;
