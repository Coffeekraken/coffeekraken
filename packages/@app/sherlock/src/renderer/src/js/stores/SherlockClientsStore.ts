import __SStore from '@coffeekraken/s-store';

import type { ISherlockClient } from '../../shared/SherlockTypes.js';
import __sherlockApi from '../api/SherlockApi.js';
import __sherlockStores from './SherlockStores.js';

export interface IGetClientsParams {
    space?: string;
}

export interface ISherlockClientStore {
    [key: string]: ISherlockClient;
}

class SherlockClientsStore extends __SStore {
    _spaceUid: string;

    _clients: any = {};

    constructor(spaceUid: string) {
        super();
        this._spaceUid = spaceUid;
    }

    async mount() {
        __sherlockApi.clients(this._spaceUid, (client: ISherlockClient) => {
            this._clients[client.uid] = client;
        });
    }

    getClients(params?: IGetClientsParams): Record<string, ISherlockClient> {
        return this._clients;
    }

    getClient(clientUid?: string): ISherlockClient {
        if (!clientUid) {
            clientUid = __sherlockStores.route.client;
        }
        return this._clients[clientUid];
    }
}

export default SherlockClientsStore;
