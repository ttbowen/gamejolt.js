declare module 'gamejolt.js' {

    import { EventEmitter } from 'events';
    import { Socket } from 'net';

    export const version: string;

    export class Message {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public userId: number;
        public user: User;
        public roomId: number;
        public room: Room;
        public content: string;
        public contentRaw: string;
        public loggedOn: Date;
        public status: string;
        public replied: boolean;

        public setup(data: any): void;
        public reply(content: string): void;

        public readonly isMentioned: boolean;
        public toString(): string;
    }

    export class Room {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public type: string;
        public title: string;
        public descriptionMarkdown: string;
        public lastMessageOn: Date;
        public staff: any[];
        public status: string;

        public setup(data: any): void;
    }

    export class User {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public type: string;
        public status: number;
        public username: string;
        public displayName: string;
        public imgAvatar: string;
        public permissionLevel: number;
        public currentlyPlaying: any[];

        public setup(data: any): void;
    }

    export class FriendRequest {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public user_id: number;
        public target_user_id: number;
        public user: SiteUser;
        public target_user: SiteUser;
        public created_on: Date;
        public accepted_on: Date;
        public declined_on: Date;
        public state: number;

        public setup(data: any): void;
        public accept(): Promise<boolean>;
    }

    export class Game {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public title: string;
        public avgRating: number;
        public category: string;
        public categoryHuman: string;
        public creationTool: string;
        public creationToolHuman: string;
        public descriptionMarkdown: string;
        public descriptionCompiled: string;
        public developer: SiteUser;
        public viewCount: number;
        public playCount: number;
        public downloadCount: number;
        public postedOn: Date;
        public publishedOn: Date;
        public status: number;
        public tigrsAge: string;
        public ratingCount: number;
        public slug: string;
        public followerCount: number;
        public trophiesCount: number;
        public hasScores: boolean;
        public compatibility: Compatibility;
        public imgThumbnailWebm: string;
        public imgThumbnailMp4: string;
        public headerMediaItem: MediaItem;
        public thumbnailMediaItem: MediaItem;

        public setup(data: any): void;
    }

    export class GameOverview {
        constructor(client: Client, data: any);

        public client: Client;

        public metaDescription: string;
        public fb: any;
        public microdata: any;
        public twitter: any;
        public supporters: any[];
        public profileCount: number;
        public downloadCount: number;
        public playCount: number;
        public mediaItems: any[];
        public songs: any[];
        public developerGamesCount: number;
        public packages: any[]
        public sellables: any[];
        public releases: any[];
        public builds: any[];
        public launchOptions: any[];
        public recommendedGames: any[];
        public posts: any[];

        public setup(data: any): void;
    }

    export class Notification {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public scroll_id: Date;
        public user_id: number;
        public viewed_on: number;
        public type: string;
        public added_on: Date;
        public from_resource: string;
        public from_resource_id: number;
        public from_resource_model: any;
        public action_resource: string;
        public action_resource_id: number;
        public action_resource_model: any;
        public to_resource: string;
        public to_resource_id: number;
        public to_resource_model: any;

        public setup(data: any): void;
    }

    export class UserFriendship {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public user_id: number;
        public targeted_user: SiteUser;
        public target_user_id: number;
        public user: SiteUser;
        public accepted_on: Date;
        public created_on: Date;
        public declined_on: Date;
        public state: number;

        setup(data: any): void;
    }

    export class SiteUser {
        constructor(client: Client, data: any);

        public client: Client;

        public id: number;
        public type: string;
        public username: string;
        public displayName: string;
        public joined: number;
        public lastOnline: number;
        public website: string;
        public url: string;
        public experience: number;
        public experienceNext: number;
        public dogTag: string;
        public imgAvatar: string;
        public status: number;
        public permissionLevel: number;
        public twitterId: string;
        public twitterScreenName: string
        public facebookId: string;
        public facebookName: string;
        public googleId: string;
        public googleNickname: string
        public level: number;

        public sendFriendRequest(): Promise<boolean>;
        public setup(data: any): void;
    }

    export class ClientUser extends SiteUser {
        constructor(client: Client, data: any);

        public setPassword(oldPassword: string, newPassword: string): void;
        public setEmail(email: string): void;
        public setUsername(username: string): void;
        public setNickname(name: string): void;
        public setBio(content: string): string;
    }

    export class Compatibility {
        constructor(client: Client, data: any);

        public setup(data: any): void;

        public gameId: number;
        public id: number;
        public osWindows: boolean;
        public osWindows64: boolean;
        public osLinux: boolean;
        public osLinux64: boolean;
        public osMac: boolean;
        public osMax64: boolean;

    }

    export class FeaturedGame {
        constructor(client: Client, data: any);

        public setup(data: any): void;

        public content: string;
        public game: Game;
        public headerMediaItem: string;
        public id: number;
        public imgVersion: number;
        public postedOn: Date;
    }

    export class MediaItem {
        constructor(client: Client, data: any);

        public setup(data: any): void;

        public id: number;
        public type: string;
        public parentId: number;
        public hash: string;
        public filename: string;
        public filetype: string;
        public isAnimated: boolean;
        public width: number;
        public height: number;
        public filesize: number;
        public cropStartX: number;
        public cropStartY: number;
        public cropEndX: number;
        public cropEndY: number;
        public addedOn: Date;
        public status: string;
        public imgUrl: string;
        public mediaServerUrl: string;
        public mediaServerUrlWebm: string;
        public mediaServerUrlmp4: string;
    }

    export class Client extends EventEmitter {
        constructor(options?: any);

        private primus: PrimusManager;

        public username: string;
        public startTime: number;
        public activityCount: number;
        public friendRequests: any[];
        public notifications: any[];
        public countInterval: number;
        public api: SiteAPIManager;

        public clientUser: ClientUser;

        public readonly chat: PrimusManager;

        public login(username: string, password: string): Promise<any>;
        public logout(): void;
        public initChat(server: string, frontend: string): void;
        public fetchNotifcations(): void;
        public fetchNotifcationCount(): void;
        public fetchFriendRequests(): void;
        public fetchFriendCount(): void;
        private _initTimers(): void;

        public on(event: string, listener: Function): this;
        public on(event: 'clear-notifications', listener: (data: any) => void): this;
        public on(event: 'connected', listener: (user: User) => void): this;
        public on(event: 'message', listener: (message: Message) => void): this;
        public on(event: 'message-cleared', listener: (data: any) => void): this;
        public on(event: 'friend-offline', listener: (userId: number, friend: User) => void): this;
        public on(event: 'friend-online', listener: (friend: User) => void): this;
        public on(event: 'friend-add', listener: (friend: User) => void): this;
        public on(event: 'friend-remove', listener: (userId: number, removed?: User) => void): this;
        public on(event: 'online-count', listener: (count: number) => void): this;
        public on(event: 'friends-list', listener: (friends: UserCollection) => void): this;
        public on(event: 'user-enter-room', listener: (roomId: number, user: User) => void): this;
        public on(event: 'user-leave-room', listener: (userId: number, roomId: number, user?: User) => void): this;
        public on(event: 'friend-updated', listener: (oldUser: User, user: User) => void): this;
        public on(event: 'role-set', listener: (data: any) => void): this;
        public on(event: 'user-muted', listener: (userId: number, roomId: number, isGlobal: boolean, user?: User) => void): this;
        public on(event: 'user-unmuted', listener: (userId: number, roomId: number, isGlobal: boolean, user?: User) => void): this;
        public on(event: 'user-updated', listener: (oldUser: User, user: User) => void): this;
        public on(event: 'notification', listener: (data: Message | object) => void): this;
        public on(event: 'prime-chatroom', listener: (data: any) => void): this;
        public on(event: 'public-rooms', listener: (rooms: Room[]) => void): this;
        public on(event: 'you-updated', listener: (oldUser: User, user: User) => void): this;
        public on(event: 'you-leave-room', listener: (data: any) => void): this;
    }

    export class SiteAPIManager {
        constructor(client: Client);

        public readonly base: string;
        public readonly frontend: string;
        public client: Client;

        public auth(username: string, password: string): Promise<any>;
        public logout(): Promise<any>;
        public discover(): Promise<any>;
        public getChat(): Promise<string>;
        public getUser(username: string): Promise<SiteUser>;
        public getGame(gameId: number): Promise<Game>;
        public getGameOverview(gameId: number): Promise<GameOverview>;
        public getActivityCount(): Promise<number>;
        public getFriendCount(): Promise<number>;
        public getNotifications(): Promise<Notification[]>;
        public getFriendRequests(): Promise<FriendRequest[]>;
        public getUserFriendship(username: string): Promise<UserFriendship>;
        public friendAdd(userId: number): Promise<any>;
        public friendRemove(id: number): Promise<any>;
        public friendAccept(id: number): Promise<any>;
        public save(method: string, data: any): Promise<any>;
        public emailPreferences(method: string, data: any): Promise<any>;
        public changePassword(data: any): Promise<any>;
    }

    export class EventManager {
        constructor(client: Client);

        public client: Client;
        public handlers: any;

        public register(event: string, handle: string): void;
        public handle(data: any): any;
    }

    export class PrimusManager extends EventEmitter {
        constructor(client: Client);
        public client: Client;
        public eventManager: EventManager;
        public socket: Socket;
        public spark: any;
        public readonly uptime: number;

        public connect(server: string, frontend: string): void;
        public reconnect(): void;
        public resetClient(): void;
        public logout(): void;
        public setCookie(cookie: string): void;
        public enterRoom(roomId: number): void;
        public leaveRoom(roomId: number): void;
        public sendMessage(message: string, roomId: number): void;
        public mod(userId: number, roomId: number): void;
        public demod(userId: number, roomId: number): void;
        public messageRemove(msgId: number, roomId: number): void;
        public isPmRoom(room: any): boolean;
        public isGroupRoom(room: any): boolean;
        public focus(roomId: number): void;
        public unFocus(roomId: number): void;
        public logMessage(msg: Message): void;
    }

    export class UserCollection {
        constructor(users: any);

        public collection: any[];
        public useronline: number;
        public useroffline: number;

        public readonly users: any[];

        public populate(users: any[]): void;
        public get(input: any): any;
        public has(input: any): boolean;
        public add(user: any): void;
        public remove(user: any): void;
        public update(user: any): void;
        public online(input: any): void;
        public offline(input: any): void;
        public mute(input: any, isGlobal: boolean): void;
        public unmute(input: any, isGlobal: boolean): void;
        public mod(input: any): void;
        public demod(input: any): void;
        public getByRoom(input: any): any;
    }

    type PublicRooms = {
        lobby?: number;
        development?: number;
        letsplay?: number;
        fangames?: number;
        espanol?: number;
    }

    export const PublicRooms: PublicRooms;

    export namespace Markdown {
        export function bold(text: string): string;
        export function underline(text: string): string;
        export function italic(text: string): string;
        export function strikeout(text: string): string;
        export function addMention(username: string): string;
    }

    type Events = 'CONNECTED'
        | 'CLEAR_NOTIFICATIONS'
        | 'FRIEND_ADD'
        | 'FRIEND_REMOVE'
        | 'FRIEND_OFFLINE'
        | 'FRIEND_ONLINE'
        | 'FRIENDS_LIST'
        | 'FRIEND_UPDATED'
        | 'MESSAGE_CLEARED'
        | 'NOTIFICATION'
        | 'ONLINE_COUNT'
        | 'ROOM_CLEARED'
        | 'ROOM_UPDATED'
        | 'ROLE_SET'
        | 'USER_ENTER_ROOM'
        | 'USER_LEAVE_ROOM'
        | 'USER_MUTED'
        | 'USER_UNMUTED'
        | 'USER_UPDATED'
        | 'PRIME_CHATROOM'
        | 'PUBLIC_ROOMS'
        | 'YOU_UPDATED'
        | 'YOU_LEAVE_ROOM';
}