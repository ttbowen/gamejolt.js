const chai = require('chai');
const path = require('path');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const Client = require('../src/client/Client');
const ClientUser = require('../src/structures/site/ClientUser');
const FriendRequest = require('../src/structures/site/FriendRequest');
const loadFixtures = require('./helpers/loadFixtures');
const Notification = require('../src/structures/site/Notification');

describe('Client', () => {
  let client;
  let fixtures;

  before(() => {
    fixtures = loadFixtures(path.join(__dirname, './fixtures'), 'utf8');
  });

  beforeEach(() => {
    client = new Client();
  });

  describe('login', () => {
    it('should throw an error when username or password is empty', () => {
      const username = '';
      const password = '';

      assert.throws(() => {
        client.login(username, password);
      }, 'You must pass in a valid username and password');
    });

    it('should call auth on api client with correct arguments', () => {
      const auth = sinon.stub(client.api, 'auth');
      const username = 'username';
      const password = 'P@ssw0rd';
      auth.callThrough();

      client.login(username, password);

      assert(auth.calledOnce);
      assert(auth.calledWith(username, password));
    });

    it('should set the client user when auth is successful', () => {
      const authStub = sinon.stub(client.api, 'auth');
      const getChatStub = sinon.stub(client.api, 'getChat');
      const username = 'username';
      const password = 'P@ssw0rd';
      const siteUser = JSON.parse(fixtures.siteUser);
      const expectedUser = new ClientUser(client, siteUser);
      getChatStub.callThrough();
      authStub.resolves({
        data: {
          payload: {
            success: true,
            user: siteUser
          }
        }
      });

      client.login(username, password).then(() => {
        expect(client.clientUser).to.eql(expectedUser);
      });
    });

    it('should call initChat when auth is successful', () => {
      const authStub = sinon.stub(client.api, 'auth');
      const getChatStub = sinon.stub(client.api, 'getChat');
      const initChatStub = sinon.stub(client, 'initChat');
      const username = 'username';
      const password = 'P@ssw0rd';
      const server = 'http://example.com';
      const siteUser = JSON.parse(fixtures.siteUser);
      getChatStub.resolves(server);
      authStub.resolves({
        data: {
          payload: {
            success: true,
            user: siteUser
          }
        }
      });

      client.login(username, password).then(() => {
        expect(initChatStub.calledOnce);
        expect(initChatStub.calledWith(server, client.api.frontend));
      });
    });
  });

  describe('initChat', () => {
    it('should call connect on primus client with correct arguments', () => {
      const connect = sinon.stub(client.primus, 'connect');
      const server = 'http://example.com';
      const frontend = 'qwertyuiopasdfghjklzxcvbnm123456789';

      client.initChat(server, frontend);

      assert(connect.calledOnce);
      assert(connect.calledWith(server, frontend));
    });

    it('should throw an error when frontend or token is not passed', () => {
      assert.throws(() => {
        sinon.stub(client.primus, 'connect');
        const server = '';
        const frontend = '';

        client.initChat(server, frontend);
      }, 'chat endpoint and frontend needs to be provided.');
    });
  });

  describe('logout', () => {
    it('should call logout on api client', () => {
      const logout = sinon.stub(client.api, 'logout');
      logout.callThrough();

      client.logout();

      assert(logout.calledOnce);
    });
  });

  describe('fetchNotifications', () => {
    it('should call getNotifications on api client', () => {
      const getNotifications = sinon.stub(client.api, 'getNotifications');
      getNotifications.callThrough();

      client.fetchNotifications();

      assert(getNotifications.calledOnce);
    });

    it('should store the notifications', () => {
      const getNotifications = sinon.stub(client.api, 'getNotifications');
      const notifications = [
        new Notification(client, JSON.parse(fixtures.notification))
      ];
      getNotifications.resolves(notifications);

      client.fetchNotifications().then(() => {
        expect(client.notifications).to.eql(notifications);
      });
    });

    it('should emit a notifications event', () => {
      const getNotifications = sinon.stub(client.api, 'getNotifications');
      const emit = sinon.spy(client, 'emit');
      const notifications = [
        new Notification(client, JSON.parse(fixtures.notification))
      ];
      getNotifications.resolves(notifications);

      client.fetchNotifications().then(() => {
        expect(emit.calledOnce);
        expect(emit.calledWith('notifications', notifications));
      });
    });
  });

  describe('fetchNotificationCount', () => {
    it('should call getActivityCount on api client', () => {
      const getNotificationsCount = sinon.stub(client.api, 'getActivityCount');
      getNotificationsCount.callThrough();

      client.fetchNotificationCount();

      assert(getNotificationsCount.calledOnce);
    });

    it('should store the notification count', () => {
      const getNotificationsCount = sinon.stub(client.api, 'getActivityCount');
      const count = 5;
      getNotificationsCount.resolves(count);

      client.fetchNotificationCount().then(() => {
        expect(client.activityCount).to.equal(count);
      });
    });

    it('should emit a activity-count event', () => {
      const getNotificationsCount = sinon.stub(client.api, 'getActivityCount');
      const emit = sinon.spy(client, 'emit');
      const count = 5;
      getNotificationsCount.resolves(count);

      client.fetchNotifications().then(() => {
        expect(emit.calledOnce);
        expect(emit.calledWith('activity-count', count));
      });
    });
  });

  describe('fetchFriendRequests', () => {
    it('should call getFriendRequests on api client', () => {
      const getFriendRequests = sinon.stub(client.api, 'getFriendRequests');
      getFriendRequests.callThrough();

      client.fetchFriendRequests();

      assert(getFriendRequests.calledOnce);
    });

    it('should store the users friend requests', () => {
      const getFriendRequests = sinon.stub(client.api, 'getFriendRequests');
      const friendRequests = [
        new FriendRequest(client, JSON.parse(fixtures.friendRequest))
      ];
      getFriendRequests.resolves(friendRequests);

      client.fetchFriendRequests().then(() => {
        expect(client.friendRequests).to.eql(friendRequests);
      });
    });

    it('should emit a friend-requests event', () => {
      const getFriendRequests = sinon.stub(client.api, 'getFriendRequests');
      const emit = sinon.spy(client, 'emit');
      const friendRequests = [
        new FriendRequest(client, JSON.parse(fixtures.friendRequest))
      ];
      getFriendRequests.resolves(friendRequests);

      client.fetchFriendRequests().then(() => {
        expect(emit.calledOnce);
        expect(emit.calledWith('friend-requests', friendRequests));
      });
    });
  });

  describe('fetchFriendCount', () => {
    it('should call getFriendCount on api client', () => {
      const getFriendRequestsCount = sinon.stub(client.api, 'getFriendCount');
      getFriendRequestsCount.callThrough();

      client.fetchFriendCount();

      assert(getFriendRequestsCount.calledOnce);
    });

    it('should store the friend request count', () => {
      const getFriendRequestsCount = sinon.stub(client.api, 'getFriendCount');
      const count = 100;
      getFriendRequestsCount.resolves(count);

      client.fetchFriendCount().then(() => {
        expect(client.friendRequestCount).to.equal(count);
      });
    });

    it('should emit a request-count event', () => {
      const getFriendRequestsCount = sinon.stub(client.api, 'getFriendCount');
      const emit = sinon.spy(client, 'emit');
      const count = 100;
      getFriendRequestsCount.resolves(count);

      client.fetchFriendCount().then(() => {
        expect(emit.calledOnce);
        expect(emit.calledWith('request-count', count));
      });
    });
  });
});
