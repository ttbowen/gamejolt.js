const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const UserCollection = require('../../src/structures/chat/UserCollection');
const RoleSetHandler = require('../../src/client/primus/events/handlers/RoleSet');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('RoleSetHandler', () => {
  let client;
  let eventManager;
  let roleSetEvent;

  const payload = {
    data: {
      userId: 15071,
      roomId: 2,
      action: 'mod'
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    roleSetEvent = new RoleSetHandler(eventManager);
  });

  describe('handle', () => {
    it('should mod the room user when event is a mod action', () => {
      const roomId = 2;
      const userId = 15071;
      client.chat.joinedRooms[roomId] = {
        type: 'open_group'
      };
      client.chat.usersOnline[roomId] = new UserCollection({ id: userId });
      const mod = sinon.spy(client.chat.usersOnline[roomId], 'mod');

      roleSetEvent.handle(payload);

      assert(mod.calledOnce);
      assert(mod.calledWith(userId));
    });

    it('should demod the room user when event is a demod action', () => {
      const roomId = 2;
      const userId = 15071;
      payload.data.action = 'demod';
      client.chat.joinedRooms[roomId] = {
        type: 'open_group'
      };
      client.chat.usersOnline[roomId] = new UserCollection({ id: userId });
      const demod = sinon.spy(client.chat.usersOnline[roomId], 'demod');

      roleSetEvent.handle(payload);

      assert(demod.calledOnce);
      assert(demod.calledWith(userId));
    });

    it('should emit a role-set event', () => {
      const emit = sinon.spy(client, 'emit');

      roleSetEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.ROLE_SET, payload.data));
    });
  });
});
