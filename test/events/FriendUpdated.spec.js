const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const FriendUpdatedHandler = require('../../src/client/primus/events/handlers/FriendUpdated');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');

describe('FriendUpdatedHandler ', () => {
  let client;
  let eventManager;
  let friendUpdatedEvent;

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
    friendUpdatedEvent = new FriendUpdatedHandler(eventManager);
    client.chat.friends = new UserCollection([
      {
        id: 15071,
        type: 'developer',
        status: 1,
        username: 'Bowenware_games',
        roomId: 1234,
        isOnline: true,
        lastMessageOn: 1507796789,
        displayName: 'Dr. Bowen',
        imgAvatar:
          'https://secure.gravatar.com/avatar/75152fb7da1d2361ae646de37a86a5b5',
        permissionLevel: 0,
        currentlyPlaying: []
      }
    ]);
  });

  describe('handle', () => {
    it('should call update on friends UserCollection', () => {
      const update = sinon.spy(client.chat.friends, 'update');

      friendUpdatedEvent.handle(payload);

      assert(update.calledOnce);
      assert(update.calledWith(payload.data.user));
    });

    it('should emit a friend-updated event with the updated and old user', () => {
      const emit = sinon.spy(client, 'emit');
      const oldUser = client.chat.friends.collection[0];

      friendUpdatedEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.FRIEND_UPDATED,
          new User(client, oldUser),
          new User(client, payload.data.user)
        )
      );
    });
  });
});
