const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const YouLeaveRoomHandler = require('../../src/client/primus/events/handlers/YouLeaveRoom');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('YouLeaveRoomHandler', () => {
  let client;
  let eventManager;
  let youLeaveRoomEvent;

  const payload = {
    data: {
      roomId: 2
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    youLeaveRoomEvent = new YouLeaveRoomHandler(eventManager);
    client.chat.joinedRooms[payload.data.roomId] = {};
  });

  describe('handle', () => {
    it('should emit a you-leave-room event', () => {
      const emit = sinon.spy(client, 'emit');

      youLeaveRoomEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.YOU_LEAVE_ROOM, payload.data));
    });
  });
});
