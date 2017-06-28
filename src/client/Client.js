'use strict';

const events = require('events');

const Moment = require('moment');
const Colour = require('colour');
const PrimusManager = require('./primus/PrimusManager');
const SiteAPIManager = require('./api/SiteAPIManager');
const User = require('../structures/chat/User');
const ClientUser = require('../structures/site/ClientUser');


/**
 * The Game Jolt Client and main class.
 * This provides access to chat and site api clients.
 * 
 * @class Client
 * @extends {events.EventEmitter}
 */
class Client extends events.EventEmitter {


    /**
     * Creates an instance of Client.
     * 
     * @param {any} options client options
     * @param {number} [options.countInterval=300] Interval to request friend and notification count
     * @param {number} [options.friendRequestInterval=180] Interval to fetch friend requests
     * 
     * @constructor
     * 
     * @memberof Client
     */
    constructor(options = {}) {
        super();

        /**
         * The client username
         * @type {string}
         */
        this.username = null;

        /**
         * Timestamp of client start
         * @type {number}
         */
        this.startTime = null;

        /**
         * Instance of current Client user
         * @type {ClientUser}
         */
        this.clientUser = null;

        /**
         * Game Jolt activity count
         * @type {number}
         */
        this.activityCount = 0;

        /**
         * Contains user friend requests
         * @type {Array<FriendRequest>}
         */
        this.friendRequests = [];

        /**
         * Contains user notifications and site activity
         * @type {Array<Notification>}
         */
        this.notifications = [];

        /**
         * Interval to request friend and notification counts
         * @type {number}
         */
        this.countInterval = options.countInterval ? options.countInterval : 300;

        /**
         * Interval to fetch friend requests
         * @type {number}
         */
        this.friendRequestInterval = options.friendRequestInterval ? options.friendRequestInterval : 180;

        /**
         * Site API client
         * @type {SiteAPIManager}
         */
        this.api = new SiteAPIManager(this);

        /**
         * Primus manager. This is used to connect to the chat
         * @type {PrimusManager}
         */
        this.primus = new PrimusManager(this);

        this._initTimers();
    }


    /**
     * Return the chat client
     * @readonly
     * 
     * @memberof Client
     */
    get chat() {
        return this.primus;
    }

    /**
     * Login to Game Jolt account and establish connection
     * to Game Jolt chat. Requires Game Jolt username and password.
     * 
     * @param {string} username Game Jolt username
     * @param {string} password Game Jolt password
     * 
     * @memberof Client
     */
    login(username, password) {
        if (username === '' || password === '') {
            throw new Error('You must pass in a valid username and password');
        }

        const instance = this;

        return new Promise((resolve) => {
            this.api.auth(username, password).then((result) => {

                if (result.data.payload.success) {
                    this.clientUser = new ClientUser(this, result.data.payload.user);
                    instance.api.getChat().then((server) => {
                        instance.initChat(server, instance.api.frontend);
                    });
                    resolve(result.data.payload);
                }
            });
        });
    }


    /**
     * Logout as the current user
     * 
     * @memberof Client
     */
    logout() {
        const instance = this;
        this.username = '';
        this.api.logout().then((result) => {
            instance.client.chat.logout();
        });
    }
    
    
    /**
     * 
     * Initialise timers to send fetch requests.
     * This keeps the notification/friend requests and counts
     * up to date. This Should only be used internally.
     * @memberof Client
     */
    _initTimers() {
        setInterval(() => { this.fetchNotificationCount() }, this.countInterval * 1000);
        setInterval(() => { this.fetchFriendCount() }, this.countInterval * 1000);
        setInterval(() => { this.fetchFriendRequests() }, this.friendRequestInterval * 1000);
    }

    /**
     * Initialise the chat client
     * Generally this should only be needed to be used
     * internally by the client
     * 
     * @param {string} server The chat server endpoint
     * @param {string} frontend The session cookie
     * 
     * @memberof Client
     */
    initChat(server, frontend) {
        if (server && frontend) {
            this.primus.connect(server, frontend);
        }
        else throw new Error('chat endpoint and frontend needs to be provided.');
    }

    /**
     * Fetch all notification items
     * 
     * @memberof Client
     */
    fetchNotifications() {
        this.api.getNotifications().then((notifications) => {
            if (notifications) {
                this.notifications = notifications;
                this.emit('notifications', notifications);
            }
        });
    }

    /**
     * Fetch notification count
     * 
     * @memberof Client
     */
    fetchNotificationCount() {
        this.api.getActivityCount().then((count) => {
            if (count) {
                this.activityCount = count;
                this.emit('activity-count', count);
            }
        });
    }

    /**
     * Fetch all friend requests
     * 
     * @memberof Client
     */
    fetchFriendRequests() {
        this.api.getFriendRequests().then((requests) => {
            if (requests) {
                this.friendRequests = requests;
                this.emit('friend-requests', requests);
            }
        });
    }

    /**
     * Fetch friend count
     * 
     * @memberof Client
     */
    fetchFriendCount() {
        this.api.getFriendRequests().then((requests) => {
            if (requests) {
                this.friendRequests = requests;
                this.emit('request-count', requests)
            }
        });
    }

    /**
     * Emitted when friend request counts have been fetched 
     * @event event#request-count
     * @memberof Client
     */

    /**
     * Emitted when friend requests have been fetched 
     * @event event#friend-requests
     * @memberof Client
     */

    /**
     * Emitted when notifications have been fetched
     * @event event#notifications
     * @memberof Client
     */

    /**
     * Emitted when site activity data has been fetched
     * @event event#activity
     * @memberof Client
     */
}

module.exports = Client;