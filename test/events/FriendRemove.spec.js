const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const FriendRemoveHandler = require('../../src/client/primus/events/handlers/FriendRemove');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');

describe('FriendRemoveHandler', () => {
  let client;
  let eventManager;
  let friendRemoveEvent;

  beforeEach(() => {
    client = new Client();
    client.primus.leaveRoom = sinon.stub();
    eventManager = new EventManager(client);
    friendRemoveEvent = new FriendRemoveHandler(eventManager);
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
    it('should call remove on friends UserCollection', () => {
      const remove = sinon.spy(client.chat.friends, 'remove');
      const payload = {
        data: {
          userId: 1234
        }
      };

      friendRemoveEvent.handle(payload);

      assert(remove.calledOnce);
      assert(remove.calledWith(payload.data.userId));
    });

    it('should emit friend-remove with user id and object', () => {
      const emit = sinon.spy(client, 'emit');
      const user = client.chat.friends.collection[0];
      const payload = {
        data: {
          userId: 1234
        }
      };

      friendRemoveEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.FRIEND_REMOVE,
          payload.data.userId,
          new User(client, user)
        )
      );
    });

    it('should call leave on chat client', () => {
      const remove = sinon.spy(client.chat.friends, 'remove');
      const payload = {
        data: {
          userId: 1234
        }
      };

      friendRemoveEvent.handle(payload);

      assert(client.chat.leaveRoom.calledOnce);
      assert(remove.calledWith(payload.data.userId));
    });

    it('should emit a friend-remove event with user id', () => {
      const emit = sinon.spy(client, 'emit');
      const payload = {
        data: {
          userId: 1
        }
      };

      friendRemoveEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.FRIEND_REMOVE, payload.data.userId));
    });
  });
});
