const GameJolt = require('../');

// Authentication credentials 
const username = require('./auth.json').username;
const password = require('./auth.json').password;

const client = new GameJolt.Client();

// Game Jolt Login 
client.login(username, password).then(result => {

    client.clientUser.setBio('A test bio set by the client.').then((result) => {
        if (result) {
            console.log(`Successfully changed bio!`);
        }
    });
});