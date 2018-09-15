'use strict';

const User = require('./User');
const Room = require('./Room');
const Client = require('../../client/Client'); // eslint-disable-line no-unused-vars
const ChatConfig = require('../../util/ChatConfig').ChatConfig;
const Markdown = require('../../util/Markdown');

/**
 * Represents a Game Jolt chat message.
 * @class Message
 */
class Message {
  /**
   * Creates an instance of Message.
   * @param {Client} client The client instance.
   * @param {*} data The message payload.
   * @constructor
   */
  constructor(client, data) {
    this.client = client;

    if (data) this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.user = new User(this.client, data.user);
    this.roomId = data.roomId;
    this.room = new Room(this.client, data.room);
    this.content = data.content;
    this.contentRaw = data.contentRaw;
    this.loggedOn = new Date(data.loggedOn);
    this.status = data.status;
    this.replied = false;
  }

  /**
   * Reply to a chat message.
   * @param {string} content The message content.
   * @memberof Message
   */
  reply(content) {
    if (this.user.id === this.client.chat.me.id) return;

    const author =
      this.room.type != ChatConfig.ROOM_PM
        ? Markdown.addMention(this.user.username)
        : '';
    content = `${author} ${content}`;

    if (!this.hasReplied) this.client.chat.sendMessage(content, this.roomId);

    this.replied = true;
  }

  /**
   * Check whether the client user has been mentioned in message.
   * @readonly
   * @memberof Message
   */
  get isMentioned() {
    const mention = new RegExp(`((@)*${this.client.chat.me.username})`);
    return mention.test(this.contentRaw) ? true : false;
  }

  toString() {
    return this.contentRaw;
  }
}

module.exports = Message;
