const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const FriendAddHandler = require('../../src/client/primus/events/handlers/FriendAdd');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');

describe('FriendAddHandler', () => {
  let client;
  let eventManager;
  let friendAddEvent;

  const payload = {
    data: {
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
    friendAddEvent = new FriendAddHandler(eventManager);
    client.chat.friends = new UserCollection([
      {
        id: 1234,
        type: 'developer',
        status: 1,
        username: 'some_guy',
        roomId: 1234,
        isOnline: true,
        lastMessageOn: 1507796789,
        displayName: 'Some Guy',
        imgAvatar: 'https://secure.gravatar.com/avatar',
        permissionLevel: 0,
        currentlyPlaying: []
      }
    ]);
  });

  describe('handle', () => {
    it('should call add on friends UserCollection', () => {
      const add = sinon.spy(client.chat.friends, 'add');

      friendAddEvent.handle(payload);

      assert(add.calledOnce);
      assert(add.calledWith(payload.data.user));
    });

    it('should emit a friend-add event', () => {
      const emit = sinon.spy(client, 'emit');

      friendAddEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(Events.FRIEND_ADD, new User(client, payload.data.user))
      );
    });
  });
});
