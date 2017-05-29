'use strict';

const MediaItem = require('./MediaItem');
const Game = require('./Game');

/**
 * Represents a featured Game Jolt game
 * @class Game
 */
class FeaturedGame {
    
    /**
     * Creates an instance of Game.
     * 
     * @param {Client} client The Game Jolt client
     * @param {any} data The game data
     * 
     * @constructor
     */
    constructor(client, data) {
        this.client = client;
        if (data) this.setup(data);
    }

    setup(data) {
        this.content = data.content;
        this.game = new Game(this.client, data.game);
        this.headerMediaItem = new MediaItem(this.client, data.header_media_item);
        this.id = data.id;
        this.imgVersion = data.img_version;
        this.postedOn = new Date(data.posted_on);
    }
}

module.exports = FeaturedGame;