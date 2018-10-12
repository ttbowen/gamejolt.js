const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const UserCollection = require('../../src/structures/chat/UserCollection');
const UserMutedHandler = require('../../src/client/primus/events/handlers/UserMuted');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('UserMutedHandler', () => {
  let client;
  let eventManager;
  let userMutedEvent;

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
    userMutedEvent = new UserMutedHandler(eventManager);
    client.chat.joinedRooms[payload.data.roomId] = {};
    client.chat.joinedRooms[payload.data.roomId] = {
      type: 'open_group'
    };
    client.chat.usersOnline[payload.data.roomId] = new UserCollection({
      id: 1
    });
  });

  describe('handle', () => {
    it('should mute the user in the room list', () => {
      const mute = sinon.spy(
        client.chat.usersOnline[payload.data.roomId],
        'mute'
      );

      userMutedEvent.handle(payload);

      assert(mute.calledOnce);
      assert(mute.calledWith(payload.data.userId, payload.data.isGlobal));
    });

    it('should emit a user-muted event', () => {
      const emit = sinon.spy(client, 'emit');

      userMutedEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.USER_MUTED,
          payload.data.userId,
          payload.data.roomId,
          payload.data.isGlobal
        )
      );
    });
  });
});
