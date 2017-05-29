# Game Jolt.js

This is a client for interacting with the Game Jolt site API and chat.
Currently written in ES6 JavaScript, with TypeScript support available.


## Installation

To use this package you must install `node 4.4.7` or later.

## Examples

Below is a simple example to demonstrate the connection code using
this library.

```javascript
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
```

Below is another example showing message events.

```javascript

// Message event 
client.on('message', message => {

    if (message.toString() === 'ping') {
        message.reply('pong');
    }
    
    // Is the client user mentioned
    if(message.isMentioned) {
        message.reply(`Hello ${message.user.username}!`);
    }
});
```

## Help

If you need help or have any questions about this package,
then please contact me at `ttbowen11@hotmail.co.uk`.