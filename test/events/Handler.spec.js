const chai = require('chai');
const expect = chai.expect;

const Client = require('../../src/client/Client');
const Handler = require('../../src/client/primus/events/handlers/Handler');
const EventManager = require('../../src/client/primus/events/EventManager');

describe('Handler', () => {
  let client;
  let eventManager;
  let handler;

  const payload = {
    data: {}
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    handler = new Handler(eventManager);
  });

  describe('handle', () => {
    it('should return the passed payload', () => {
      const result = handler.handle(payload);
      expect(result).to.equal(payload);
    });
  });
});
