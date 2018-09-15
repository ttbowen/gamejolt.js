'use strict';

/**
 * Represents a Game Jolt game overview
 * @class Game
 */
class GameOverview {
  /**
   * Creates an instance of GameOverview.
   *
   * @param {Client} client Game Jolt client
   * @param {any} data The game overview data
   *
   * @constructor
   */
  constructor(client, data) {
    this.client = client;
    if (data) this.setup(data);
  }

  setup(data) {
    this.metaDescription = data.metaDescription;
    this.fb = data.fb;
    this.twitter = data.twitter;
    this.microdata = data.microdata;
    this.supporters = data.supporters;
    this.profileCount = data.profileCount;
    this.downloadCount = data.downloadCount;
    this.playCount = data.playCount;
    this.mediaItems = data.mediaItems;
    this.songs = data.songs;
    this.developerGamesCount = data.developerGamesCount;
    this.packages = data.packages;
    this.sellables = data.sellables;
    this.releases = data.releases;
    this.builds = data.builds;
    this.launchOptions = data.launchOptions;
    this.recommendedGames = data.recommendedGames;
    this.posts = data.posts;
  }
}

module.exports = GameOverview;
