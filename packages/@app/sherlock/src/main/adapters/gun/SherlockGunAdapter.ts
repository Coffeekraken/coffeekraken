import { __deepMerge } from '@coffeekraken/sugar/object';

import type { ISherlockAdapter } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import * as __gun from 'gun';

import type {
    ISherlockClient,
    ISherlockGunAdapterSettings,
    ISherlockService,
    ISherlockTaskResult,
} from '../../../shared/SherlockTypes.js';

export default class SherlockGunAdapter extends __SherlockAdapter implements ISherlockAdapter {
    settings: ISherlockGunAdapterSettings;
    _client;
    _gun;
    _managementClient;

    constructor(settings: ISherlockGunAdapterSettings) {
        super(__deepMerge({}, settings ?? {}));

        // start GunJS
        this._gun = __gun
            .default(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun'])
            .get(this.settings.gunUid);

        (async () => {
            // const ccc = await this._gun
            //     .get(this.settings.gunUid)
            //     .get('clients')
            //     .map((client) => {
            //         console.log('__S_A_AClient', client);
            //         return client.uid === 'florimont' ? client : undefined;
            //     });
            // await this._gun.get('clients').put(null);
            // await this._gun.get('clients').get('florimont').put({
            //     uid: 'florimont',
            //     name: 'Florimont',
            //     description: 'Florimont school',
            // });
            // await this._gun.get('services').get('florimont/florimont-ch').put({
            //     uid: 'florimont-ch',
            //     name: 'florimont.ch',
            //     description: 'Florimont website',
            //     url: 'https://florimont.ch',
            // });
            // await this._gun
            //     .get('clients')
            //     .get('florimont')
            //     .get('services')
            //     .once((cls) => {
            //         console.log('CLS', cls);
            //     });
            // await this._gun.get('services').put({
            //     [`florimont.florimon-ch`]: {
            //         uid: 'florimont-ch',
            //         name: 'florimont.ch',
            //         description: 'Florimont website',
            //         url: 'https://florimont.ch',
            //         clientUid: 'florimont',
            //     },
            // });
        })();
    }

    getClients(): Promise<Record<string, ISherlockClient>> {
        return new Promise(async (resolve) => {
            const clients = {};

            await this._gun
                .get('clients')
                .map((client) => (client === null ? undefined : client))
                .once((client) => {
                    console.log('Client', client);
                    clients[client.uid] = client;
                });

            resolve(clients);
        });
    }

    setClient(client: ISherlockClient): Promise<ISherlockClient> {
        return new Promise(async (resolve) => {
            const clients = this._gun.get(this.settings.gunUid).get('clients').set(client);
            resolve(clients);
        });
    }

    getServices(clientUid: string): Promise<Record<string, ISherlockService>> {
        return new Promise(async (resolve) => {
            const services = {};
            await this._gun
                .get('services')
                .map((service) => (service === null ? undefined : service))
                .once((service, key) => {
                    console.log('KEy', service, key, clientUid);
                    if (!key.startsWith(`${clientUid}/`) && !key.startsWith(`${clientUid}.`)) {
                        return;
                    }
                    services[service.uid] = service;
                });

            resolve(services);
        });
    }

    getTaskResults(taskUid: string): Promise<Record<string, ISherlockTaskResult>> {
        return new Promise(async (resolve) => {
            const results = {};
            resolve(results);
        });
    }

    setTaskResult(taskResult: ISherlockTaskResult): Promise<ISherlockTaskResult> {
        return new Promise(async (resolve) => {
            resolve(taskResult);
        });
    }
}
