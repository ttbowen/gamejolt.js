const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const Client = require('../../src/client/Client');
const FriendsListHandler = require('../../src/client/primus/events/handlers/FriendsList');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');
const UserCollection = require('../../src/structures/chat/UserCollection');

describe('FriendsListHandler', () => {
  let client;
  let eventManager;
  let friendsListEvent;

  const payload = {
    data: {
      friendsList: [
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
      ]
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    friendsListEvent = new FriendsListHandler(eventManager);
  });

  describe('handle', () => {
    it('should populate friends collection', () => {
      friendsListEvent.handle(payload);

      expect(client.chat.friends.collection).to.deep.include.members(
        payload.data.friendsList
      );
    });

    it('should emit a friends-list event', () => {
      const emit = sinon.spy(client, 'emit');

      friendsListEvent.handle(payload);

      expect(emit.calledOnce);
      expect(
        emit.calledWith(
          Events.FRIENDS_LIST,
          new UserCollection(payload.data.friendsList)
        )
      );
    });
  });
});
