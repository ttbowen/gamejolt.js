'use strict';

const GameJolt = require('../');

// Authentication credentials 
const username = require('./auth.json').username;
const password = require('./auth.json').password;

const client = new GameJolt.Client();

// Chat Connection
client.on('connected', data => {

    console.log(`Connected to chat as ${data.username}!`);

    // Enter Lobby room 
    client.chat.enterRoom(GameJolt.PublicRooms.Lobby);
});

// Game Jolt Login 
client.login(username, password).then(result => { });