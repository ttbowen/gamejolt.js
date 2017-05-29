const path = require('path');

module.exports = {
    Client: require('./client/Client'),
    Message: require('./structures/chat/Message'),
    Room: require('./structures/chat/Room'),
    User: require('./structures/chat/User'),
    ClientUser: require('./structures/site/ClientUser'),
    Compatibility: require('./structures/site/Compatibility'),
    GameOverview: require('./structures/site/GameOverview'),
    UserCollection: require('./structures/chat/UserCollection'),
    FriendRequest: require('./structures/site/FriendRequest'),
    FeaturedGame: require('./structures/site/FeaturedGame'),
    Game: require('./structures/site/Game'),
    SiteUser: require('./structures/site/SiteUser'),
    UserFriendship: require('./structures/site/UserFriendship'),
    Notification: require('./structures/site/Notification'),
    MediaItem: require('./structures/site/MediaItem'),
    UserFriendship: require('./structures/site/UserFriendship'),
    ChatConfig: require('./util/ChatConfig').ChatConfig,
    Endpoints: require('./util/Endpoints').Endpoints,
    Markdown: require('./util/Markdown'),
    Events: require('./util/Events').Events,
    PublicRooms: require('./util/PublicRooms').PublicRooms,
    version: require(path.join(__dirname, '..', 'package')).version
};