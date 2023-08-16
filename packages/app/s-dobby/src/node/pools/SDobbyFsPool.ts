import __SSpecs from '@coffeekraken/s-specs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyPool from '../SDobbyPool.js';

import type { ISDobbyPoolMetas } from '../../shared/types';
import { ISDobbyFsPoolSettings, ISDobbyPool } from '../../shared/types.js';

import __SDobby from '../exports.js';
import { SDobbyFsPoolSettingsSpecs } from '../specs.js';

/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyPool
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

    async loadTasks() {}

    async loadReporters() {}
}
