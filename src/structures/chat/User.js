'use strict';

const Client = require('../../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a Game Jolt Chat User
 * @class User
 */
class User {
  /**
   * Creates an instance of User.
   * @param {Client} client The client instance.
   * @param {*} data The user data.
   * @constructor
   */
  constructor(client, data) {
    this.client = client;
    if (data) this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.type = data.type;
    this.status = data.status;
    this.username = data.username;
    this.displayName = data.displayName;
    this.imgAvatar = data.imgAvatar;
    this.permissionLevel = data.permissionLevel;
    this.currentlyPlaying = data.currentlyPlaying;
  }
}

module.exports = User;
