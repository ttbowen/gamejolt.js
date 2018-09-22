const chai = require('chai');
const expect = chai.expect;

const Client = require('../../src/client/Client');
const User = require('../../src/structures/chat/User');

describe('User', () => {
  let client;

  const data = {
    id: 15071,
    type: 'developer',
    status: 1,
    username: 'Bowenware_games',
    displayName: 'Dr. Bowen',
    imgAvatar:
      'https://secure.gravatar.com/avatar/75152fb7da1d2361ae646de37a86a5b5',
    permissionLevel: 0,
    currentlyPlaying: []
  };

  beforeEach(() => {
    client = new Client();
  });

  it('should set all properties if data is present', () => {
    const user = new User(client, data);

    expect(user).to.include({
      id: data.id,
      type: data.type,
      status: data.status,
      username: data.username,
      imgAvatar: data.imgAvatar,
      permissionLevel: data.permissionLevel,
      currentlyPlaying: data.currentlyPlaying
    });
  });
});
