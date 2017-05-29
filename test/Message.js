'use strict';

const GameJolt = require('../');

// Authentication credentials 
const username = require('./auth.json').username;
const password = require('./auth.json').password;

const client = new GameJolt.Client();

client.on('connected', data => { client.chat.enterRoom(GameJolt.PublicRooms.Lobby) });

// Message event 
client.on('message', message => {

    if (message.toString() === 'ping') {
        message.reply('pong');
    }
    
    if(message.isMentioned) {
        message.reply(`Hello ${message.user.username}!`);
    }
});

// Game Jolt Login 
client.login(username, password).then(result => { });