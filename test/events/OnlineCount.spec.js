const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const Client = require('../../src/client/Client');
const OnlineCountHandler = require('../../src/client/primus/events/handlers/OnlineCount');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('OnlineCountHandler', () => {
  let client;
  let eventManager;
  let onlineCountEvent;

  const payload = {
    data: {
      onlineCount: 3000
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    onlineCountEvent = new OnlineCountHandler(eventManager);
  });

  describe('handle', () => {
    it('should set the user count', () => {
      onlineCountEvent.handle(payload);
      expect(client.chat.userCount).to.equal(payload.data.onlineCount);
    });

    it('should emit a online count event', () => {
      const emit = sinon.spy(client, 'emit');

      onlineCountEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.ONLINE_COUNT, client.chat.userCount));
    });
  });
});
