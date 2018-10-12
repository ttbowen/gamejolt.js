const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const Client = require('../../src/client/Client');
const Room = require('../../src/structures/chat/Room');
const PublicRoomsHandler = require('../../src/client/primus/events/handlers/PublicRooms');
const Events = require('../../src/util/Events').Events;
const EventManager = require('../../src/client/primus/events/EventManager');

describe('PublicRoomsHandler', () => {
  let client;
  let eventManager;
  let publicRoomsEvent;
  let rooms = [];

  const payload = {
    data: {
      rooms: [
        {
          id: 2,
          type: 'open_group',
          title: 'lobby',
          description_markdown:
            "General chit-chat. Have fun, don't spam, and don't advertise that much. If you want a more serious room, look at #discussion.",
          description_compiled:
            "<p>General chit-chat. Have fun, don't spam, and don't advertise that much. If you want a more serious room, look at #discussion.</p>",
          lastMessageOn: 1539344106000,
          staff: [{ userId: 7758, permission: 'moderator' }],
          status: 'active'
        },
        {
          id: 175510,
          type: 'open_group',
          title: 'development',
          description_markdown:
            "Whether you're coding a game, or designing (like) a boss, talking about it here!",
          description_compiled:
            "<p>Whether you're coding a game, or designing (like) a boss, talking about it here!</p>",
          lastMessageOn: 1539343160000,
          staff: [{ userId: 823552, permission: 'moderator' }],
          status: 'active'
        },
        {
          id: 175512,
          type: 'open_group',
          title: 'letsplay',
          description_markdown:
            "It's time to record some games and show them to the world. Talk among other Let's Players here.",
          description_compiled:
            "<p>It's time to record some games and show them to the world. Talk among other Let's Players here.</p>",
          lastMessageOn: 1539343163000,
          staff: [],
          status: 'active'
        },
        {
          id: 175513,
          type: 'open_group',
          title: 'fangames',
          description_markdown:
            "Whether it's Mario, Freddy or Papyrus, talk about your favourite fan games here.",
          description_compiled:
            "<p>Whether it's Mario, Freddy or Papyrus, talk about your favourite fan games here.</p>",
          lastMessageOn: 1539342400000,
          staff: [{ userId: 7758, permission: 'moderator' }],
          status: 'active'
        },
        {
          id: 175514,
          type: 'open_group',
          title: 'espanol',
          description_markdown:
            'Hola amigo! This chatroom is for Spanish speaking users.',
          description_compiled:
            '<p>Hola amigo! This chatroom is for Spanish speaking users.</p>',
          lastMessageOn: 1539310095000,
          staff: [],
          status: 'active'
        }
      ]
    }
  };

  beforeEach(() => {
    client = new Client();
    eventManager = new EventManager(client);
    publicRoomsEvent = new PublicRoomsHandler(eventManager);

    for (let room in payload.data.rooms) {
      rooms.push(new Room(client, payload.data.rooms[room]));
    }
  });

  describe('handle', () => {
    it('should emit a public-rooms event', () => {
      const emit = sinon.spy(client, 'emit');

      publicRoomsEvent.handle(payload);

      assert(emit.calledOnce);
      assert(emit.calledWith(Events.PUBLIC_ROOMS, rooms));
    });
  });
});
