const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const FriendOfflineHandler = require('../../src/client/primus/events/handlers/FriendOffline');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');

describe('FriendOfflineHandler', () => {
  let client;
  let eventManager;
  let friendOfflineEvent;

  const payload = {
    data: {
      userId: 1234
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    friendOfflineEvent = new FriendOfflineHandler(eventManager);
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
    it('should call offline on friends UserCollection', () => {
      const offline = sinon.spy(client.chat.friends, 'offline');

      friendOfflineEvent.handle(payload);

      assert(offline.calledOnce);
      assert(offline.calledWith(payload.data.userId));
    });

    it('should emit a friend-offline event with user object', () => {
      const emit = sinon.spy(client, 'emit');
      const user = client.chat.friends.collection[0];

      friendOfflineEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.FRIEND_OFFLINE,
          payload.data.userId,
          new User(client, user)
        )
      );
    });
  });
});
