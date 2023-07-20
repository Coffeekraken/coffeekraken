import __SStore from '@coffeekraken/s-store';

import type { ISherlockClient } from '../../shared/SherlockTypes.js';

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
        setTimeout(this._init.bind(this));
    }

    async _init() {
        // __sherlockRouteStore.$set('space', async () => {
        const clients = await window.sherlock.getClients(this._spaceUid);
        Object.assign(this._clients, clients);
        // });
    }

    getClients(params?: IGetClientsParams): Record<string, ISherlockClient> {
        return this._clients;
    }

    getClient(clientUid: string): ISherlockClient {
        return this._clients[clientUid];
    }
}

export default SherlockClientsStore;
