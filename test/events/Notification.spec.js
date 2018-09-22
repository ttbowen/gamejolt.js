const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const Message = require('../../src/structures/chat/Message');
const NotificationHandler = require('../../src/client/primus/events/handlers/Notification');

describe('Notification ', () => {
  let client;
  let eventManager;
  let notificationEvent;

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    notificationEvent = new NotificationHandler(eventManager);
  });

  describe('handle', () => {
    it('should emit a message event with message object if payload contains message', () => {
      const emit = sinon.spy(client, 'emit');
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

      notificationEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.MESSAGE,
          new Message(client, payload.data.message)
        )
      );
    });

    it('should emit a notification event if payload does not contain message', () => {
      const emit = sinon.spy(client, 'emit');
      const payload = {
        data: {}
      };

      notificationEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.NOTIFICATION, payload.data));
    });
  });
});
