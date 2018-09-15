'use strict';

const _ = require('lodash');

/**
 * Represents a user collection.
 * @class UserCollection
 */
class UserCollection {
  /**
   * Creates an instance of UserCollection.
   * @param {*} users An array of users.
   * @constructor
   */
  constructor(users) {
    this.collection = [];
    this.useronline = 0;
    this.useroffline = 0;
    this.populate(users);
  }

  /**
   * Get the user collection.
   * @readonly
   */
  get users() {
    return this.collection;
  }

  /**
   * Populate the collection.
   * @param {*} users The user collection.
   * @memberof UserCollection
   */
  populate(users) {
    for (let u in users) {
      let user = users[u];

      if (user.isOnline) {
        ++this.useronline;
      } else {
        ++this.useroffline;
      }
      this.collection.push(user);
    }
  }

  /**
   * Get a user from collection.
   * @param {number|Object} input The user or user Id.
   * @returns {*} The user object in collection.
   * @memberof UserCollection
   */
  get(input) {
    let userId = typeof input === 'number' ? input : input.id;
    return _.find(this.collection, { id: userId });
  }

  /**
   * Check if user is in collection.
   * @param {*} input
   * @returns {boolean}
   * @memberof UserCollection
   */
  has(input) {
    return !!this.get(input);
  }

  /**
   * Add a new user to collection.
   * @param {*} user The user to add.
   * @memberof UserCollection
   */
  add(user) {
    if (this.has(user)) return;

    if (user.isOnline) ++this.useronline;
    else ++this.useroffline;

    this.collection.push(user);
  }

  /**
   * Remove a user from collection.
   * @param {*} user The user to remove.
   * @memberof UserCollection
   */
  remove(user) {
    let userId = typeof user === 'number' ? user : user.id;
    let removedUsers = _.remove(this.collection, { id: userId });

    if (!removedUsers.length) return;

    if (removedUsers[0].isOnline) --this.useronline;
    else --this.useroffline;
  }

  /**
   * Update a user in collection.
   * @param {*} user The user to update.
   * @memberof UserCollection
   */
  update(user) {
    this.remove(user.id);
    this.add(user);
  }

  /**
   * Change a users status to online.
   * @param {*} input
   * @memberof UserCollection
   */
  online(input) {
    let user = this.get(input);

    if (!user) return;

    if (!user.isOnline) {
      --this.useroffline;
      ++this.useronline;
    }
    user.isOnline = true;
    this.update(user);
  }

  /**
   * Change a users status to offline.
   * @param {*} input
   * @memberof UserCollection
   */
  offline(input) {
    let user = this.get(input);

    if (!user) return;

    if (user.isOnline) {
      ++this.useroffline;
      --this.useronline;
    }
  }

  /**
   * Change a users status to muted.
   * @param {*} input The user to mute.
   * @param {boolean} isGlobal Whether this is a global mute.
   * @memberof UserCollection
   */
  mute(input, isGlobal) {
    let user = this.get(input);

    if (!user) return;

    if (isGlobal) user.isMutedGlobal = true;
    else user.isMutedRoom = true;

    this.update(user);
  }

  /**
   * Change a users status to unmuted.
   * @param {*} input The user to unmute.
   * @param {boolean} isGlobal Whether this is a global unmute.
   * @memberof UserCollection
   */
  unmute(input, isGlobal) {
    let user = this.get(input);

    if (!user) return;

    if (isGlobal) user.isMutedGlobal = false;
    else user.isMutedRoom = false;

    this.update(user);
  }

  /**
   * Change a user to room 'moderator' status.
   * @param {*} input The user to make mod.
   * @memberof UserCollection
   */
  mod(input) {
    let user = this.get(input);

    if (!user) return;

    user.isMod = 'moderator';
    this.update(user);
  }

  /**
   * Remove a users 'moderator' status.
   * @param {*} input The user to demod.
   * @memberof UserCollection
   */
  demod(input) {
    let user = this.get(input);

    if (!user) return;

    user.isMod = false;
    this.update(user);
  }

  /**
   * Get a user by room.
   * @param {number|Object} input The room id or object.
   * @returns {*} The user in passed room.
   * @memberof UserCollection
   */
  getByRoom(input) {
    let roomId = typeof input === 'number' ? input : input.id;
    return _.find(this.collection, { roomId: roomId });
  }
}

module.exports = UserCollection;
