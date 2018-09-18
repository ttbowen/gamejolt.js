const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const MessageClearedHandler = require('../../src/client/primus/events/handlers/MessageCleared');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('MessageClearedHandler', () => {
  let client;
  let eventManager;
  let messageClearedEvent;

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    messageClearedEvent = new MessageClearedHandler(eventManager);
  });

  describe('handle', () => {
    it('should emit a message-cleared event', () => {
      const emit = sinon.spy(client, 'emit');
      const payload = { data: {} };

      messageClearedEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.MESSAGE_CLEARED, payload.data));
    });
  });
});
