import __SStore from '@coffeekraken/s-store';

import type { ISherlockClient } from '../../shared/SherlockTypes.js';

import __sherlockRouteStore from './SherlockRouteStore';

export interface IGetClientsParams {
    space?: string;
}

export interface ISherlockClientStore {
    [key: string]: ISherlockClient;
}

class SherlockClientsStore extends __SStore {
    constructor() {
        super();
        this._init();
    }

    async _init() {
        __sherlockRouteStore.$set('space', () => {
            (async () => {
                const clients = await window.sherlock.getClients(__sherlockRouteStore.space);
                Object.assign(clientsStore.data, clients);
            })();
        });
    }

    getClients(params?: IGetClientsParams): Record<string, ISherlockClient> {
        return this.data;
    }

    getClient(clientUid: string): ISherlockClient {
        return this.data[clientUid];
    }
}

const clientsStore = new SherlockClientsStore();

export function __getClient(clientUid: string): ISherlockClient {
    return clientsStore[clientUid];
}

export default clientsStore;
