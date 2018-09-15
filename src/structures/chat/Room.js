'use strict';

/**
 * Represents a Game Jolt chat room
 * @class Room
 */
class Room {
  /**
   * Creates an instance of Room.
   *
   * @param {Client} client The Game Jolt client
   * @param {any} data The room data
   *
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
    this.lastMessageOn = new Date(data.lastMessageOn);
    this.staff = data.staff;
    this.status = data.status;
  }
}

module.exports = Room;
