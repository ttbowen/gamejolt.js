const fs = require('fs');
const path = require('path');

/**
 * Helper function to load all fixtures from target directory.
 * @param {string} fixturesPath The fixture's file path.
 * @param {string} encoding The encoding for the loaded results.
 */
function loadFixtures(fixturesPath, encoding) {
  const files = fs.readdirSync(fixturesPath);
  const fixtures = {};

  for (const file of files) {
    const fixtureExt = path.extname(file);
    const fixtureName = path.basename(file, fixtureExt);
    const fixturePath = path.join(fixturesPath, file);

    fixtures[fixtureName] = fs.readFileSync(fixturePath, encoding);
  }

  return fixtures;
}

module.exports = loadFixtures;
