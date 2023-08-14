import __SSpecs from '@coffeekraken/s-specs';
import __SDobbyPool from '../SDobbyPool.js';

import * as __gun from 'gun';
import 'gun/lib/open.js';

import { __deepMerge } from '@coffeekraken/sugar/object';

import type {
    ISDobbyGunPoolSettings,
    ISDobbyPool,
    ISDobbyPoolConfig,
    ISDobbySaveConfigResult,
} from '../../shared/types';
import __SDobby, {
    ISDobbyGunPoolMetas,
    SDobbyGunPoolSettingsSpecs,
} from '../exports.js';

/**
 * @name                SDobbyGunPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyPool
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyGunPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyGunAdapter
    extends __SDobbyPool
    implements ISDobbyPool
{
    settings: ISDobbyGunPoolSettings;

    _gun;

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        dobby: __SDobby,
        poolMetas: ISDobbyGunPoolMetas,
        settings?: ISDobbyGunPoolSettings,
    ) {
        super(
            dobby,
            poolMetas,
            __deepMerge(
                __SSpecs.extractDefaults(SDobbyGunPoolSettingsSpecs),
                settings ?? {},
            ),
        );

        // start GunJS
        this._gun = __gun
            .default([
                'http://localhost:8765/gun',
                // 'https://gun-manhattan.herokuapp.com/gun',
            ])
            .get(this.settings.gunUid);
    }

    /**
     * @name        loadConfig
     * @type        Function
     * @async
     *
     * Load the configuration
     *
     * @param       {String}            uid             The current dobby process uid
     * @return      {Promise<ISDobbyPoolConfig>}            A promise resolved once the config is loaded successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadConfig(): Promise<ISDobbyPoolConfig> {
        return new Promise(async (resolve) => {
            const config: ISDobbyPoolConfig = {
                tasks: {},
            };

            // this._gun.get('tasks').put(null, async () => {

            // this._gun.get('tasks').once((task) => {
            //     console.log('TASKSSSSS', task);
            //     resolve(config);
            // });
            await this._gun
                .get('tasks')
                .map()
                .open((task) => {
                    delete task._;
                    config.tasks[task.uid] = task;
                    this.events.emit('pool.task.add', task);
                });
            // });

            resolve(config);

            // const sampleTask = {
            //     uid: 'florimont.florimont-website.responseTime',
            //     type: 'responseTime',
            //     name: 'Response time',
            //     state: 'active',
            //     status: 'idle',
            //     schedule: '*/5 * * * * *',
            //     settings: {
            //         url: 'https://postcss.coffeekraken.io',
            //         timeout: 2000,
            //     },
            //     poolUid: 'gun',
            //     reporter: {
            //         type: 'pocketbase',
            //         name: 'Pocketbase',
            //         settings: {
            //             url: 'http://127.0.0.1:8090',
            //             collection: 'tasksResults',
            //         },
            //     },
            // };
            // await this._gun.get('tasks').put(null);
            // await this._gun.get('tasks').get(sampleTask.uid).put(sampleTask);
        });
    }

    /**
     * @name        saveConfig
     * @type        Function
     * @async
     *
     * Save the configuration
     *
     * @param       {String}            uid             The current dobby process uid
     * @return      {Promise<void>}                     A promise resolved once the config is successfully saved
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    saveConfig(): Promise<ISDobbySaveConfigResult> {
        return new Promise(async (resolve) => {
            await this._gun.get('tasks').put(this.config.tasks);
            resolve({});
        });
    }
}
