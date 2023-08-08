import { ISherlockPool, ISherlockSpace, ISherlockTask } from '../shared/SherlockTypes.js';
import type { ISherlockAdapter } from './adapters/SherlockAdapter.js';
import __SherlockContentfulAdapter from './adapters/contentful/SherlockContentfulAdapter.js';
import __SherlockGunAdapter from './adapters/gun/SherlockGunAdapter.js';

import __SDobby from '@coffeekraken/s-dobby';

import __path from 'path';
import { userdir as __userdir } from 'userdir';

import __fs from 'fs';

export default class SherlockApp {
    adapters: Record<string, ISherlockAdapter> = {};

    _dobby: __SDobby;

    _spacesConfigPath;

    constructor() {
        // create temporary contentful adapter inline
        this._spacesConfigPath = `${__userdir()}/.sherlock/spaces.json`;

        // ensure we have the folder un user directory
        if (!__fs.existsSync(__path.dirname(this._spacesConfigPath))) {
            __fs.mkdirSync(__path.dirname(this._spacesConfigPath));
        }

        // create the dobby instance
        this._dobby = new __SDobby.default();
        this._dobby.start();
        this._dobby.server();
    }

    getSpaces(): Promise<Record<string, ISherlockSpace>> {
        return new Promise((resolve) => {
            // read the current spaces config
            let spaces = {};

            if (__fs.existsSync(this._spacesConfigPath)) {
                // spaces = __readJsonSync(this._spacesConfigPath)
                spaces = JSON.parse(__fs.readFileSync(this._spacesConfigPath).toString());
            }

            for (let [spaceUid, space] of Object.entries(spaces)) {
                switch (space.adapter.type) {
                    case 'gun':
                        this.adapters[space.uid] = new __SherlockGunAdapter({
                            gunUid: space.adapter.settings.gunUid,
                            privateKey: space.adapter.settings.privateKey,
                        });
                        break;
                    case 'contentful':
                        this.adapters[space.uid] = new __SherlockContentfulAdapter({
                            space: space.adapter.settings.space,
                            accessToken: space.adapter.settings.accessToken,
                            managementAccessToken: space.adapter.settings.managementAccessToken,
                        });
                        break;
                    case 'fs':
                    default:
                        break;
                }
            }

            resolve(spaces);
        });
    }

    // setSpace(space: ISherlockSpace): Promise<ISherlockSpace> {
    //     return new Promise((resolve) => {
    //         // check if adapter already exists
    //         if (this.adapters[space.uid]) {
    //             return resolve(space);
    //         }
    //         resolve(space);
    //     });
    // }

    addPool(pool: ISherlockPool): Promise<void> {
        return new Promise((resolve) => {
            console.log('Add', pool);
            this._dobby.addPool({
                uid: pool.uid,
                type: pool.type,
                name: pool.name,
                settings:
                    pool.type === 'gun'
                        ? {
                              gunUid: pool.settings.gunUid,
                              privateKey: null,
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

    newTask(task: ISherlockTask, poolUid: string): Promise<Record<string, ISherlockTask>> {
        return new Promise((resolve, reject) => {
            if (!this._dobby.pools[poolUid]) {
                reject(`The requested pool "${poolUid}" does not exists...`);
            }
            // add the task in the correct pool
            this._dobby[poolUid].addTask(task);
        });
    }
}
