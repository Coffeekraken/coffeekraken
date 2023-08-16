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
    getReporters(poolUid) {
        console.log('GET 1', poolUid);
        return this._dobby.getReporters(poolUid);
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
            resolve(task);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVNBLE9BQU8sMkJBQTJCLE1BQU0sb0RBQW9ELENBQUM7QUFDN0YsT0FBTywyQkFBMkIsTUFBTSxvREFBb0QsQ0FBQztBQUU3RixPQUFPLFFBQWtDLE1BQU0sdUJBQXVCLENBQUM7QUFFdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLElBQUksQ0FBQztBQUVyQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLE9BQU8sSUFBSSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFL0MsT0FBTywwQkFBMEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU3RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBUzFCO1FBUkEsYUFBUSxHQUFxQyxFQUFFLENBQUM7UUFTNUMsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLFNBQVMsRUFBRSwrQkFBK0IsQ0FBQztRQUV2RSw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLDBCQUEwQixFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRDLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FB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