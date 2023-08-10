import __SSpecs from '@coffeekraken/s-specs';
import __SDobbyPool from '../SDobbyPool.js';

import * as __gun from 'gun';

import { __deepMerge } from '@coffeekraken/sugar/object';

import __SDobby, {
    ISDobbyGunPoolMetas,
    SDobbyGunPoolSettingsSpecs,
} from '../exports.js';
import type {
    ISDobbyAdapter,
    ISDobbyConfig,
    ISDobbyGunPoolSettings,
    ISDobbySaveConfigResult,
} from './types';

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

export default class SDobbyP2pAdapter
    extends __SDobbyPool
    implements ISDobbyAdapter
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

        // console.log('set', this.settings);

        // start GunJS
        this._gun = __gun
            .default([
                'http://localhost:8765/gun',
                'https://gun-manhattan.herokuapp.com/gun',
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
     * @return      {Promise<ISDobbyConfig>}            A promise resolved once the config is loaded successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadConfig(): Promise<ISDobbyConfig> {
        return new Promise(async (resolve) => {
            const sampleTask = {
                uid: 'florimont.florimont-website.responseTime',
                type: 'responseTime',
                name: 'Response time',
                schedule: null,
            };

            // const pair = await __gun.default.SEA.pair();

            // if (this.settings.privateKey) {
            //     data = await __gun.default.SEA.encrypt(
            //         data,
            //         this.settings.privateKey,
            //     );
            // }

            // const data = await __gun.default.SEA.sign(enc, pair);
            // const msg = await __gun.default.SEA.verify(data, pair.pub);
            // const dec = await __gun.default.SEA.decrypt(enc, {
            //     epriv: pair.epriv,
            // });
            // const proof = await __gun.default.SEA.work(dec, pair);
            // const check = await __gun.default.SEA.work(d, pair);

            // console.log(dec);
            // console.log(proof === check);

            await this._gun.get('tasks').put(null);

            this._gun
                .get('tasks')
                .map()
                .on((task) => {
                    delete task._;
                    console.log('__tasks', task);
                });

            this._gun.get('tasks').get(sampleTask.uid).put(sampleTask);

            // const configPath = `${this.settings.rootDir}/${uid}.config.json`;

            // if (!__fs.existsSync(configPath)) {
            //     return resolve({
            //         tasks: {},
            //     });
            // }

            // const config = __readJsonSync(configPath);
            // resolve(config);
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
    saveConfig(
        uid: string,
        config: ISDobbyConfig,
    ): Promise<ISDobbySaveConfigResult> {
        return new Promise((resolve) => {
            // const configPath = `${this.settings.rootDir}/${uid}.config.json`;
            // __writeJsonSync(configPath, config);
            resolve({});
        });
    }
}
