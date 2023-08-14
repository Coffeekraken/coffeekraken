import { __deepMerge } from '@coffeekraken/sugar/object';
import * as __contentful from 'contentful';
import * as __contentfulManagement from 'contentful-management';

import type { ISherlockAdapter } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import type {
    ISherlockClient,
    ISherlockContentfulAdapterSettings,
    ISherlockService,
    ISherlockTaskResult,
} from '../../../shared/SherlockTypes.js';

export default class SherlockContentfulAdapter
    extends __SherlockAdapter
    implements ISherlockAdapter
{
    settings: ISherlockContentfulAdapterSettings;
    _client;
    _managementClient;

    constructor(settings: ISherlockContentfulAdapterSettings) {
        super(__deepMerge({}, settings ?? {}));

        // creating the contentful client
        this._client = __contentful.createClient({
            space: this.settings.space,
            accessToken: this.settings.accessToken,
        });
        this._managementClient = __contentfulManagement.createClient({
            accessToken: this.settings.managementAccessToken,
        });
    }
    _processClientFromEntry(entry: any): ISherlockClient {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
        };
    }

    getPools(): Promise<Record<string, ISherlockClient>> {
        return new Promise(async (resolve) => {
            const entries = await this._client.getEntries({
                content_type: 'client',
            });

            const clients = {};
            entries.items.forEach((entry) => {
                clients[entry.fields.uid] = this._processClientFromEntry(entry);
            });
            resolve(clients);
        });
    }

    async spaceTasks(spaceUid: string, cb: Function): Promise<void> {
        // // current records
        // const records = await this._pocketbase.collection('tasks').getFullList({
        //     sort: '-name',
        //     filter: `service.space.uid="${spaceUid}"`,
        // });
        // for (let [idx, record] of records.entries()) {
        //     cb({
        //         uid: record.uid,
        //         name: record.name,
        //         type: record.type,
        //         state: record.state,
        //         status: record.status,
        //         schedule: record.schedule,
        //         poolUid: record.poolUid,
        //         settings: record.settings,
        //     });
        // }
        // // realtime
        // this._pocketbase
        //     .collection('tasks')
        //     .subscribe(`service.space.uid="${spaceUid}"`, function (e) {
        //         if (e.action !== 'delete') {
        //             cb({
        //                 uid: e.record.uid,
        //                 name: e.record.name,
        //                 type: e.record.type,
        //                 state: e.record.state,
        //                 status: e.record.status,
        //                 schedule: e.record.schedule,
        //                 poolUid: e.record.poolUid,
        //                 settings: e.record.settings,
        //             });
        //         }
        //     });
    }

    async clients(cb: Function): void {
        const entries = await this._client.getEntries({
            content_type: 'client',
        });
        entries.items.forEach((entry) => {
            cb(this._processClientFromEntry(entry));
        });
    }

    _processServiceFromEntry(entry: any): ISherlockService {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            url: entry.fields.url,
            client: entry.fields.client?.uid,
        };
    }
    async clientServices(clientUid: string, cb: Function): Promise<void> {
        const entries = await this._client.getEntries({
            content_type: 'service',
            'fields.client.fields.uid': clientUid,
            'fields.client.sys.contentType.sys.id': 'client',
        });
        entries.items.forEach((entry) => {
            cb(this._processServiceFromEntry(entry));
        });
    }

    async clientServicesTasks(
        clientUid: string,
        serviceUid: string,
        cb: Function,
    ): Promise<void> {
        // const entries = await this._client.getEntries({
        //     content_type: 'service',
        //     'fields.client.fields.uid': clientUid,
        //     'fields.client.sys.contentType.sys.id': 'client',
        // });
        // entries.items.forEach((entry) => {
        //     cb(this._processServiceFromEntry(entry));
        // });
    }

    _getEnvironment(): Promise<any> {
        return new Promise((resolve) => {
            // This API call will request a space with the specified ID
            this._managementClient
                .getSpace(this.settings.space)
                .then((space) => {
                    space.getEnvironment('master').then((environment) => {
                        resolve(environment);
                    });
                });
        });
    }

    _processTaskResultFromEntry(entry: any): ISherlockTaskResult {
        return {
            uid: entry.fields.uid,
            taskUid: entry.fields.taskUid,
            data: entry.fields.data,
        };
    }
    async taskResults(taskUid: string, cb: Function): Promise<void> {
        const entries = await this._client.getEntries({
            limit: 25,
            content_type: 'taskResult',
            'fields.taskUid': taskUid,
        });

        entries.items.forEach((entry) => {
            cb(this._processTaskResultFromEntry(entry));
        });
    }

    setTaskResult(
        taskResult: ISherlockTaskResult,
    ): Promise<ISherlockTaskResult> {
        return new Promise(async (resolve) => {
            const environment = await this._getEnvironment();
            await environment.createEntryWithId('taskResult', taskResult.uid, {
                fields: {
                    uid: {
                        'en-US': taskResult.uid,
                    },
                    taskUid: {
                        'en-US': taskResult.taskUid,
                    },
                    data: {
                        'en-US': taskResult.data,
                    },
                },
            });
            const entry = await environment.getEntry(taskResult.uid);
            await entry.publish();
            resolve(taskResult);
        });
    }
}
