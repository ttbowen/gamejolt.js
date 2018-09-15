/// <reference path='index.d.ts' />

import { Client, User, PublicRooms, Message } from 'gamejolt.js';

const client: Client = new Client();

// On connected event
client.on('connected', (user: User) => {
  // Enter lobby chat
  client.chat.enterRoom(PublicRooms.lobby);

  console.log(`Joined chat as ${user.displayName}`);
});

// On message event
client.on('message', (message: Message) => {
  if (message.isMentioned) {
    console.log('We have been mentioned!');
  }

  if (message.toString() === 'ping') {
    message.reply('pong!');
  }
});
