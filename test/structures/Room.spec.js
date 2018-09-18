const chai = require('chai');
const expect = chai.expect;

const Client = require('../../src/client/Client');
const Room = require('../../src/structures/chat/Room');

describe('Room', () => {
  let client;

  const data = {
    id: 2,
    type: 'open_group',
    title: 'lobby',
    description_markdown:
      "General chit-chat. Have fun, don't spam, and don't advertise that much.",
    description_compiled:
      "<p>General chit-chat. Have fun, don't spam, and don't advertise that much.</p>",
    lastMessageOn: 1537216980000,
    staff: [{ userId: 7758, permission: 'moderator' }],
    status: 'active'
  };

  beforeEach(() => {
    client = new Client();
  });

  it('should set all properties if data is present', () => {
    const room = new Room(client, data);

    expect(room).to.include({
      id: data.id,
      type: data.type,
      title: data.title,
      descriptionMarkdown: data.description_markdown,
      lastMessageOn: data.lastMessageOn,
      staff: data.staff,
      status: data.status
    });
  });
});
