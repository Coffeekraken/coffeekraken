import __SSpecs from '@coffeekraken/s-specs';
import __SDobbyPool from '../SDobbyPool.js';

import { __deepMerge } from '@coffeekraken/sugar/object';

import __SDobby, { SDobbyPocketbasePoolSettingsSpecs } from '../exports.js';
import type {
    ISDobbyAdapter,
    ISDobbyConfig,
    ISDobbyPocketBasePoolMetas,
    ISDobbyPocketBasePoolSettings,
    ISDobbySaveConfigResult,
} from './types';

/**
 * @name                SDobbyPocketBasePool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyPool
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby pool.
 *
 * @param           {ISDobbyPocketBasePoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyP2pAdapter
    extends __SDobbyPool
    implements ISDobbyAdapter
{
    settings: ISDobbyPocketBasePoolSettings;

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
        poolMetas: ISDobbyPocketBasePoolMetas,
        settings?: ISDobbyPocketBasePoolSettings,
    ) {
        super(
            dobby,
            poolMetas,
            __deepMerge(
                __SSpecs.extractDefaults(SDobbyPocketbasePoolSettingsSpecs),
                settings ?? {},
            ),
        );
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
                uid: 'florimont.florimont-ch.responseTime',
                type: 'responseTime',
                name: 'Response time',
                schedule: null,
            };
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
