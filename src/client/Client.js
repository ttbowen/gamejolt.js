'use strict';

const events = require('events');

const PrimusManager = require('./primus/PrimusManager');
const SiteAPIManager = require('./api/SiteAPIManager');
const ClientUser = require('../structures/site/ClientUser');

/**
 * The Game Jolt Client.
 * This exposes the chat connection and api client.
 * @class Client
 * @extends {events.EventEmitter}
 */
class Client extends events.EventEmitter {
  /**
   * Creates an instance of Client.
   * @param {any} options The client options.
   * @param {number} [options.countInterval=300] Interval to request friend and notification count.
   * @param {number} [options.friendRequestInterval=180] Interval to fetch friend requests.
   * @constructor
   */
  constructor(options = {}) {
    super();

    /**
     * The client username.
     * @type {string}
     */
    this.username = null;

    /**
     * Timestamp of client start (in milliseconds).
     * @type {number}
     */
    this.startTime = null;

    /**
     * Instance of current Client user.
     * @type {ClientUser}
     */
    this.clientUser = null;

    /**
     * Game Jolt activity count.
     * @type {number}
     */
    this.activityCount = 0;

    /**
     * Contains user friend requests.
     * @type {Array<FriendRequest>}
     */
    this.friendRequests = [];

    /**
     * Contains user notifications and site activity.
     * @type {Array<Notification>}
     */
    this.notifications = [];

    /**
     * The interval to request the friend and notification counts.
     * @type {number}
     */
    this.countInterval = options.countInterval ? options.countInterval : 300;

    /**
     * The interval to fetch friend requests.
     * @type {number}
     */
    this.friendRequestInterval = options.friendRequestInterval
      ? options.friendRequestInterval
      : 180;

    /**
     * Site API client.
     * @type {SiteAPIManager}
     */
    this.api = new SiteAPIManager(this);

    /**
     * Primus manager. This is used to connect to the chat.
     * @type {PrimusManager}
     */
    this.primus = new PrimusManager(this);

    /**
     * Friend request count. This is fetched by the client.
     * @type {number}
     */
    this.friendRequestCount = 0;

    /**
     * Requests per interval. This is used for rate limiting.
     * @type {number}
     */
    this.rateLimitRequests = options.rateLimitRequests || 1;

    /**
     * Rate limit duration.
     * @type {number}
     */
    this.rateLimitDuration = options.rateLimitDuration || 1;

    this._initTimers();
  }

  /**
   * Return the chat client.
   * @readonly
   * @memberof Client
   */
  get chat() {
    return this.primus;
  }

  /**
   * Login to Game Jolt account and establish connection
   * to the Game Jolt chat. Requires Game Jolt username and password.
   * @param {*} username Game Jolt username.
   * @param {*} password Game Jolt password.
   * @returns {Promise}
   * @memberof Client
   */
  login(username, password) {
    if (username === '' || password === '') {
      throw new Error('You must pass in a valid username and password');
    }

    const instance = this;

    return new Promise(resolve => {
      this.api.auth(username, password).then(result => {
        if (result.data.payload.success) {
          this.clientUser = new ClientUser(this, result.data.payload.user);
          instance.api.getChat().then(server => {
            instance.initChat(server, instance.api.frontend);
          });
          resolve(result.data.payload);
        }
      });
    });
  }

  /**
   * Logout as the current user.
   * @memberof Client
   */
  logout() {
    const instance = this;
    this.username = '';
    this.api.logout().then(() => {
      instance.client.chat.logout();
    });
  }

  /**
   * Initialise timers to send fetch requests.
   * This keeps the notification/friend requests and counts
   * up to date. This Should only be used internally.
   * @memberof Client
   */
  _initTimers() {
    setInterval(() => {
      this.fetchNotificationCount();
    }, this.countInterval * 1000);
    setInterval(() => {
      this.fetchFriendCount();
    }, this.countInterval * 1000);
    setInterval(() => {
      this.fetchFriendRequests();
    }, this.friendRequestInterval * 1000);
  }

  /**
   * Initialise the chat client
   * Generally this should only be needed to be used
   * internally by the client.
   * @param {string} server The chat server endpoint.
   * @param {string} frontend The session cookie.
   * @memberof Client
   */
  initChat(server, frontend) {
    if (server && frontend) {
      this.primus.connect(
        server,
        frontend
      );
    } else throw new Error('chat endpoint and frontend needs to be provided.');
  }

  /**
   * Fetch all notification items.
   * @returns {Promise<Array<Notification>>}
   * @memberof Client
   */
  fetchNotifications() {
    return this.api.getNotifications().then(notifications => {
      if (notifications) {
        this.notifications = notifications;
        this.emit('notifications', notifications);
      }
    });
  }

  /**
   * Fetch the user notification count.
   * @returns {Promise<number>}
   * @memberof Client
   */
  fetchNotificationCount() {
    return this.api.getActivityCount().then(count => {
      if (count) {
        this.activityCount = count;
        this.emit('activity-count', count);
      }
    });
  }

  /**
   * Fetch all user friend requests.
   * @returns {Promise<number>}
   * @memberof Client
   */
  fetchFriendRequests() {
    return this.api.getFriendRequests().then(requests => {
      if (requests) {
        this.friendRequests = requests;
        this.emit('friend-requests', requests);
      }
    });
  }

  /**
   * Fetch user friend request count.
   * @return {Promise<number>}
   * @memberof Client
   */
  fetchFriendCount() {
    return this.api.getFriendCount().then(count => {
      if (count) {
        this.friendRequestCount = count;
        this.emit('request-count', count);
      }
    });
  }

  /**
   * Emitted when friend request counts have been fetched.
   * @event event#request-count
   * @param {number}
   * @memberof Client
   */

  /**
   * Emitted when friend requests have been fetched.
   * @event event#friend-requests
   * @param {Array<FriendRequest>}
   * @memberof Client
   */

  /**
   * Emitted when notifications have been fetched.
   * @event event#notifications
   * @param {Array<Notification>}
   * @memberof Client
   */

  /**
   * Emitted when site activity data has been fetched.
   * @event event#activity
   * @memberof Client
   */
}

module.exports = Client;
