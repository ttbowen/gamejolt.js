const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const UserCollection = require('../../src/structures/chat/UserCollection');
const UserLeaveHandler = require('../../src/client/primus/events/handlers/UserLeaveRoom');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('UserLeaveHandler', () => {
  let client;
  let eventManager;
  let userLeaveRoomEvent;

  const payload = {
    data: {
      roomId: 2,
      userId: 15071
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    userLeaveRoomEvent = new UserLeaveHandler(eventManager);
    client.chat.joinedRooms[payload.data.roomId] = {};
    client.chat.joinedRooms[payload.data.roomId] = {
      type: 'open_group'
    };
    client.chat.usersOnline[payload.data.roomId] = new UserCollection({
      id: 1
    });
  });

  describe('handle', () => {
    it('should remove the user from the room list', () => {
      const remove = sinon.spy(
        client.chat.usersOnline[payload.data.roomId],
        'remove'
      );

      userLeaveRoomEvent.handle(payload);

      assert(remove.calledOnce);
      assert(remove.calledWith(payload.data.userId));
    });

    it('should emit a user-leave-room event', () => {
      const emit = sinon.spy(client, 'emit');

      userLeaveRoomEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.USER_LEAVE_ROOM,
          payload.data.userId,
          payload.data.roomId
        )
      );
    });
  });
});
