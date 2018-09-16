'use strict';

const Client = require('../../client/Client'); // eslint-disable-line no-unused-vars
const SiteUser = require('./SiteUser');
const ProfileEdit = require('../../client/api/Payloads/ProfileEdit');
const EmailEdit = require('../../client/api/Payloads/EmailEdit');

/**
 * Represents the Client user.
 * @class ClientUser
 * @extends {SiteUser}
 */
class ClientUser extends SiteUser {
  /**
   * Creates an instance of ClientUser.
   * @param {Client} client The client instance.
   * @param {*} data The client user payload.s
   * @memberof ClientUser
   */
  constructor(client, data) {
    super(client, data);
  }

  /**
   * Set a new password.
   * @param {string} oldPassword The old user password.
   * @param {string} newPassword The new user password.
   * @returns {Promise}
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
   * Set a new email address.
   * @param {string} email The email address to set.
   * @returns {Promise}
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
   * Set a new username.
   * @param {string} username The username to set.
   * @returns {Promise}
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
   * Set a new display name.
   * @param {string} name The display name to set.
   * @returns {Promise}
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
   * Set a new profile bio.
   * @param {string} content The content of the bio.
   * @returns {Promise}
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
