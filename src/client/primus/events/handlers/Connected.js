'use strict';

const Handler = require('./Handler');
const User = require('../../../../structures/chat/User');
const Events = require('../../../../util/Events').Events;


class ConnectedHandler extends Handler {

    handle(payload) {
       const client = this.eventManager.client;
       const user = new User(client, payload.data.user); 
       client.chat.isConnected = true;
       client.chat.me = user;

       client.emit(Events.CONNECTED, user);
    }
}

module.exports = ConnectedHandler;