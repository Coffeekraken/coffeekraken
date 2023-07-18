import __SStore from '@coffeekraken/s-store';

import type { ISherlockService } from '../../shared/SherlockTypes.js';

import __sherlockClientsStore from './SherlockClientsStore';

export interface IGetServicesParams {
    client?: string;
}

export interface ISherlockServicesStore {
    [key: string]: ISherlockService;
}

class SherlockServicesStore extends __SStore {
    constructor() {
        super();
    }

    getServices(params?: IGetServicesParams): Record<string, ISherlockService> {
        const startsWith = [];
        if (params.client) {
            startsWith.push(params.client);
        }

        const startsWithStr = startsWith.join('.');

        const services = {};
        for (let [serviceUid, service] of Object.entries(servicesStore)) {
            if (startsWith.length && !serviceUid.startsWith(startsWithStr)) {
                continue;
            }
            services[serviceUid] = service;
        }

        return services;
    }

    getService(serviceUid: string): ISherlockService {
        let service = servicesStore[serviceUid];
        if (!service) {
            for (let [serviceNamespace, service] of Object.entries(servicesStore)) {
                if (serviceNamespace.endsWith(`.${serviceUid}`)) {
                    return service;
                }
            }
        }
    }
}

const servicesStore = new SherlockServicesStore();

// load the services when the clients are updated
__sherlockClientsStore.$set('*', ({ value }) => {
    (async () => {
        const services = await window.sherlock.getServices(value.uid);
        for (let [serviceUid, service] of Object.entries(services)) {
            servicesStore.data[`${value.uid}.${service.uid}`] = service;
        }
    })();
});

export default servicesStore;
