'use strict';

const SiteUser = require('./SiteUser');
const ProfileEdit = require('../../client/api/payloads/ProfileEdit');
const EmailEdit = require('../../client/api/payloads/EmailEdit');

/**
 * Represents the Client user
 * @class ClientUser
 */
class ClientUser extends SiteUser {
  /**
   * Creates an instance of ClientUser.
   *
   * @param {Client} client The Game Jolt client
   * @param {any} data The user data
   *
   * @constructor
   */
  constructor(client, data) {
    super(client, data);
  }

  /**
   * Set a new password
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Promise}
   *
   * @memberof ClientUser
   */
  setPassword(oldPassword, newPassword) {
    return new Promise(resolve => {
      const data = {
        old_password: oldPassword,
        password: newPassword
      };
      this.client.api.changePassword(data).then(response => {
        resolve(response.success);
      });
    });
  }

  /**
   * Set a new email
   * @param {string} email
   * @returns {Promise}
   *
   * @memberof ClientUser
   */
  setEmail(email) {
    return new Promise(resolve => {
      const instance = this;

      this.client.api.emailPreferences('get').then(data => {
        const payload = new EmailEdit(data.user);
        payload.email_address = email;

        const json = JSON.stringify(payload);

        instance.client.api.emailPreferences('post', json).then(response => {
          resolve(response.success);
        });
      });
    });
  }

  /**
   * Set a new username
   * @param {string} username
   * @returns {Promise}
   *
   * @memberof ClientUser
   */
  setUsername(username) {
    return new Promise(resolve => {
      const instance = this;

      this.client.api.save('get').then(data => {
        const payload = new ProfileEdit(data.user);
        payload.username = username;

        const json = JSON.stringify(payload);

        instance.client.api.save('post', json).then(response => {
          resolve(response.success);
        });
      });
    });
  }

  /**
   * Set a new display name
   * @param {string} name
   * @returns {Promise}
   *
   * @memberof ClientUser
   */
  setNickname(name) {
    return new Promise(resolve => {
      const instance = this;

      this.client.api.save('get').then(data => {
        const payload = new ProfileEdit(data.user);
        payload.display_name = name;

        const json = JSON.stringify(payload);

        instance.client.api.save('post', json).then(response => {
          resolve(response.success);
        });
      });
    });
  }

  /**
   * Set a new profile bio
   * @param {string} content
   * @returns {Promise}
   *
   * @memberof ClientUser
   */
  setBio(content) {
    return new Promise(resolve => {
      const instance = this;

      this.client.api.save('get').then(data => {
        const payload = new ProfileEdit(data.user);
        payload.description_markdown = content;

        const json = JSON.stringify(payload);

        instance.client.api.save('post', json).then(response => {
          resolve(response.success);
        });
      });
    });
  }
}

module.exports = ClientUser;
