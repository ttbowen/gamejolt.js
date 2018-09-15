'use strict';

const Primus = require('primus');
const events = require('events');
const Moment = require('moment');

const Socket = Primus.createSocket({ transformer: 'engine.io' });

const Client = require('../Client'); // eslint-disable-line no-unused-vars
const RateLimiter = require('./RateLimiter');
const EventManager = require('./events/EventManager');
const ChatConfig = require('../../util/ChatConfig').ChatConfig;

/**
 * Primus client.
 * This handles and maintains the primus connection and primus events.
 * @class PrimusManager
 * @extends {events.EventEmitter}
 */
class PrimusManager extends events.EventEmitter {
  /**
   * Creates an instance of PrimusManager.
   * @param {Client} client The client instance.
   * @memberof PrimusManager
   */
  constructor(client) {
    super();
    this.client = client;
    this.eventManager = new EventManager(client);
    this.socket = null;
    this.spark = null;
    this.rateLimiter = {};
    this.resetClient();
  }

  /**
   * Return primus uptime.
   * @readonly
   * @memberof PrimusManager
   */
  get uptime() {
    return this.startTime ? Date.now() - this.startTime : null;
  }

  /**
   * Connects to the chat server.
   * @param {string} server The url of the primus server.
   * @param {string} frontend The frontend cookie.
   * @memberof PrimusManager
   */
  connect(server, frontend) {
    // Reset the primus client
    this.resetClient();
    this.client.emit('connecting');

    // Create a new instance of primus
    this.socket = new Socket(server);

    // Setup event listeners
    this.socket.on('open', spark => {
      this.spark = spark;
      this.setCookie(frontend);
    });

    this.socket.on('data', msg => {
      this._processMessage(msg);
    });
    this.socket.on('error', () => {});
    this.socket.on('reconnected', () => {
      this.resetClient();
    });
  }

  /**
   * Reconnect to the chat when disconnected.
   * @memberof PrimusManager
   */
  reconnect() {
    this.resetClient();

    if (this.spark) {
      this.spark.end(undefined, { reconnect: true });
      this.client.emit('reconnecting');
    }
  }

  /**
   * Reset the primus client.
   * @memberof PrimusManager
   */
  resetClient() {
    this.startTime = Date.now();
    this.socket = null;
    this.me = null;
    this.isConnected = false;
    this.friends = {};
    this.joinedRooms = {};
    this.usersOnline = {};
    this.messages = {};
    this.userCount = 0;
    this.publicRooms = [];
  }

  logout() {
    this.reconnect();
    this.emit('logout');
  }

  /**
   * Set the passed cookie.
   * @param {string} cookie The cookie to set.
   * @memberof PrimusManager
   */
  setCookie(cookie) {
    this.socket.write({
      event: 'set-cookie',
      cookie: cookie
    });
  }

  /**
   * Enter the passed room.
   * @param {number} roomId The identifier of the room to enter.
   * @memberof PrimusManager
   */
  enterRoom(roomId) {
    this.socket.write({
      event: 'enter-room',
      roomId: roomId
    });
  }

  /**
   * Leave the passed room.
   * @param {number} roomId The identifier of the room to leave.
   * @memberof PrimusManager
   */
  leaveRoom(roomId) {
    this.socket.write({
      event: 'leave-room',
      roomId: roomId
    });
  }

  /**
   * Send a chat message.
   * @param {string} message The content of the message.
   * @param {number} roomId The identifier of the room to message.
   * @memberof PrimusManager
   */
  sendMessage(message, roomId) {
    if (message === '') return;

    if (!this.rateLimiter[roomId]) {
      this.rateLimiter[roomId] = new RateLimiter(
        this.client.rateLimitRequests,
        this.client.rateLimitDuration
      );
    }

    if (!this.rateLimiter[roomId].throttle()) {
      this.socket.write({
        event: 'message',
        content: message,
        roomId: roomId
      });
    }
  }

  /**
   * Set a user to 'moderator' status in room.
   * @param {number} userId The identifier of the user to mod.
   * @param {number} roomId The identifier of the room.
   * @memberof PrimusManager
   */
  mod(userId, roomId) {
    this.socket.write({
      event: 'user-mod',
      userId: userId,
      roomId: roomId
    });
  }

  /**
   * Remove a users 'moderator' status in room.
   * @param {number} userId The identifier of the user to mod.
   * @param {number} roomId The identifier of the room.
   * @memberof PrimusManager
   */
  demod(userId, roomId) {
    this.socket.write({
      event: 'user-demod',
      userId: userId,
      roomId: roomId
    });
  }

  /**
   * Remove a message from the chat.
   * @param {number} msgId The identifier of the message to remove.
   * @param {number} roomId The identifier of the room.
   * @memberof PrimusManager
   */
  messageRemove(msgId, roomId) {
    this.socket.write({
      event: 'message-remove',
      msgId: msgId,
      roomId: roomId
    });
  }

  /**
   * Check if room is a private room.
   * @param {*} room The room object.
   * @returns {boolean}
   * @memberof PrimusManager
   */
  isPmRoom(room) {
    if (!room) return false;

    return room ? room.type === ChatConfig.ROOM_PM : false;
  }

  /**
   * Check if room is a group room.
   * @param {*} room The room object.
   * @returns {boolean}
   * @memberof PrimusManager
   */
  isGroupRoom(room) {
    if (!room) return false;

    return room
      ? room.type === ChatConfig.ROOM_OPEN_GROUP ||
          room.type === ChatConfig.ROOM_CLOSED_GROUP ||
          room.type === ChatConfig.ROOM_VIRAL_GROUP
      : false;
  }

  /**
   * Focus on events from room.
   * @param {number} roomId The identifier of the room.
   * @memberof PrimusManager
   */
  focus(roomId) {
    this.socket.write({
      event: 'room-focus',
      roomId: roomId
    });
  }

  /**
   * Unfocus from room.
   * @param {number} roomId The identifier of the room.
   * @memberof PrimusManager
   */
  unFocus(roomId) {
    this.socket.write({
      event: 'room-unfocus',
      roomId: roomId
    });
  }

  /**
   * Log the chat message in console.
   * @param {Message} msg The message to log.
   * @memberof PrimusManager
   */
  logMessage(msg) {
    const timestamp = Moment().format('hh:mm');
    const user = msg.user;
    const room = `Room ${msg.roomId}`;
    const message = msg.contentRaw;

    // eslint-disable-next-line
    console.log(
      `${room.yellow} | ${timestamp} ${user.displayName.green} - ${message}`
    );
  }

  _processMessage(msg) {
    this.emit('data-received', msg);
    return this.eventManager.handle(msg);
  }
}

module.exports = PrimusManager;
