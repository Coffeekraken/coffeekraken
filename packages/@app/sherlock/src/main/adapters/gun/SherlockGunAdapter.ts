import { __deepMerge } from '@coffeekraken/sugar/object';

import type { ISherlockAdapter } from '../SherlockAdapter.js';
import __SherlockAdapter from '../SherlockAdapter.js';

import * as __gun from 'gun';

import type {
    ISherlockClient,
    ISherlockGunAdapterSettings,
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
            // this._gun.get('clients').put(null);
            const clients = this._gun.get('clients');
            const florimont = clients.put({
                florimont: {
                    uid: 'florimont',
                    name: 'Florimont',
                    description: 'Florimont school',
                },
            });
            const services = this._gun.get('services');
            const florimontch = services.put({
                'florimont.florimont-ch': {
                    uid: 'florimont-ch',
                    name: 'florimont.ch',
                    description: 'Florimont website',
                    url: 'https://florimont.ch',
                },
            });
            florimont.get('services').set(florimontch);
        })();
    }

    clients(cb: Function): void {
        this._gun
            .get('clients')
            .map((client) => (client === null ? undefined : client))
            .on((client) => {
                delete client._;
                cb(client);
            });
    }

    setClient(client: ISherlockClient): Promise<ISherlockClient> {
        return new Promise(async (resolve) => {
            const clients = this._gun.get(this.settings.gunUid).get('clients').set(client);
            resolve(clients);
        });
    }

    clientServices(clientUid: string, cb: Function): void {
        const client = this._gun.get('clients').get(clientUid);
        client
            .get('services')
            .map()
            .on((service) => {
                delete service._;
                cb(service);
            });
    }

    // 0clientServiceTasks(clientUid: string, serviceUid: string, cb: Function): void {
    //     const client = this._gun.get('clients').get(clientUid);
    //     const service = client.get('services').get(serviceUid);
    //     service
    //         .get('tasks')
    //         .map()
    //         .on((task) => {
    //             delete task._;
    //             console.log('A', task);
    //             cb(task);
    //         });
    // }

    taskResults(taskUid: string, cb: Function): void {
        const task = this._gun.get('tasks').get(taskUid);
        task.get('results')
            .map()
            .on((taskResult) => {
                delete taskResult._;
                cb(taskResult);
            });
    }

    setTaskResult(taskResult: ISherlockTaskResult): Promise<ISherlockTaskResult> {
        return new Promise(async (resolve) => {
            const task = this._gun.get('tasks').get(taskResult.taskUid);
            task.get('results').set(taskResult);
            resolve(taskResult);
        });
    }
}
