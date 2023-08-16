import {
    ISherlockClient,
    ISherlockPool,
    ISherlockService,
    ISherlockSpace,
    ISherlockTask,
    ISherlockTaskResult,
} from '../shared/SherlockTypes.js';
import type { ISherlockAdapter } from './adapters/SherlockAdapter.js';
import __SherlockContentfulAdapter from './adapters/contentful/SherlockContentfulAdapter.js';
import __SherlockPocketbaseAdapter from './adapters/pocketbase/SherlockPocketbaseAdapter.js';

import __SDobby, { ISDobbyReporterMetas } from '@coffeekraken/s-dobby';

import { WebSocketServer } from 'ws';

import __path from 'path';
import { userdir as __userdir } from 'userdir';

import __SWebsocketCallbackServer from './utils/SWebsocketCallbackServer.js';

import __fs from 'fs';

export default class SSherlock {
    adapters: Record<string, ISherlockAdapter> = {};

    _dobby: __SDobby;
    _wss: WebSocketServer;
    _websockerCallbackServer: __SWebsocketCallbackServer;

    _spacesConfigPath;

    constructor() {
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

    server(): void {
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
                } catch (e) {}
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
    send(data: any, ws: any): void {
        if (!this._wss) {
            return;
        }

        let dataStr = data;
        try {
            dataStr = JSON.stringify(data);
        } catch (e) {}

        if (ws.readyState === 1) {
            ws.send(dataStr, { binary: true });
        }
    }

    async saveSpace(space: ISherlockSpace): Promise<ISherlockSpace> {
        // read the current spaces config
        let spaces = await this.getSpaces();

        // chech that the space does not already exists
        if (!spaces[space.uid]) {
            return Promise.reject(
                `A space with the uid "${space.uid}" does already exists...`,
            );
        }

        // set the new space
        spaces[space.uid] = space;

        // save the new config
        __fs.writeFileSync(
            this._spacesConfigPath,
            JSON.stringify(spaces, null, 4),
        );

        // resolve the new space
        return Promise.resolve(space);
    }

    getSpaces(): Promise<Record<string, ISherlockSpace>> {
        return new Promise((resolve) => {
            // read the current spaces config
            let spaces = {};

            if (__fs.existsSync(this._spacesConfigPath)) {
                // spaces = __readJsonSync(this._spacesConfigPath)
                spaces = JSON.parse(
                    __fs.readFileSync(this._spacesConfigPath).toString(),
                );
            }

            for (let [spaceUid, space] of Object.entries(spaces)) {
                switch (space.adapter.type) {
                    case 'contentful':
                        this.adapters[space.uid] =
                            new __SherlockContentfulAdapter({
                                space: space.adapter.settings.space,
                                accessToken: space.adapter.settings.accessToken,
                                managementAccessToken:
                                    space.adapter.settings
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

    getSpace(spaceUid: string): Promise<ISherlockSpace> {
        return new Promise(async (resolve) => {
            // read the current spaces config
            let spaces = await this.getSpaces();
            resolve(spaces[spaceUid]);
        });
    }

    async saveUserInfo(
        spaceUid: string,
        userInfo: any,
    ): Promise<ISherlockSpace> {
        // get the corresponding space
        const space = await this.getSpace(spaceUid);

        // update user infos
        space.userInfo = userInfo;

        // save the space
        return this.saveSpace(space);
    }

    tasks(spaceUid: string, callbackId: string): void {
        this.adapters[spaceUid].tasks((task: ISherlockTask) => {
            // @ts-ignore
            this._websockerCallbackServer.send(task, callbackId);
        });
    }

    clients(spaceUid: string, callbackId: string): void {
        this.adapters[spaceUid].clients((client: ISherlockClient) => {
            // @ts-ignore
            this._websockerCallbackServer.send(client, callbackId);
        });
    }

    service(spaceUid: string, serviceUid: string, callbackId: string): void {
        this.adapters[spaceUid].service(
            serviceUid,
            (service: ISherlockService) => {
                // @ts-ignore
                this._websockerCallbackServer.send(service, callbackId);
            },
        );
    }

    clientServices(
        spaceUid: string,
        clientUid: string,
        callbackId: string,
    ): void {
        this.adapters[spaceUid].clientServices(
            clientUid,
            (service: ISherlockService) => {
                // @ts-ignore
                this._websockerCallbackServer.send(service, callbackId);
            },
        );
    }

    serviceTasks(
        spaceUid: string,
        serviceUid: string,
        callbackId: string,
    ): void {
        this.adapters[spaceUid].serviceTasks(
            serviceUid,
            (task: ISherlockTask) => {
                // @ts-ignore
                this._websockerCallbackServer.send(task, callbackId);
            },
        );
    }

    taskResults(spaceUid: string, taskUid: string, callbackId: string): void {
        this.adapters[spaceUid].taskResults(
            taskUid,
            (taskResult: ISherlockTaskResult) => {
                // @ts-ignore
                this._websockerCallbackServer.send(taskResult, callbackId);
            },
        );
    }

    getReporters(poolUid?: string): Record<string, ISDobbyReporterMetas> {
        console.log('GET 1', poolUid);
        return this._dobby.getReporters(poolUid);
    }

    addPool(pool: ISherlockPool): Promise<void> {
        return new Promise((resolve) => {
            this._dobby.addPool({
                uid: pool.uid,
                type: pool.type,
                name: pool.name,
                settings:
                    pool.type === 'pocketbase'
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

    addSpace(space: ISherlockSpace): Promise<ISherlockSpace> {
        return new Promise((resolve, reject) => {
            // read the current spaces config
            let spaces = {};
            if (__fs.existsSync(this._spacesConfigPath)) {
                spaces = JSON.parse(
                    __fs.readFileSync(this._spacesConfigPath).toString(),
                );
            }

            // chech that the space does not already exists
            if (spaces[space.uid]) {
                return reject(
                    `A space with the uid "${space.uid}" does already exists...`,
                );
            }

            // set the new space
            spaces[space.uid] = space;

            // save the new config
            __fs.writeFileSync(
                this._spacesConfigPath,
                JSON.stringify(spaces, null, 4),
            );

            // resolve the new space
            resolve(space);
        });
    }

    addTask(spaceUid: string, task: ISherlockTask): Promise<ISherlockTask> {
        return new Promise(async (resolve, reject) => {
            if (!this._dobby.pools[task.poolUid]) {
                reject(
                    `The requested pool "${task.poolUid}" does not exists...`,
                );
            }

            // add the task in db
            await this.adapters[spaceUid].addTask(task);

            resolve(task);
        });
    }
}
