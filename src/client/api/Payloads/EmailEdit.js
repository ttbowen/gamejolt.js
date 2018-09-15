'use strict';

class EmailEdit {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.username = data.username;
    this.name = data.name;
    this.display_name = data.display_name;
    this.web_site = data.web_site;
    this.url = data.url;
    this.slug = data.slug;
    this.img_avatar = data.img_avatar;
    this.dogtag = data.dogtag;
    this.status = data.status;
    this.permission_level = data.permission_level;
    this.created_on = data.created_on;
    this.last_logged_on = data.last_logged_on;
    this.notify_frequency = data.notify_frequency;
    this.notify_shouts = data.notify_shouts;
    this.notify_comments = data.notify_comments;
    this.notify_ratings = data.notify_ratings;
    this.notify_user_uploads = data.notify_user_uploads;
    this.notify_private_messages = data.notify_private_messages;
    this.notify_comment_replies = data.notify_comment_replies;
    this.notify_game_follows = data.game_follows;
    this.notify_friendships = data.notify_friendships;
    this.notify_forum_posts = data.notify_forum_posts;
    this.notify_followed_game_updates = data.notify_followed_game_updates;
    this.notify_sales = data.notify_sales;
    this.email_address = data.email_address;
    this.newsletter = data.newsletter;
    this.is_gamer = data.is_gamer;
    this.is_developer = data.is_developer;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      username: this.username,
      name: this.name,
      display_name: this.display_name,
      web_site: this.web_site,
      url: this.url,
      slug: this.slug,
      img_avatar: this.img_avatar,
      dogtag: this.dogtag,
      status: this.status,
      permission_level: this.permission_level,
      created_on: this.created_on,
      last_logged_on: this.last_logged_on,
      notify_frequency: this.notify_frequency,
      notify_shouts: this.notify_shouts,
      notify_comments: this.notify_comments,
      notify_ratings: this.notify_ratings,
      notify_user_uploads: this.notify_user_uploads,
      notify_private_messages: this.notify_private_messages,
      notify_comment_replies: this.notify_comment_replies,
      notify_game_follows: this.notify_game_follows,
      notify_friendships: this.notify_friendships,
      notify_forum_posts: this.notify_forum_posts,
      notify_followed_game_updates: this.notify_followed_game_updates,
      notify_sales: this.notify_sales,
      email_address: this.email_address,
      newsletter: this.newsletter,
      is_gamer: this.is_gamer,
      is_developer: this.is_developer
    };
  }
}

module.exports = EmailEdit;
