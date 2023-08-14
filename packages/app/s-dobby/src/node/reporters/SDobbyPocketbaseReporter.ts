import __pocketbase from 'pocketbase/cjs';

import __SDobbyReporter from '../SDobbyReporter.js';

import type {
    ISDobbyPocketbaseReporterSettings,
    ISDobbyPoolMetas,
    ISDobbyPoolSettings,
    ISDobbyReporter,
    ISDobbyReporterMetas,
    ISDobbyTaskResult,
} from '../../shared/types';

global.EventSource = EventSource;

/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyReporter
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby reporter.
 *
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyPocketbaseReporter
    extends __SDobbyReporter
    implements ISDobbyReporter
{
    settings: ISDobbyPocketbaseReporterSettings;

    _pocketbase: any;

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
    constructor(reporterMetas: ISDobbyReporterMetas) {
        super(reporterMetas);
        this._pocketbase = new __pocketbase(this.settings.url);
    }

    async report(data: ISDobbyTaskResult): Promise<ISDobbyTaskResult> {
        await this._pocketbase.collection(this.settings.collection).create({
            uid: data.uid,
            taskUid: data.task.uid,
            data,
        });
        return data;
    }
}
