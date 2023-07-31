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
        this._init();
    }

    async _init() {
        const clients = await window.sherlock.getClients(this._spaceUid);
        Object.assign(this._clients, clients);
    }

    getClients(params?: IGetClientsParams): Record<string, ISherlockClient> {
        return this._clients;
    }

    getClient(clientUid: string): ISherlockClient {
        return this._clients[clientUid];
    }
}

export default SherlockClientsStore;
