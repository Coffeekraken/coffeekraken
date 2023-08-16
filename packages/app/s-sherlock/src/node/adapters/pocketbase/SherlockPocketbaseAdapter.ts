import { __deepMerge } from '@coffeekraken/sugar/object';

import __pocketbase from 'pocketbase/cjs';

import EventSource from 'eventsource';

import type { ISherlockAdapter } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import type {
    ISherlockClient,
    ISherlockPocketbaseAdapterSettings,
    ISherlockTask,
    ISherlockTaskResult,
} from '../../../shared/SherlockTypes.js';

global.EventSource = EventSource;

export default class SherlockPocketbaseAdapter
    extends __SherlockAdapter
    implements ISherlockAdapter
{
    settings: ISherlockPocketbaseAdapterSettings;
    _pocketbase: any;

    constructor(settings: ISherlockPocketbaseAdapterSettings) {
        super(__deepMerge({}, settings ?? {}));

        this._pocketbase = new __pocketbase(this.settings.url);
    }

    async tasks(cb: Function): Promise<void> {
        // current records
        const records = await this._pocketbase.collection('tasks').getFullList({
            sort: '-name',
            // filter: `service.space.uid="${spaceUid}"`,
        });
        for (let [idx, record] of records.entries()) {
            cb({
                uid: record.uid,
                name: record.name,
                type: record.type,
                state: record.state,
                status: record.status,
                schedule: record.schedule,
                poolUid: record.poolUid,
                settings: record.settings,
            });
        }

        // realtime
        this._pocketbase.collection('tasks').subscribe(`*`, function (e) {
            if (e.action !== 'delete') {
                cb({
                    uid: e.record.uid,
                    name: e.record.name,
                    type: e.record.type,
                    state: e.record.state,
                    status: e.record.status,
                    schedule: e.record.schedule,
                    poolUid: e.record.poolUid,
                    settings: e.record.settings,
                });
            }
        });
    }

    async clients(cb: Function): Promise<void> {
        // current records
        const records = await this._pocketbase
            .collection('clients')
            .getFullList({
                sort: '-name',
            });
        for (let [idx, record] of records.entries()) {
            cb({
                uid: record.uid,
                name: record.name,
                description: record.description,
            });
        }

        // realtime
        this._pocketbase.collection('clients').subscribe('*', function (e) {
            if (e.action !== 'delete') {
                cb({
                    uid: e.record.uid,
                    name: e.record.name,
                    description: e.record.description,
                });
            }
        });
    }

    setClient(client: ISherlockClient): Promise<ISherlockClient> {
        return new Promise(async (resolve) => {});
    }

    async service(serviceUid: string, cb: Function): Promise<void> {
        // current records
        const record = await this._pocketbase
            .collection('services')
            .getFirstListItem(`uid="${serviceUid}"`);

        cb({
            uid: record.uid,
            name: record.name,
            description: record.description,
        });

        // realtime
        this._pocketbase
            .collection('services')
            .subscribe(record.id, function (e) {
                if (e.action !== 'delete') {
                    cb({
                        uid: e.record.uid,
                        name: e.record.name,
                        description: e.record.description,
                    });
                }
            });
    }

    async clientServices(clientUid: string, cb: Function): Promise<void> {
        const records = await this._pocketbase
            .collection('services')
            .getFullList({
                $autoCancel: false,
                filter: `client.uid="${clientUid}"`,
            });

        for (let [idx, record] of records.entries()) {
            cb({
                uid: record.uid,
                name: record.name,
                description: record.description,
                url: record.url,
            });
        }
    }

    async serviceTasks(serviceUid: string, cb: Function): Promise<void> {
        // current records
        const records = await this._pocketbase.collection('tasks').getFullList({
            sort: '-name',
            filter: `service.uid="${serviceUid}"`,
        });

        for (let [idx, record] of records.entries()) {
            cb({
                uid: record.uid,
                name: record.name,
                type: record.type,
                state: record.state,
                schedule: record.schedule,
                poolUid: record.poolUid,
                serviceUid: record.service.uid,
                settings: record.settings,
            });
        }

        // realtime
        this._pocketbase.collection('tasks').subscribe('*', async (e) => {
            console.log('UPDATE', e);

            if (e.action !== 'delete') {
                const service = await this._pocketbase
                    .collection('services')
                    .getFirstListItem(`uid="${serviceUid}"`);
                console.log('SE', service);

                // filter our events that are not for the current service
                if (!service || service.uid !== serviceUid) return;

                cb({
                    uid: e.record.uid,
                    name: e.record.name,
                    type: e.record.type,
                    state: e.record.state,
                    schedule: e.record.schedule,
                    poolUid: e.record.poolUid,
                    serviceUid: e.record.service,
                    settings: e.record.settings,
                });
            }
        });
    }

    addTask(task: ISherlockTask): Promise<ISherlockTask> {
        return new Promise(async (resolve) => {
            const service = await this._pocketbase
                .collection('services')
                .getFirstListItem(`uid="${task.serviceUid}"`);

            const record = await this._pocketbase.collection('tasks').create({
                uid: task.uid,
                name: task.name,
                type: task.type,
                state: task.schedule ? 'active' : 'idle',
                schedule: task.schedule,
                poolUid: task.poolUid,
                reporterUid: task.reporterUid,
                settings: task.settings,
                service: service.id,
            });

            resolve(task);
        });
    }

    startTask(taskUid: string): Promise<string> {
        return new Promise(async (resolve) => {
            const task = await this._pocketbase
                .collection('tasks')
                .getFirstListItem(`uid="${taskUid}"`);

            console.log('RASKkksksksksks', task);

            const record = await this._pocketbase
                .collection('tasks')
                .update(task.id, {
                    state: 'queued',
                });
            console.log('Reso___', record);

            resolve(taskUid);
        });
    }

    taskResults(taskUid: string, cb: Function): Promise<string> {
        return new Promise(async (resolve) => {
            const task = await this._pocketbase
                .collection('tasks')
                .getFirstListItem(`uid="${taskUid}"`);

            const record = await this._pocketbase
                .collection('tasks')
                .update(task.id, {
                    state: 'paused',
                });

            resolve(taskUid);
        });
    }

    setTaskResult(
        taskResult: ISherlockTaskResult,
    ): Promise<ISherlockTaskResult> {
        return new Promise(async (resolve) => {});
    }
}
