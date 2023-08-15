import __pocketbase from 'pocketbase/cjs';

import __SDobbyPool from '../SDobbyPool.js';

import __SDobby from '../SDobby.js';

import type {
    ISDobbyPocketbasePoolSettings,
    ISDobbyPool,
    ISDobbyPoolMetas,
} from '../../shared/types';

global.EventSource = EventSource;

/**
 * @name                SDobbyPocketbasePool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyFeeder
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby feeder.
 *
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyPocketbasePool
    extends __SDobbyPool
    implements ISDobbyPool
{
    settings: ISDobbyPocketbasePoolSettings;

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
    constructor(
        dobby: __SDobby,
        poolMetas: ISDobbyPoolMetas,
        settings?: ISDobbyPocketbasePoolSettings,
    ) {
        super(dobby, poolMetas, settings);
        this._pocketbase = new __pocketbase(this.settings.url);
    }

    async loadTasks() {
        // actual tasks
        const records = await this._pocketbase
            .collection(this.settings.collection)
            .getFullList();
        for (let [idx, record] of records.entries()) {
            this.addTask(record);
        }

        // realtime
        this._pocketbase
            .collection(this.settings.collection)
            .subscribe('*', function (e) {
                if (e.action === 'delete') {
                    this.removeTask(e.record.uid);
                } else {
                    this.addTask(e.record);
                }
            });
    }
}
