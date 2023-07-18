import { __deepMerge } from '@coffeekraken/sugar/object';
import * as __contentful from 'contentful';
import type { ISherlockAdapter, ISherlockAdapterSettings } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import type { ISherlockClient, ISherlockService } from '../../../shared/SherlockTypes.js';

export interface ISherlockContentfulAdapterSettings extends ISherlockAdapterSettings {
    space: string;
    accessToken: string;
}

export default class SherlockContentfulAdapter
    extends __SherlockAdapter
    implements ISherlockAdapter
{
    settings: ISherlockContentfulAdapterSettings;
    _client;

    constructor(settings: ISherlockContentfulAdapterSettings) {
        super(__deepMerge({}, settings ?? {}));

        // creating the contentful client
        this._client = __contentful.createClient({
            space: this.settings.space,
            accessToken: this.settings.accessToken,
        });
    }
    _processClientFromEntry(entry: any): ISherlockClient {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
        };
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
}
