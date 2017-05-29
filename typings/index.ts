/// <reference path='index.d.ts' />

import * as gamejolt from 'gamejolt.js';

let client = new gamejolt.Client();

// On connected event
client.on('connected', (user) => {

    // Enter lobby chat
    client.chat.enterRoom(gamejolt.PublicRooms.Lobby);

    console.log(`Joined chat as ${user.displayName}`);
});

// On message event 
client.on('message', (message) => {

    if (message.isMentioned) {
        console.log("We have been mentioned!");
    }

    if (message.toString() == 'ping') {
        message.reply('pong!');
    }
});