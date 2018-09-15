'use strict';

class Handler {
  constructor(eventManager) {
    this.eventManager = eventManager;
  }

  handle(payload) {
    return payload;
  }
}

module.exports = Handler;
