const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const FriendOnlineHandler = require('../../src/client/primus/events/handlers/FriendOnline');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');

describe('FriendOnlineHandler', () => {
  let client;
  let eventManager;
  let friendOnlineEvent;

  const payload = {
    data: {
      user: {
        id: 1234,
        type: 'developer',
        status: 1,
        username: 'some_guy',
        displayName: 'Some Guy',
        imgAvatar: 'https://secure.gravatar.com/avatar',
        permissionLevel: 0,
        currentlyPlaying: []
      }
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    friendOnlineEvent = new FriendOnlineHandler(eventManager);
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
    it('should call online on friends UserCollection', () => {
      const online = sinon.spy(client.chat.friends, 'online');

      friendOnlineEvent.handle(payload);

      assert(online.calledOnce);
      assert(online.calledWith(payload.data.user));
    });

    it('should emit a friend-online event', () => {
      const emit = sinon.spy(client, 'emit');
      const user = client.chat.friends.collection[0];

      friendOnlineEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.FRIEND_ONLINE, new User(client, user)));
    });
  });
});
