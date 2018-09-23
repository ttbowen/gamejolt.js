const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const ChatConfig = require('../../src/util/ChatConfig').ChatConfig;
const Client = require('../../src/client/Client');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const Message = require('../../src/structures/chat/Message');
const MessageHandler = require('../../src/client/primus/events/handlers/Message');

describe('Message ', () => {
  let client;
  let eventManager;
  let messageEvent;

  const payload = {
    data: {
      message: {
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
      }
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    messageEvent = new MessageHandler(eventManager);
  });

  describe('handle', () => {
    it('should emit a message event with message object', () => {
      const emit = sinon.spy(client, 'emit');

      messageEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.MESSAGE,
          new Message(client, payload.data.message)
        )
      );
    });

    it('should add the message to messages collection on chat client', () => {
      const roomId = payload.data.message.roomId;
      client.chat.messages[roomId] = [];

      messageEvent.handle(payload);

      expect(client.chat.messages[roomId].length).to.equal(1);
      expect(client.chat.messages[roomId]).to.deep.include.members([
        new Message(client, payload.data.message)
      ]);
    });

    it('should add the message to messages collection on chat client', () => {
      const roomId = payload.data.message.roomId;
      client.chat.messages[roomId] = [];

      messageEvent.handle(payload);

      expect(client.chat.messages[roomId].length).to.equal(1);
      expect(client.chat.messages[roomId]).to.deep.include.members([
        new Message(client, payload.data.message)
      ]);
    });

    it('should remove the first message if max length has been exceeded', () => {
      const roomId = payload.data.message.roomId;
      const expectedId = 2;
      client.chat.messages[roomId] = [];

      for (let i = 0; i < ChatConfig.MAX_NUM_MESSAGES; i++) {
        client.chat.messages[roomId].push(
          new Message(client, payload.data.message)
        );
        client.chat.messages[roomId][i].id = i + 1;
      }

      messageEvent.handle(payload);

      expect(client.chat.messages[roomId][0].id).to.equal(expectedId);
      expect(client.chat.messages[roomId].length).to.equal(
        ChatConfig.MAX_NUM_MESSAGES
      );
    });
  });
});
