"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SherlockContentfulAdapter_js_1 = __importDefault(require("./adapters/contentful/SherlockContentfulAdapter.js"));
const SherlockPocketbaseAdapter_js_1 = __importDefault(require("./adapters/pocketbase/SherlockPocketbaseAdapter.js"));
const s_dobby_1 = __importDefault(require("@coffeekraken/s-dobby"));
const ws_1 = require("ws");
const path_1 = __importDefault(require("path"));
const userdir_1 = require("userdir");
const SWebsocketCallbackServer_js_1 = __importDefault(require("./utils/SWebsocketCallbackServer.js"));
const fs_1 = __importDefault(require("fs"));
class SSherlock {
    constructor() {
        this.adapters = {};
        // create temporary contentful adapter inline
        this._spacesConfigPath = `${(0, userdir_1.userdir)()}/.sherlock/spaces.config.json`;
        // ensure we have the folder un user directory
        if (!fs_1.default.existsSync(path_1.default.dirname(this._spacesConfigPath))) {
            fs_1.default.mkdirSync(path_1.default.dirname(this._spacesConfigPath));
        }
        // create the callback server
        this._websockerCallbackServer = new SWebsocketCallbackServer_js_1.default();
        this._websockerCallbackServer.start();
        // create the dobby instance
        this._dobby = new s_dobby_1.default();
        this._dobby.start();
        this._dobby.server();
    }
    server() {
        const wss = new ws_1.WebSocketServer({
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
            fs_1.default.writeFileSync(this._spacesConfigPath, JSON.stringify(spaces, null, 4));
            // resolve the new space
            return Promise.resolve(space);
        });
    }
    getSpaces() {
        return new Promise((resolve) => {
            // read the current spaces config
            let spaces = {};
            if (fs_1.default.existsSync(this._spacesConfigPath)) {
                // spaces = __readJsonSync(this._spacesConfigPath)
                spaces = JSON.parse(fs_1.default.readFileSync(this._spacesConfigPath).toString());
            }
            for (let [spaceUid, space] of Object.entries(spaces)) {
                switch (space.adapter.type) {
                    case 'contentful':
                        this.adapters[space.uid] =
                            new SherlockContentfulAdapter_js_1.default({
                                space: space.adapter.settings.space,
                                accessToken: space.adapter.settings.accessToken,
                                managementAccessToken: space.adapter.settings
                                    .managementAccessToken,
                            });
                        break;
                    case 'pocketbase':
                    default:
                        this.adapters[space.uid] =
                            new SherlockPocketbaseAdapter_js_1.default({
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
                        tasksCollection: pool.settings.tasksCollection,
                        reportersCollection: pool.settings.reportersCollection,
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
            if (fs_1.default.existsSync(this._spacesConfigPath)) {
                spaces = JSON.parse(fs_1.default.readFileSync(this._spacesConfigPath).toString());
            }
            // chech that the space does not already exists
            if (spaces[space.uid]) {
                return reject(`A space with the uid "${space.uid}" does already exists...`);
            }
            // set the new space
            spaces[space.uid] = space;
            // save the new config
            fs_1.default.writeFileSync(this._spacesConfigPath, JSON.stringify(spaces, null, 4));
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
    startTask(spaceUid, taskUid) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // start the task though the adapter
            yield this.adapters[spaceUid].startTask(taskUid);
            resolve(taskUid);
        }));
    }
    pauseTask(spaceUid, taskUid) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // start the task though the adapter
            yield this.adapters[spaceUid].pauseTask(taskUid);
            resolve(taskUid);
        }));
    }
}
exports.default = SSherlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBU0Esc0hBQTZGO0FBQzdGLHNIQUE2RjtBQUU3RixvRUFBdUU7QUFFdkUsMkJBQXFDO0FBRXJDLGdEQUEwQjtBQUMxQixxQ0FBK0M7QUFFL0Msc0dBQTZFO0FBRTdFLDRDQUFzQjtBQUV0QixNQUFxQixTQUFTO0lBUzFCO1FBUkEsYUFBUSxHQUFxQyxFQUFFLENBQUM7UUFTNUMsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLElBQUEsaUJBQVMsR0FBRSwrQkFBK0IsQ0FBQztRQUV2RSw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFO1lBQzFELFlBQUksQ0FBQyxTQUFTLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLHFDQUEwQixFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRDLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksb0JBQWUsQ0FBQztZQUM1QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztRQUNILDBCQUEwQjtRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLEdB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