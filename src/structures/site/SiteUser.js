'use strict';

/**
 * Represents a Game Jolt user
 * @class SiteUser
 */
class SiteUser {
    
    /**
     * Creates an instance of SiteUser.
     * 
     * @param {Client} client The Game Jolt client
     * @param {any} data The user data
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
        this.username = data.username;
        this.name = data.name
        this.displayName = data.display_name;
        this.joined = new Date(data.created_on);
        this.lastOnline = new Date(data.last_logged_on);
        this.isVerified = data.is_verified;
        this.slug = data.slug;
        this.website = data.web_site;
        this.url = data.url;
        this.experience = data.experience;
        this.experienceNext = data.experience_next;
        this.dogTag = data.dogtag;
        this.imgAvatar = data.img_avatar;
        this.status = data.status;
        this.permissionLevel = data.permission_level;
        this.twitterId = data.twitter_id;
        this.twitterScreenName = data.twitter_screenname;
        this.facebookId = data.facebook_id;
        this.facebookName = data.facebook_name;
        this.googleId = data.google_id;
        this.googleNickname = data.google_nickname;
        this.level = data.level;
    }

    /**
     * Send a friend request to user
     * @returns {Promise}
     * 
     * @memberof SiteUser
     */
    sendFriendRequest() {
        return new Promise((resolve) => {
            this.client.api.friendAdd(this.id).then((response) => {
                resolve(response.success);
            });
        });
    }

    toString() {
        return this.username;
    }
}

module.exports = SiteUser;