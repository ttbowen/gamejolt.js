'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class ClearNotificationsHandler extends Handler {

    handle(payload) {
       const client = this.eventManager.client;

       client.emit(Events.CLEAR_NOTIFICATIONS, payload.data);
    }
}

module.exports = ClearNotificationsHandler;