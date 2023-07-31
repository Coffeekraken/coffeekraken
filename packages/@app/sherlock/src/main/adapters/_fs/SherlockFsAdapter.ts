import { __deepMerge } from '@coffeekraken/sugar/object';
import type { ISherlockAdapter, ISherlockAdapterSettings } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import type {
    ISherlockClient,
    ISherlockService,
    ISherlockSpace,
} from '../../../shared/SherlockTypes.js';

export interface ISherlockFsAdapterSettings extends ISherlockAdapterSettings {
    space: string;
}

export default class SherlockFsAdapter extends __SherlockAdapter implements ISherlockAdapter {
    settings: ISherlockFsAdapterSettings;
    _client;

    constructor(settings: ISherlockFsAdapterSettings) {
        super(__deepMerge({}, settings ?? {}));
    }

    _processSpaceFromEntry(entry: any): ISherlockSpace {
        return <ISherlockSpace>{
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            image: {
                title: entry.fields.image.fields.title,
                alt: entry.fields.image.fields.description,
                url: entry.fields.image.fields.file.url,
            },
        };
    }
    getSpaces(): Promise<Record<string, ISherlockSpace>> {
        return new Promise(async (resolve) => {
            const entries = await this._client.getEntries({
                content_type: 'space',
            });
            const spaces = {};
            entries.items.forEach((entry) => {
                spaces[entry.fields.uid] = this._processSpaceFromEntry(entry);
            });
            resolve(spaces);
        });
    }

    _processClientFromEntry(entry: any): ISherlockClient {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            space: entry.fields.space?.uid,
        };
    }
    getClients(spaceUid: string): Promise<Record<string, ISherlockClient>> {
        return new Promise(async (resolve) => {
            const entries = await this._client.getEntries({
                content_type: 'client',
                'fields.space.fields.uid': spaceUid,
                'fields.space.sys.contentType.sys.id': 'space',
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
