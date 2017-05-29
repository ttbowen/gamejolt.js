'use strict';

const User = require('./SiteUser');

/**
 * Represents a Friend request
 * @class FriendRequest
 */
class FriendRequest {
    
    /**
     * Creates an instance of FriendRequest.
     * 
     * @param {Client} client The Game Jolt client
     * @param {any} data The friend request data
     * 
     * @constructor
     */
    constructor(client, data) {
        this.client = client;
        if (data) this.setup(data);
    }

    setup(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.target_user_id = data.target_user_id;
        this.user = new User(this.client, data.user);
        this.target_user = new User(this.client, data.target_user);
        this.created_on = new Date(data.created_on);
        this.accepted_on = new Date(data.accepted_on);
        this.declined_on = new Date(data.declined_on);
        this.state = data.state;
    }

    /**
     * Accept the friend request
     * @returns {Promise}
     * 
     * @memberof FriendRequest
     */
    accept() {
        return new Promise((resolve) => {
            this.client.api.friendAccept(this.id).then((response) => {
                resolve(response.success);
            });
        })
    }
}

module.exports = FriendRequest;