const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const Client = require('../../src/client/Client');
const ConnectedHandler = require('../../src/client/primus/events/handlers/Connected');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('ConnectedHandler', () => {
  let client;
  let eventManager;
  let connectedEvent;

  const payload = {
    data: {
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
    connectedEvent = new ConnectedHandler(eventManager);
  });

  describe('handle', () => {
    it('should set isConnected status on chat client to true', () => {
      connectedEvent.handle(payload);
      expect(client.chat.isConnected).to.be.true;
    });

    it('should set the returned connected user', () => {
      connectedEvent.handle(payload);
      expect(client.chat.me).to.not.be.null;
      expect(client.chat.me.id).to.equal(payload.data.user.id);
    });

    it('should emit a connected event', () => {
      const emit = sinon.spy(client, 'emit');

      connectedEvent.handle(payload);

      expect(emit.calledOnce);
      expect(emit.calledWith(Events.CONNECTED, client.chat.user));
    });
  });
});
