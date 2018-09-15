'use strict';

/**
 * Ratelimits client messages.
 * Implements leaky bucket algorithm.
 * @class RateLimiter
 */
class RateLimiter {
  /**
   * Creates an instance of RateLimiter.
   * @param {number} requestsNum Number of requests
   * @param {number} timestamp Timestamp
   * @constructor
   */
  constructor(requestsNum, timestamp) {
    this.requestCount = requestsNum;
    this.timestamp = timestamp;
    this.seconds = 0;
  }

  /**
   * Throttle messages.
   * @returns {boolean} returns true if throttled.
   * @memberof RateLimiter
   */
  throttle() {
    let sn = this.seconds;
    let now = ~~(Date.now() / 1000);

    if (!sn) {
      sn = now + this.timestamp / this.requestCount;
    } else {
      sn += this.timestamp / this.requestCount;
    }
    if (sn < now) {
      sn = now + this.timestamp / this.requestCount;
    } else if (sn > now + this.timestamp) {
      return true;
    }
    this.seconds = sn;
    return false;
  }
}

module.exports = RateLimiter;
