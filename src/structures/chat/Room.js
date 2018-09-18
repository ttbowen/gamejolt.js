'use strict';

const Client = require('../../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a Game Jolt chat room.
 * @class Room
 */
class Room {
  /**
   * Creates an instance of Room.
   * @param {Client} client The client instance.
   * @param {*} data The room payload.
   * @constructor
   */
  constructor(client, data) {
    this.client = client;
    if (data) this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.descriptionMarkdown = data.description_markdown;
    this.lastMessageOn = data.lastMessageOn;
    this.staff = data.staff;
    this.status = data.status;
  }
}

module.exports = Room;
