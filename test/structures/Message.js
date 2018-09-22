const chai = require('chai');
const path = require('path');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const Client = require('../../src/client/Client');
const ClientUser = require('../../src/structures/site/ClientUser');
const loadFixtures = require('../helpers/loadFixtures');
const Message = require('../../src/structures/chat/Message');
const Markdown = require('../../src/util/Markdown');

describe('Message', () => {
  let client;
  let fixtures;

  const data = {
    id: 1234,
    userId: 15071,
    user: {
      id: 15071,
      type: 'developer',
      status: 1,
      username: 'Bowenware_games',
      displayName: 'Dr. Bowen',
      imgAvatar:
        'https://secure.gravatar.com/avatar/75152fb7da1d2361ae646de37a86a5b5',
      permissionLevel: 0,
      currentlyPlaying: []
    },
    roomId: 2,
    room: {
      id: 2,
      type: 'open_group',
      title: 'lobby',
      description_markdown:
        "General chit-chat. Have fun, don't spam, and don't advertise that much.",
      description_compiled:
        "<p>General chit-chat. Have fun, don't spam, and don't advertise that much.</p>",
      lastMessageOn: 1537216980000,
      staff: [{ userId: 7758, permission: 'moderator' }],
      status: 'active'
    },
    content: '<p>Hello</p>',
    contentRaw: 'Hello',
    loggedOn: '2018-09-20T20:53:20.292Z',
    status: 'active'
  };

  before(() => {
    fixtures = loadFixtures(path.join(__dirname, '../fixtures'), 'utf8');
  });

  beforeEach(() => {
    client = new Client();
  });

  it('should set all properties if data is present', () => {
    const message = new Message(client, data);

    expect(message).to.include({
      id: data.id,
      roomId: data.roomId,
      content: data.content,
      contentRaw: data.contentRaw,
      loggedOn: data.loggedOn,
      status: data.status,
      userId: data.userId
    });
  });

  describe('reply', () => {
    it('should call sendMessage on chat client if message has not been replied to', () => {
      const content = 'Hello world';
      const author = Markdown.addMention(data.user.username);
      const message = new Message(client, data);
      const siteUser = JSON.parse(fixtures.siteUser);
      const stub = sinon.stub(client.chat, 'sendMessage');
      siteUser.id = 1234;
      client.chat.me = new ClientUser(client, siteUser);

      message.reply(content);

      assert(stub.calledOnce);
      assert(stub.calledWith(`${author} ${content}`, message.roomId));
    });

    it('should not add a mention if room type is pm', () => {
      const content = 'Hello world';
      const message = new Message(client, data);
      message.room.type = 'pm';
      const siteUser = JSON.parse(fixtures.siteUser);
      siteUser.id = 1234;
      const stub = sinon.stub(client.chat, 'sendMessage');
      client.chat.me = new ClientUser(client, siteUser);

      message.reply(content);

      assert(stub.calledOnce);
      assert(stub.calledWith(content, message.roomId));
    });

    it('should not reply if message was sent by client user', () => {
      const message = new Message(client, data);
      const siteUser = JSON.parse(fixtures.siteUser);
      const stub = sinon.stub(client.chat, 'sendMessage');
      client.chat.me = new ClientUser(client, siteUser);

      message.reply('Hello world');

      assert(stub.notCalled);
    });
  });

  describe('isMentioned', () => {
    it('should return true if the message contains the client user', () => {
      const message = new Message(client, data);
      const siteUser = JSON.parse(fixtures.siteUser);
      client.chat.me = new ClientUser(client, siteUser);

      message.contentRaw = `@${client.chat.me.username} Hello there`;

      expect(message.isMentioned).to.be.true;
    });

    it('should return false if the message does not contain the client user', () => {
      const message = new Message(client, data);
      const siteUser = JSON.parse(fixtures.siteUser);
      client.chat.me = new ClientUser(client, siteUser);

      expect(message.isMentioned).to.be.false;
    });
  });

  describe('toString', () => {
    it('should return contentRaw', () => {
      const message = new Message(client, data);
      expect(message.toString()).to.equal(message.contentRaw);
    });
  });
});
