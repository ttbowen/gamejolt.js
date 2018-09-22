const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const Client = require('../src/client/Client');
const RateLimiter = require('../src/client/primus/RateLimiter');

describe('PrimusManager', () => {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  describe('setCookie', () => {
    it('should write set-cookie event with frontend', () => {
      client.chat.socket = { write: function() {} };
      const frontend = 'qwertyuiopasdfghjklzxcvbnm123456789';
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.setCookie(frontend);

      assert(write.calledOnce);
      assert(write.calledWith({ event: 'set-cookie', cookie: frontend }));
    });
  });

  describe('enterRoom', () => {
    it('should write enter-room event with roomId', () => {
      client.chat.socket = { write: function() {} };
      const write = sinon.stub(client.chat.socket, 'write');
      const roomId = 2;

      client.chat.enterRoom(roomId);

      assert(write.calledOnce);
      assert(write.calledWith({ event: 'enter-room', roomId: roomId }));
    });
  });

  describe('leaveRoom', () => {
    it('should write leave-room event with roomId', () => {
      client.chat.socket = { write: function() {} };
      const roomId = 2;
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.leaveRoom(roomId);

      assert(write.calledOnce);
      assert(write.calledWith({ event: 'leave-room', roomId: roomId }));
    });
  });

  describe('mod', () => {
    it('should write user-mod event with userId and roomId', () => {
      client.chat.socket = { write: function() {} };
      const roomId = 2;
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.mod(15071, roomId);

      assert(write.calledOnce);
      assert(
        write.calledWith({ event: 'user-mod', userId: 15071, roomId: roomId })
      );
    });
  });

  describe('demod', () => {
    it('should write user-demod event with userId and roomId', () => {
      client.chat.socket = { write: function() {} };
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.demod(15071, 2);

      assert(write.calledOnce);
      assert(
        write.calledWith({ event: 'user-demod', userId: 15071, roomId: 2 })
      );
    });
  });

  describe('focus', () => {
    it('should write room-focus event with roomId', () => {
      client.chat.socket = { write: function() {} };
      const roomId = 2;
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.focus(roomId);

      assert(write.calledOnce);
      assert(write.calledWith({ event: 'room-focus', roomId: roomId }));
    });
  });

  describe('unfocus', () => {
    it('should write room-unfocus event with roomId', () => {
      client.chat.socket = { write: function() {} };
      const roomId = 2;
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.unFocus(roomId);

      assert(write.calledOnce);
      assert(write.calledWith({ event: 'room-unfocus', roomId: roomId }));
    });
  });

  describe('isPmRoom', () => {
    it('should return true if passed room is a pm room type', () => {
      const room = {
        type: 'pm'
      };
      expect(client.chat.isPmRoom(room)).to.be.true;
    });

    it('should return false if passed room is not a pm room type', () => {
      const room = {
        type: 'open_group'
      };
      expect(client.chat.isPmRoom(room)).to.be.false;
    });

    it('should return false if null is passed', () => {
      expect(client.chat.isPmRoom(null)).to.be.false;
    });
  });

  describe('isGroupRoom', () => {
    it('should return true if passed room is a group room type', () => {
      const room = {
        type: 'open_group'
      };
      expect(client.chat.isGroupRoom(room)).to.be.true;
    });

    it('should return false if passed room is not a group room type', () => {
      const room = {
        type: 'pm'
      };
      expect(client.chat.isGroupRoom(room)).to.be.false;
    });

    it('should return false if null is passed', () => {
      expect(client.chat.isGroupRoom(null)).to.be.false;
    });
  });

  describe('sendMessage', () => {
    it('should write message event if not being throttled', () => {
      const message = 'Hello world';
      const roomId = 2;
      client.chat.socket = { write: function() {} };
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.sendMessage(message, roomId);

      assert(write.calledOnce);
      assert(
        write.calledWith({ event: 'message', content: message, roomId: roomId })
      );
    });

    it('should not write message event if being throttled', () => {
      const message = 'Hello world';
      const roomId = 2;
      client.chat.socket = { write: function() {} };
      const write = sinon.stub(client.chat.socket, 'write');
      client.chat.rateLimiter[roomId] = new RateLimiter(0, 0);
      sinon.stub(client.chat.rateLimiter[roomId], 'throttle').returns(true);

      client.chat.sendMessage(message, roomId);

      assert(write.notCalled);
    });
  });

  describe('messageRemove', () => {
    it('should write message-remove event with msgId and roomId', () => {
      client.chat.socket = { write: function() {} };
      const msgId = 1234;
      const roomId = 2;
      const write = sinon.stub(client.chat.socket, 'write');

      client.chat.messageRemove(msgId, roomId);

      assert(write.calledOnce);
      assert(
        write.calledWith({
          event: 'message-remove',
          msgId: msgId,
          roomId: roomId
        })
      );
    });
  });
});
