import __SSpecs from '@coffeekraken/s-specs';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { homedir } from 'os';
import __SDobbyAdapter from '../SDobbyAdapter.js';

import __fs from 'fs';

import { ISDobbyFsAdapterSettings } from '../types.js';
import type {
    ISDobbyAdapter,
    ISDobbyAdapterSettings,
    ISDobbyConfig,
    ISDobbySaveConfigResult,
} from './types';

/**
 * @name                SDobbyFsAdapter
 * @namespace           node
 * @type                Class
 * @extends             SDobbyAdapter
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyAdapterSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export const SDobbyFsAdapterSettingsSpecs = {
    type: 'Object',
    title: 'SDobby FS adapter settings',
    description: 'Specify the SDobby FS adapter settings',
    props: {
        rootDir: {
            type: 'String',
            title: 'Root directory',
            description: 'Specify where to save the SDobby configurations',
            default: `${homedir()}/.dobby`,
        },
    },
};

export default class SDobbyFsAdapter
    extends __SDobbyAdapter
    implements ISDobbyAdapter
{
    settings: ISDobbyFsAdapterSettings;

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
    constructor(settings?: ISDobbyAdapterSettings) {
        super(
            __deepMerge(
                __SSpecs.extractDefaults(SDobbyFsAdapterSettingsSpecs),
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
    loadConfig(uid: string): Promise<ISDobbyConfig> {
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${uid}.config.json`;

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
    saveConfig(
        uid: string,
        config: ISDobbyConfig,
    ): Promise<ISDobbySaveConfigResult> {
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${uid}.config.json`;

            console.log('SAVE', uid, configPath, config);

            __writeJsonSync(configPath, config);
            resolve({});
        });
    }
}
