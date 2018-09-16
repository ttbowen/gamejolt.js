const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const Client = require('../../src/client/Client');
const ClearNotificationsHandler = require('../../src/client/primus/events/handlers/ClearNotifications');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('ClearNotificationsHandler', () => {
  let client;
  let eventManager;
  let clearNotificationsEvent;

  const payload = {
    data: {}
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    clearNotificationsEvent = new ClearNotificationsHandler(eventManager);
  });

  describe('handle', () => {
    it('should emit a clear-notifications event', () => {
      const emit = sinon.spy(client, 'emit');

      clearNotificationsEvent.handle(payload);

      expect(emit.calledOnce);
      expect(emit.calledWith(Events.CLEAR_NOTIFICATIONS, client.chat.user));
    });
  });
});
