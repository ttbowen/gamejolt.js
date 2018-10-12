const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const User = require('../../src/structures/chat/User');
const UserCollection = require('../../src/structures/chat/UserCollection');
const UserEnterHandler = require('../../src/client/primus/events/handlers/UserEnterRoom');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('UserEnterHandler', () => {
  let client;
  let eventManager;
  let userEnterRoomEvent;

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
    userEnterRoomEvent = new UserEnterHandler(eventManager);
    client.chat.joinedRooms[payload.data.roomId] = {};
  });

  describe('handle', () => {
    it('should add the user to the room list', () => {
      const roomId = 2;
      client.chat.joinedRooms[roomId] = {
        type: 'open_group'
      };
      client.chat.usersOnline[roomId] = new UserCollection({ id: 15071 });
      const add = sinon.spy(client.chat.usersOnline[roomId], 'add');

      userEnterRoomEvent.handle(payload);

      assert(add.calledOnce);
      assert(add.calledWith(payload.data.user));
    });

    it('should emit a user-enter-room event', () => {
      const emit = sinon.spy(client, 'emit');

      userEnterRoomEvent.handle(payload);

      assert(emit.calledOnce);
      assert(
        emit.calledWith(
          Events.USER_ENTER_ROOM,
          payload.data.roomId,
          new User(client, payload.data.user)
        )
      );
    });
  });
});
