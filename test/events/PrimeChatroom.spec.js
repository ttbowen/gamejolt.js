const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const PrimeChatroomHandler = require('../../src/client/primus/events/handlers/PrimeChatroom');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('PrimeChatroomHandler', () => {
  let client;
  let eventManager;
  let primeChatroomEvent;

  const payload = {
    data: {
      isSource: true,
      messages: [
        {
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
          content: '<p>Hello</p>',
          contentRaw: 'Hello',
          loggedOn: '2018-09-20T20:53:20.292Z',
          status: 'active'
        }
      ],
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
      users: [
        {
          id: 15071,
          type: 'developer',
          status: 1,
          username: 'Bowenware_games',
          displayName: 'Dr. Bowen',
          imgAvatar:
            'https://secure.gravatar.com/avatar/75152fb7da1d2361ae646de37a86a5b5',
          permissionLevel: 0,
          currentlyPlaying: []
        }
      ]
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    primeChatroomEvent = new PrimeChatroomHandler(eventManager);
  });

  describe('handle', () => {
    it('should emit a prime-chatroom event', () => {
      const emit = sinon.spy(client, 'emit');

      primeChatroomEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.PRIME_CHATROOM, payload.data));
    });
  });
});
