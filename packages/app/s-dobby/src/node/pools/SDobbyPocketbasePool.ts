import __pocketbase from 'pocketbase/cjs';

import __SDobbyPool from '../SDobbyPool.js';

import __SDobby from '../SDobby.js';

import type {
    ISDobbyPocketbasePoolSettings,
    ISDobbyPool,
    ISDobbyPoolMetas,
    ISDobbyTaskMetas,
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

        console.log('SSSS', this.settings);
        this._pocketbase = new __pocketbase(this.settings.url);
    }

    async updateTask(
        taskUid: string,
        data: Partial<ISDobbyTaskMetas>,
    ): Promise<ISDobbyTaskMetas> {
        console.log('_UP_', data);

        const pbTask = await this._pocketbase
            .collection(this.settings.tasksCollection)
            .getFirstListItem({
                filter: `uid="${taskUid}"`,
            });

        if (!pbTask) throw new Error(`No task found with the uid "${taskUid}"`);

        const newTask: ISDobbyTaskMetas = await this._pocketbase
            .collection(this.settings.tasksCollection)
            .update(pbTask.id, data);
        return newTask;
    }

    async loadTasks() {
        // actual tasks
        const records = await this._pocketbase
            .collection(this.settings.tasksCollection)
            .getFullList();
        for (let [idx, record] of records.entries()) {
            this.addTask(record);
        }

        // realtime
        this._pocketbase
            .collection(this.settings.tasksCollection)
            .subscribe('*', function (e) {
                console.log('UPDATE', e);

                if (e.action === 'create') {
                    this.addTask(e.record);
                } else if (e.action === 'delete') {
                    this.removeTask(e.record.uid);
                } else {
                    if (e.record.state === 'queued') {
                        console.log('EXEVUTE');
                        // this.executeTask(e.record);
                    }
                }
            });
    }

    async loadReporters() {
        // actual tasks
        const records = await this._pocketbase
            .collection(this.settings.reportersCollection)
            .getFullList();
        for (let [idx, record] of records.entries()) {
            this.addReporter(record);
        }

        // realtime
        this._pocketbase
            .collection(this.settings.reportersCollection)
            .subscribe('*', function (e) {
                if (e.action === 'delete') {
                    this.removeReporter(e.record.uid);
                } else {
                    this.addReporter(e.record);
                }
            });
    }
}
