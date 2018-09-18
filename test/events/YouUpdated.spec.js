const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const Client = require('../../src/client/Client');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const User = require('../../src/structures/chat/User');
const YouUpdatedHandler = require('../../src/client/primus/events/handlers/YouUpdated');

describe('YouUpdatedHandler', () => {
  let client;
  let eventManager;
  let youUpdatedEvent;

  const payload = {
    data: {
      user: {
        id: 15071,
        type: 'developer',
        status: 1,
        username: 'updated_username',
        displayName: 'Dr. Bowen',
        imgAvatar:
          'https://secure.gravatar.com/avatar/75152fb7da1d2361ae646de37a86a5b5',
        permissionLevel: 0,
        currentlyPlaying: []
      }
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    youUpdatedEvent = new YouUpdatedHandler(eventManager);
  });

  describe('handle', () => {
    it('should update the client user', () => {
      youUpdatedEvent.handle(payload);

      expect(client.chat.me).to.deep.include(
        new User(client, payload.data.user)
      );
    });

    it('should emit a you-updated event with updated and old user', () => {
      const emit = sinon.spy(client, 'emit');
      const currentUser = {
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
      client.chat.me = currentUser;

      youUpdatedEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.YOU_UPDATED,
          new User(client, currentUser),
          new User(client, payload.data.user)
        )
      );
    });
  });
});
