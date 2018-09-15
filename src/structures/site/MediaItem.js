'use strict';

const Client = require('../../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a MediaItem Object.
 * @class MediaItem
 */
class MediaItem {
  /**
   * Creates an instance of MediaItem.
   * @param {Client} client The client instance.
   * @param {*} data The mediaItem payload.
   * @constructor
   */
  constructor(client, data) {
    this.client = client;
    if (data) this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.type = data.type;
    this.parentId = data.parent_id;
    this.hash = data.hash;
    this.filename = data.filename;
    this.filetype = data.filetype;
    this.isAnimated = data.is_animated;
    this.width = data.width;
    this.height = data.height;
    this.filesize = data.filesize;
    this.cropStartX = data.crop_start_x;
    this.cropStartY = data.crop_start_y;
    this.cropEndX = data.crop_end_x;
    this.cropEndY = data.crop_end_y;
    this.addedOn = new Date(data.added_on);
    this.status = data.status;
    this.imgUrl = data.img_url;
    this.mediaServerUrl = data.mediaserver_url;
    this.mediaServerUrlWebm = data.mediaserver_url_webm;
    this.mediaServerUrlmp4 = data.mediaserver_url_mp4;
  }
}

module.exports = MediaItem;
