import __SStore from '@coffeekraken/s-store';

import type { ISherlockService } from '../../shared/SherlockTypes.js';

import { ISherlockTask } from '../../../../shared/SherlockTypes.js';
import __sherlockApi from '../api/SherlockApi.js';

export interface ISherlockServiceStore {
    [key: string]: ISherlockService;
}

class SherlockServiceStore extends __SStore {
    _serviceUid: string;
    _spaceUid: string;

    service: ISherlockService = {};
    tasks: Record<string, ISherlockTask> = {};

    constructor(spaceUid: string, serviceUid: string) {
        super({});
        this._spaceUid = spaceUid;
        this._serviceUid = serviceUid;
    }

    async mount() {
        __sherlockApi.service(this._spaceUid, this._serviceUid, (service) => {
            Object.assign(this.service, service);
        });

        // load the tasks
        __sherlockApi.serviceTasks(this._spaceUid, this._serviceUid, (task) => {
            console.log('DDDDDD__DDD', task);

            if (this.tasks[task.uid]) {
                Object.assign(this.tasks[task.uid], task);
            } else {
                this.tasks[task.uid] = task;
            }
            console.log('UPD_', task);
        });
    }
}

export default SherlockServiceStore;
