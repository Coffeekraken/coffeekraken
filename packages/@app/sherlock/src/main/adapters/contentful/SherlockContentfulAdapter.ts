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

    getClients(): Promise<Record<string, ISherlockClient>> {
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

    _processServiceFromEntry(entry: any): ISherlockService {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            url: entry.fields.url,
            client: entry.fields.client?.uid,
        };
    }
    getServices(clientUid: string): Promise<Record<string, ISherlockService>> {
        return new Promise(async (resolve) => {
            const entries = await this._client.getEntries({
                content_type: 'service',
                'fields.client.fields.uid': clientUid,
                'fields.client.sys.contentType.sys.id': 'client',
            });

            const services = {};
            entries.items.forEach((entry) => {
                services[entry.fields.uid] = this._processServiceFromEntry(entry);
            });

            resolve(services);
        });
    }

    _getEnvironment(): Promise<any> {
        return new Promise((resolve) => {
            // This API call will request a space with the specified ID
            this._managementClient.getSpace(this.settings.space).then((space) => {
                space.getEnvironment('master').then((environment) => {
                    resolve(environment);
                });
            });
        });
    }

    taskResult(taskResult: ISherlockTaskResult): Promise<ISherlockTaskResult> {
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
