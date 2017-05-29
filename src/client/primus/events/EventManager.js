'use strict';

const Events = require('../../../util/Events').Events;

/**
 * Game Jolt Chat event manager
 * @class EventManager
 */
class EventManager {

    /**
     * Creates an instance of EventManager.
     * 
     * @param {Client} client The Gme Jolt client
     * 
     * @constructor
     */
    constructor(client) {
        this.client = client;
        this.handlers = {};
        this.register(Events.CONNECTED, 'Connected');
        this.register(Events.CLEAR_NOTIFICATIONS, 'ClearNotifications');
        this.register(Events.FRIEND_ADD, 'FriendAdd');
        this.register(Events.FRIEND_REMOVE, 'FriendRemove');
        this.register(Events.FRIEND_ONLINE, 'FriendOnline');
        this.register(Events.FRIEND_OFFLINE, 'FriendOffline');
        this.register(Events.FRIENDS_LIST, 'FriendsList');
        this.register(Events.FRIEND_UPDATED, 'FriendUpdated');
        this.register(Events.MESSAGE, 'Message');
        this.register(Events.MESSAGE_CLEARED, 'MessageCleared');
        this.register(Events.NOTIFICATION, 'Notification');
        this.register(Events.ONLINE_COUNT, 'OnlineCount');
        this.register(Events.PRIME_CHATROOM, 'PrimeChatroom');
        this.register(Events.PUBLIC_ROOMS, 'PublicRooms');
        this.register(Events.ROLE_SET, 'RoleSet');
        this.register(Events.USER_ENTER_ROOM, 'UserEnterRoom');
        this.register(Events.USER_LEAVE_ROOM, 'UserLeaveRoom');
        this.register(Events.USER_UPDATED, 'UserUpdated');
        this.register(Events.USER_MUTED, 'UserMuted');
        this.register(Events.USER_UNMUTED, 'UserUnmuted');
        this.register(Events.YOU_UPDATED, 'YouUpdated');
        this.register(Events.YOU_LEAVE_ROOM, 'YouLeaveRoom');
    }

    /**
     * Register a new event
     * 
     * @param {string} event The event name
     * @param {string} handle The event handler name
     * 
     * @memberof EventManager
     */
    register(event, handle) {
        const Handler = require(`./handlers/${handle}`);
        this.handlers[event] = new Handler(this);
    }

    handle(data) {
        if(this.handlers[data.event])
            return this.handlers[data.event].handle(data);
        return false;
    }
}

module.exports = EventManager;