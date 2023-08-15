var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SherlockContentfulAdapter from './adapters/contentful/SherlockContentfulAdapter.js';
import __SherlockPocketbaseAdapter from './adapters/pocketbase/SherlockPocketbaseAdapter.js';
import __SDobby from '@coffeekraken/s-dobby';
import { WebSocketServer } from 'ws';
import __path from 'path';
import { userdir as __userdir } from 'userdir';
import __SWebsocketCallbackServer from './utils/SWebsocketCallbackServer.js';
import __fs from 'fs';
export default class SSherlock {
    constructor() {
        this.adapters = {};
        // create temporary contentful adapter inline
        this._spacesConfigPath = `${__userdir()}/.sherlock/spaces.config.json`;
        // ensure we have the folder un user directory
        if (!__fs.existsSync(__path.dirname(this._spacesConfigPath))) {
            __fs.mkdirSync(__path.dirname(this._spacesConfigPath));
        }
        // create the callback server
        this._websockerCallbackServer = new __SWebsocketCallbackServer();
        this._websockerCallbackServer.start();
        // create the dobby instance
        this._dobby = new __SDobby();
        this._dobby.start();
        this._dobby.server();
    }
    server() {
        const wss = new WebSocketServer({
            port: 8787,
        });
        // store at instance level
        this._wss = wss;
        // listen for connections
        wss.on('connection', (ws) => {
            ws.on('error', console.error);
            ws.on('message', (data) => {
                try {
                    data = JSON.parse(data);
                }
                catch (e) { }
            });
            // announce all pools to client
            for (let [poolUid, pool] of Object.entries(this.pools)) {
                this._announcePool(pool, ws);
            }
        });
    }
    /**
     * Send something a particular client
     */
    send(data, ws) {
        if (!this._wss) {
            return;
        }
        let dataStr = data;
        try {
            dataStr = JSON.stringify(data);
        }
        catch (e) { }
        if (ws.readyState === 1) {
            ws.send(dataStr, { binary: true });
        }
    }
    saveSpace(space) {
        return __awaiter(this, void 0, void 0, function* () {
            // read the current spaces config
            let spaces = yield this.getSpaces();
            // chech that the space does not already exists
            if (!spaces[space.uid]) {
                return Promise.reject(`A space with the uid "${space.uid}" does already exists...`);
            }
            // set the new space
            spaces[space.uid] = space;
            // save the new config
            __fs.writeFileSync(this._spacesConfigPath, JSON.stringify(spaces, null, 4));
            // resolve the new space
            return Promise.resolve(space);
        });
    }
    getSpaces() {
        return new Promise((resolve) => {
            // read the current spaces config
            let spaces = {};
            if (__fs.existsSync(this._spacesConfigPath)) {
                // spaces = __readJsonSync(this._spacesConfigPath)
                spaces = JSON.parse(__fs.readFileSync(this._spacesConfigPath).toString());
            }
            for (let [spaceUid, space] of Object.entries(spaces)) {
                switch (space.adapter.type) {
                    case 'contentful':
                        this.adapters[space.uid] =
                            new __SherlockContentfulAdapter({
                                space: space.adapter.settings.space,
                                accessToken: space.adapter.settings.accessToken,
                                managementAccessToken: space.adapter.settings
                                    .managementAccessToken,
                            });
                        break;
                    case 'pocketbase':
                    default:
                        this.adapters[space.uid] =
                            new __SherlockPocketbaseAdapter({
                                url: space.adapter.settings.url,
                            });
                        break;
                        break;
                }
            }
            resolve(spaces);
        });
    }
    getSpace(spaceUid) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // read the current spaces config
            let spaces = yield this.getSpaces();
            resolve(spaces[spaceUid]);
        }));
    }
    saveUserInfo(spaceUid, userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the corresponding space
            const space = yield this.getSpace(spaceUid);
            // update user infos
            space.userInfo = userInfo;
            // save the space
            return this.saveSpace(space);
        });
    }
    tasks(spaceUid, callbackId) {
        this.adapters[spaceUid].tasks((task) => {
            // @ts-ignore
            this._websockerCallbackServer.send(task, callbackId);
        });
    }
    clients(spaceUid, callbackId) {
        this.adapters[spaceUid].clients((client) => {
            // @ts-ignore
            this._websockerCallbackServer.send(client, callbackId);
        });
    }
    service(spaceUid, serviceUid, callbackId) {
        this.adapters[spaceUid].service(serviceUid, (service) => {
            // @ts-ignore
            this._websockerCallbackServer.send(service, callbackId);
        });
    }
    clientServices(spaceUid, clientUid, callbackId) {
        this.adapters[spaceUid].clientServices(clientUid, (service) => {
            // @ts-ignore
            this._websockerCallbackServer.send(service, callbackId);
        });
    }
    serviceTasks(spaceUid, serviceUid, callbackId) {
        this.adapters[spaceUid].serviceTasks(serviceUid, (task) => {
            // @ts-ignore
            this._websockerCallbackServer.send(task, callbackId);
        });
    }
    taskResults(spaceUid, taskUid, callbackId) {
        this.adapters[spaceUid].taskResults(taskUid, (taskResult) => {
            // @ts-ignore
            this._websockerCallbackServer.send(taskResult, callbackId);
        });
    }
    addPool(pool) {
        return new Promise((resolve) => {
            this._dobby.addPool({
                uid: pool.uid,
                type: pool.type,
                name: pool.name,
                settings: pool.type === 'pocketbase'
                    ? {
                        url: pool.settings.url,
                        collection: pool.settings.collection,
                    }
                    : pool.type === 'fs'
                        ? {
                            folder: pool.settings.folder,
                        }
                        : {},
            });
            resolve();
        });
    }
    addSpace(space) {
        return new Promise((resolve, reject) => {
            // read the current spaces config
            let spaces = {};
            if (__fs.existsSync(this._spacesConfigPath)) {
                spaces = JSON.parse(__fs.readFileSync(this._spacesConfigPath).toString());
            }
            // chech that the space does not already exists
            if (spaces[space.uid]) {
                return reject(`A space with the uid "${space.uid}" does already exists...`);
            }
            // set the new space
            spaces[space.uid] = space;
            // save the new config
            __fs.writeFileSync(this._spacesConfigPath, JSON.stringify(spaces, null, 4));
            // resolve the new space
            resolve(space);
        });
    }
    addTask(spaceUid, task) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!this._dobby.pools[task.poolUid]) {
                reject(`The requested pool "${task.poolUid}" does not exists...`);
            }
            // add the task in db
            yield this.adapters[spaceUid].addTask(task);
            // add the task in the correct pool
            this._dobby.pools[task.poolUid].addTask(task);
            resolve(task);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVNBLE9BQU8sMkJBQTJCLE1BQU0sb0RBQW9ELENBQUM7QUFDN0YsT0FBTywyQkFBMkIsTUFBTSxvREFBb0QsQ0FBQztBQUU3RixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXJDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsT0FBTyxJQUFJLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUvQyxPQUFPLDBCQUEwQixNQUFNLHFDQUFxQyxDQUFDO0FBRTdFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVM7SUFTMUI7UUFSQSxhQUFRLEdBQXFDLEVBQUUsQ0FBQztRQVM1Qyw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsU0FBUyxFQUFFLCtCQUErQixDQUFDO1FBRXZFLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFFRCw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksMEJBQTBCLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFdEMsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFD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