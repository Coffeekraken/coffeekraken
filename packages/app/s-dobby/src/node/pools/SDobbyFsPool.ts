import __SSpecs from '@coffeekraken/s-specs';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyPool from '../SDobbyPool.js';

import { __homeDir } from '@coffeekraken/sugar/path';

import __fs from 'fs';

import type {
    ISDobbyConfig,
    ISDobbyPoolMetas,
    ISDobbyPoolSettings,
    ISDobbySaveConfigResult,
} from '../../shared/types';
import { ISDobbyFsPoolSettings, ISDobbyPool } from '../../shared/types.js';

import __SDobby from '../exports.js';
import { SDobbyFsPoolSettingsSpecs } from '../specs.js';

/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyAdapter
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyFsPool extends __SDobbyPool implements ISDobbyPool {
    settings: ISDobbyFsPoolSettings;

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
        poolMetas: ISDobbyPoolMetas,
        settings?: ISDobbyFsPoolSettings,
    ) {
        super(
            dobby,
            poolMetas,
            __deepMerge(
                __SSpecs.extractDefaults(SDobbyFsPoolSettingsSpecs),
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
        return new Promise((resolve) => {
            const configPath = `${this.settings.folder.replace(
                /^\~/,
                `${__homeDir()}`,
            )}/${this.uid}.tasks.json`;

            if (!__fs.existsSync(configPath)) {
                return resolve({
                    tasks: {},
                });
            }

            const config = __readJsonSync(configPath);

            resolve(config);
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
        return new Promise((resolve) => {
            const configPath = `${this.settings.folder.replace(
                /^\~/,
                `${__homeDir()}`,
            )}/${this.uid}.tasks.json`;
            __writeJsonSync(configPath, this.config);
            resolve({});
        });
    }
}
