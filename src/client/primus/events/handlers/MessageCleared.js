'use strict';

const Handler = require('./Handler');
const Events = require('../../../../util/Events').Events;

class MessageClearedHandler extends Handler {
  handle(payload) {
    const client = this.eventManager.client;

    client.emit(Events.MESSAGE_CLEARED, payload.data);
  }
}

module.exports = MessageClearedHandler;
