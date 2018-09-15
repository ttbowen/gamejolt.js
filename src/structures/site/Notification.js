'use strict';

const Client = require('../../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a site notification.
 * @class Notification
 */
class Notification {
  /**
   * Creates an instance of Notification.
   * @param {Client} client The client instance.
   * @param {*} data The notification payload.
   * @constructor
   */
  constructor(client, data) {
    this.client = client;
    if (data) this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.scroll_id = new Date(data.scroll_id);
    this.user_id = data.user_id;
    this.viewed_on = new Date(data.viewed_on);
    this.type = data.type;
    this.added_on = new Date(data.added_on);
    this.from_resource = data.from_resource;
    this.from_resource_id = data.from_resource_id;
    this.from_resource_model = data.from_resource_model;
    this.action_resource = data.action_resource;
    this.action_resource_id = data.action_resource_id;
    this.action_resource_model = data.action_resource_model;
    this.to_resource = data.to_resource;
    this.to_resource_id = data.to_resource_id;
    this.to_resource_model = data.to_resource_model;
  }
}

module.exports = Notification;
