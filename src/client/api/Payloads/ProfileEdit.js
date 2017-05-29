'use strict';

class ProfileEdit {
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
        this.level = data.level;
        this.experience = data.experience;
        this.experience_next = data.experience_next;
        this.level_next_percentage = data.level_next_percentage;
        this.is_gamer = data.is_gamer;
        this.is_developer = data.is_developer;
        this.description_compiled = data.description_compiled;
        this.description_markdown = data.description_markdown;
        this.has_compiled_description = data.has_compiled_description;
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
            level: this.level,
            experience: this.experience,
            experience_next: this.experience_next,
            level_next_percentage: this.level_next_percentage,
            is_gamer: this.is_gamer,
            is_developer: this.is_developer,
            description_compiled: this.description_compiled,
            description_markdown: this.description_markdown,
            has_compiled_description: this.has_compiled_description
        }
    }
}

module.exports = ProfileEdit;