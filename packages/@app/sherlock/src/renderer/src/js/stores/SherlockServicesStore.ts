import __SStore from '@coffeekraken/s-store';

import type { ISherlockService } from '../../shared/SherlockTypes.js';

import __sherlockStore from './SherlockStores.js';

export interface IGetServicesParams {
    client?: string;
}

export interface ISherlockServicesStore {
    [key: string]: ISherlockService;
}

class SherlockServicesStore extends __SStore {
    _spaceUid: string;
    _services: any = {};

    constructor(spaceUid: string) {
        super({
            // _services: {}
        });

        this._spaceUid = spaceUid;

        setTimeout(this._init.bind(this));
    }

    async _init() {
        // load the services when the clients are updated
        __sherlockStore.space(this._spaceUid).clients.$set('*', async ({ value }) => {
            const services = await window.sherlock.getServices(value.uid);
            for (let [serviceUid, service] of Object.entries(services)) {
                this._services[`${value.uid}.${service.uid}`] = service;
            }
        });
    }

    getServices(params?: IGetServicesParams): Record<string, ISherlockService> {
        const startsWith = [];
        if (params.client) {
            startsWith.push(params.client);
        }

        const startsWithStr = startsWith.join('.');

        const services = {};
        for (let [serviceUid, service] of Object.entries(this._services)) {
            if (startsWith.length && !serviceUid.startsWith(startsWithStr)) {
                continue;
            }
            services[serviceUid] = service;
        }

        return services;
    }

    getService(serviceUid: string): ISherlockService {
        let service = this[serviceUid];
        if (!service) {
            for (let [serviceNamespace, service] of Object.entries(this._services)) {
                if (serviceNamespace.endsWith(`.${serviceUid}`)) {
                    return service;
                }
            }
        }
    }
}

export default SherlockServicesStore;
