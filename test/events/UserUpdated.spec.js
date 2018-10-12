const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const cloneObject = require('../../src/util/CloneObject');
const Client = require('../../src/client/Client');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');
const UserUpdatedHandler = require('../../src/client/primus/events/handlers/UserUpdated');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('UserUpdatedHandler', () => {
  let client;
  let eventManager;
  let userUpdatedEvent;

  const payload = {
    data: {
      roomId: 2,
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
      }
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    userUpdatedEvent = new UserUpdatedHandler(eventManager);
    client.chat.joinedRooms[payload.data.roomId] = {};
    client.chat.joinedRooms[payload.data.roomId] = {
      type: 'open_group'
    };
    client.chat.usersOnline[payload.data.roomId] = new UserCollection([
      payload.data.user
    ]);
  });

  describe('handle', () => {
    it('should update the user in the room list', () => {
      const update = sinon.spy(
        client.chat.usersOnline[payload.data.roomId],
        'update'
      );

      userUpdatedEvent.handle(payload);

      assert(update.calledOnce);
      assert(update.calledWith(payload.data.user));
    });

    it('should emit a user-updated event', () => {
      const emit = sinon.spy(client, 'emit');
      const clonedUser = cloneObject(
        client.chat.usersOnline[payload.data.roomId].get(payload.data.user.id)
      );

      userUpdatedEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.USER_UPDATED,
          new User(client, payload.data.user),
          new User(client, clonedUser)
        )
      );
    });
  });
});
