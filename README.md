# Game Jolt.js
[![Build Status](https://travis-ci.org/bowenwaregames/gamejolt.js.svg?branch=dev)](https://travis-ci.org/bowenwaregames/gamejolt.js)

This is a JavaScript client for interacting with the Game Jolt site API and chat.

Pull requests are also welcome. If you find any issues please open a new issue [here](https://github.com/bowenwaregames/gamejolt.js/issues).

## Installation

This requires `node 4.4.7` or later.

## Examples

Below is a simple example for demonstrating the client setup:

```javascript
// Authentication credentials
const username = require('./auth.json').username;
const password = require('./auth.json').password;

const client = new GameJolt.Client();

// Chat Connection
client.on('connected', data => {
  console.log(`Connected to chat as ${data.username}!`);

  // Enter Lobby room
  client.chat.enterRoom(GameJolt.PublicRooms.lobby);
});

// Game Jolt Login
client.login(username, password).then(result => {});
```

Below is another example to demonstrate message events:

```javascript
// Message event
client.on('message', message => {
  if (message.toString() === 'ping') {
    message.reply('pong');
  }

  // Is the client user mentioned
  if (message.isMentioned) {
    message.reply(`Hello ${message.user.username}!`);
  }
});
```

## Help

If you need help or have any questions,
then please contact me at `ttbowen11@hotmail.co.uk`.
