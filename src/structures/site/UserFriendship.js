'use strict';

const User = require('./SiteUser');

/**
 * Represents a Friendship
 * @class UserFriendship
 */
class UserFriendship {
    
    /**
     * Creates an instance of UserFriendship.
     * 
     * @param {Client} client The Game Jolt client
     * @param {any} data The user friendship data
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
        this.targeted_user = new User(this.client, data.targeted_user);
        this.target_user_id = data.target_user_id;
        this.user = new User(this.client, data.user);
        this.accepted_on = new Date(data.accepted_on);
        this.created_on = new Date(data.accepted_on);
        this.declined_on = new Date(data.declined_on);
        this.state = data.state;
    }

    /**
     * Remove a user as friend
     * @returns {Promise}
     * 
     * @memberof UserFriendship
     */
    removeFriend() {
        return new Promise((resolve) => {
            this.client.api.friendRemove(this.id).then((response) => {
                resolve(response.success);
            });
        });
    }
}

module.exports = UserFriendship;