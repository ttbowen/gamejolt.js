/**
 *
 * Site API endpoints are defined here
 */
exports.Endpoints = {
  login: `/web/auth/login`,
  logout: `/web/dash/account/logout`,
  discover: `/web/discover`,
  games: `/web/discover/games`,
  game: id => `/web/discover/games/${id}`,
  game_overview: id => `/web/discover/games/overview/${id}`,
  scores: id => `/web/discover/web/games/scores/overview/${id}`,
  trophies: id => `/web/discover/web/games/trophies/overview/${id}`,
  comments: id => `/comments/Game/${id}`,
  channels: channel => `/web/discover/channels/${channel}`,
  channels_overview: channel => `/web/discover/channels/overview/${channel}`,
  channels_games: channel => `/web/discover/channels/games/overview/${channel}`,
  channels_devlogs: channel =>
    `/web/discover/channels/devlogs/overview/${channel}`,
  profile: user => `/web/profile/${user}`,
  profile_overview: user => `/web/profile/overview/${user}`,
  dash: `/web/dash`,
  save: `/web/dash/profile/save`,
  email_prefs: `/web/dash/email-preferences`,
  set_password: `/web/dash/account/set-password`,
  activity: `/web/dash/activity/activity`,
  count: `/web/dash/activity/count`,
  notifications: `/web/dash/activity/notifications`,
  requests: `/web/dash/friends/requests`,
  requestCount: `/web/dash/friends/requests/count`,
  friend_add: id => `/web/dash/friends/requests/add/${id}`,
  friend_remove: id => `/web/dash/friends/requests/remove/${id}`,
  friend_accept: id => `/web/dash/friends/requests/accept/${id}`
};
