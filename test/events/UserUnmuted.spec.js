const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const UserCollection = require('../../src/structures/chat/UserCollection');
const UserUnmutedHandler = require('../../src/client/primus/events/handlers/UserUnmuted');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('UserUnmutedHandler', () => {
  let client;
  let eventManager;
  let userUnmutedEvent;

  const payload = {
    data: {
      roomId: 2,
      userId: 15071,
      isGlobal: true
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    userUnmutedEvent = new UserUnmutedHandler(eventManager);
    client.chat.joinedRooms[payload.data.roomId] = {};
    client.chat.joinedRooms[payload.data.roomId] = {
      type: 'open_group'
    };
    client.chat.usersOnline[payload.data.roomId] = new UserCollection({
      id: 1
    });
  });

  describe('handle', () => {
    it('should unmute the user in the room list', () => {
      const unmute = sinon.spy(
        client.chat.usersOnline[payload.data.roomId],
        'unmute'
      );

      userUnmutedEvent.handle(payload);

      assert(unmute.calledOnce);
      assert(unmute.calledWith(payload.data.userId, payload.data.isGlobal));
    });

    it('should emit a user-unmuted event', () => {
      const emit = sinon.spy(client, 'emit');

      userUnmutedEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.USER_UNMUTED,
          payload.data.userId,
          payload.data.roomId,
          payload.data.isGlobal
        )
      );
    });
  });
});
