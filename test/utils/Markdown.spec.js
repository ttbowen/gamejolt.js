const chai = require('chai');
const expect = chai.expect;

const markdown = require('../../src/util/Markdown');

describe('bold', () => {
  it('should return the input text with bold markdown', () => {
    const originalText = 'bold';
    expect(markdown.bold(originalText)).to.equal(`**${originalText}**`);
  });
});

describe('italic', () => {
  it('should return the input text with italic markdown', () => {
    const originalText = 'italic';
    expect(markdown.italic(originalText)).to.equal(`*${originalText}*`);
  });
});

describe('underline', () => {
  it('should return the input text with underline markdown', () => {
    const originalText = 'underline';
    expect(markdown.underline(originalText)).to.equal(`__${originalText}__`);
  });
});

describe('strikeout', () => {
  it('should return the input text with strikeout markdown', () => {
    const originalText = 'strikeout';
    expect(markdown.strikeout(originalText)).to.equal(`~~${originalText}~~`);
  });
});

describe('addMention', () => {
  it('should return the input username with mention', () => {
    const originalUsername = 'Bowenware_games';
    expect(markdown.addMention(originalUsername)).to.equal(
      `[@${originalUsername}](@${originalUsername})`
    );
  });
});
