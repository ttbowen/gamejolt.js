'use strict';

const Compatibility = require('./Compatibility');
const Developer = require('./SiteUser');
const MediaItem = require('./MediaItem');
const rating = require('../../util/TigrsRatings').tigrs;

/**
 * Represents a Game Jolt game
 * @class Game
 */
class Game {
    
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
        this.id = data.id;
        this.title = data.title;
        this.avgRating = data.avg_rating;
        this.category = data.category;
        this.categoryHuman = data.category_human;
        this.creationTool = data.creation_tool;
        this.creationToolHuman = data.creation_tool_human;
        this.descriptionMarkdown = data.description_markdown;
        this.descriptionCompiled = data.description_compiled;
        this.developer = new Developer(this.client, data.developer);
        this.creationTool = data.creation_tool_human;
        this.viewCount = data.view_count;
        this.playCount = data.play_count;
        this.downloadCount = data.download_count;
        this.postedOn = new Date(data.posted_on);
        this.publishedOn = new Date(data.published_on);
        this.status = data.status;
        this.compatibility = new Compatibility(this.client, data.compatibility);
        this.tigrsAge = rating[data.tigrs_age - 1];
        this.ratingCount = data.rating_count;
        this.slug = data.slug;
        this.followerCount = data.follower_count;
        this.trophiesCount = data.trophiesCount;
        this.hasScores = data.hasScores;
        this.imgThumbnailWebm = data.img_thumbnail_webm;
        this.imgThumbnailMp4 = data.img_thumbnail_mp4;
        this.headerMediaItem = new MediaItem(this.client, data.header_media_item);
        this.thumbnailMediaItem = new MediaItem(this.client, data.thumbnail_media_item);
    }

    toString() {
        return this.title;
    }
}

module.exports = Game;