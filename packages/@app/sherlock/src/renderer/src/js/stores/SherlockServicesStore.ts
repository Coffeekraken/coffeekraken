import __SStore from '@coffeekraken/s-store';

import type { ISherlockService } from '../../shared/SherlockTypes.js';

import __sherlockApi from '../api/SherlockApi.js';
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
        super();
        this._spaceUid = spaceUid;
    }

    async mount() {
        // load the services when the clients are updated
        __sherlockStore.space(this._spaceUid).clients.$set('*', async ({ value }) => {
            __sherlockApi.clientServices(this._spaceUid, value.uid, (service) => {
                this._services[service.uid] = {
                    ...service,
                    clientUid: value.uid,
                };
            });
        });
    }

    getServices(params?: IGetServicesParams): Record<string, ISherlockService> {
        const services = {};
        console.log('PA', params);
        for (let [serviceUid, service] of Object.entries(this._services)) {
            if (params?.client && service.clientUid !== params.client) {
                continue;
            }
            services[serviceUid] = service;
        }

        return services;
    }

    getService(serviceUid?: string, clientUid?: string): ISherlockService {
        if (!serviceUid) {
            serviceUid = __sherlockStore.route.service;
        }

        const services = this.getServices({
            client: clientUid,
        });
        console.log('SER', services);
        for (let [uid, service] of Object.entries(services)) {
            if (uid === serviceUid) return service;
        }
    }
}

export default SherlockServicesStore;
