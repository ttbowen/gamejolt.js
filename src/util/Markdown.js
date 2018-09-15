/**
 * Return bold markdown text
 * @param {string} text
 * @returns {string}
 */
function bold(text) {
  return `**${text}**`;
}

/**
 * Return underlined markdown text
 * @param {string} text
 * @returns {string}
 */
function underline(text) {
  return `__${text}__`;
}

/**
 * Return italic markdown text
 * @param {string} text
 * @returns {string}
 */
function italic(text) {
  return `*${text}*`;
}

/**
 *
 * Returns strikedout markdown text
 * @param {string} text
 * @returns {string}
 */
function strikeout(text) {
  return `~~${text}~~`;
}

/**
 * Add a @username mention
 * @param {string} username
 * @returns {string}
 */
function addMention(username) {
  return `[@${username}](@${username})`;
}

module.exports = { bold, underline, italic, strikeout, addMention };
