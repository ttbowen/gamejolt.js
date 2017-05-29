'use strict';

const GameJolt = require('../');

// Authentication credentials 
const username = require('./auth.json').username;
const password = require('./auth.json').password;

const client = new GameJolt.Client();

// Chat Connection
client.on('connected', data => {
    // Enter Lobby room 
    client.chat.enterRoom(GameJolt.PublicRooms.Lobby);
});

// User entered room
client.on('user-enter-room', (data) => {
    console.log(data);
});

// User left room
client.on('user-leave-room', (data) => {
    console.log(data);
});

// User muted
client.on('user-muted', (data) => {
    console.log(data);
});

// User unmuted
client.on('user-unmuted', (data) => {
    console.log(data);
});

// Game Jolt Login 
client.login(username, password).then(result => { });