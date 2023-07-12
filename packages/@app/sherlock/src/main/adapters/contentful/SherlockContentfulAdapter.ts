import { __deepMerge } from '@coffeekraken/sugar/object';
import * as __contentful from 'contentful';
import type { ISherlockAdapter, ISherlockAdapterSettings } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import type { ISherlockClient, ISherlockService, ISherlockSpace } from '../../../shared/SherlockTypes.js';

export interface ISherlockContentfulAdapterSettings extends ISherlockAdapterSettings {
    space: string
    accessToken: string
}

export default class SherlockContentfulAdapter extends __SherlockAdapter implements ISherlockAdapter {
    settings: ISherlockContentfulAdapterSettings
    _client;

    constructor(settings: ISherlockContentfulAdapterSettings) {
        super(__deepMerge({}, settings ?? {}));

        // creating the contentful client
        this._client = __contentful.createClient({
            space: this.settings.space,
            accessToken: this.settings.accessToken
        })
    }

    _processSpaceFromEntry(entry: any): ISherlockSpace {
        return <ISherlockSpace>{
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            image: {
                title: entry.fields.image.fields.title,
                alt: entry.fields.image.fields.description,
                url: entry.fields.image.fields.file.url
            }
        }
    }
    getSpaces(): Promise<ISherlockSpace[]> {
        return new Promise(async (resolve) => {
            const entries = await this._client
                .getEntries({
                    content_type: 'space',
                });
            const spaces = entries.items.map(entry => {
                return this._processSpaceFromEntry(entry);
            });
            resolve(spaces);
        });
    }

    _processClientFromEntry(entry: any): ISherlockClient {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            space: entry.fields.space?.uid ? this._processSpaceFromEntry(entry.fields.space) : undefined
        };
    }
    getClients(spaceUid: string): Promise<ISherlockClient[]> {
        return new Promise(async (resolve) => {

            const entries = await this._client.getEntries({
                content_type: 'client',
                'fields.space.fields.uid': spaceUid,
                'fields.space.sys.contentType.sys.id': 'space'
            });

            const clients = entries.items.map(entry => {
                return this._processClientFromEntry(entry);
            })

            resolve(clients);
        });
    }

    _processServiceFromEntry(entry: any): ISherlockService {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            url: entry.fields.url,
            client: entry.fields.client?.uid ? this._processClientFromEntry(entry.fields.client) : undefined
        };
    }
    getServices(clientUid: string): Promise<ISherlockService[]> {
        return new Promise(async (resolve) => {

            const entries = await this._client.getEntries({
                content_type: 'service',
                'fields.client.fields.uid': clientUid,
                'fields.client.sys.contentType.sys.id': 'client'
            });

            const services = entries.items.map(entry => {
                return this._processServiceFromEntry(entry);
            })

            resolve(services);
        });
    }

}
