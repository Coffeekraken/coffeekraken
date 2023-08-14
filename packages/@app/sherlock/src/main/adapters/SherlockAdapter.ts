import { __deepMerge } from '@coffeekraken/sugar/object';

import type { ISherlockTask, ISherlockTaskResult } from '../../shared/SherlockTypes.js';

export interface ISherlockAdapterSettings {}

export interface ISherlockAdapter {
    saveUserInfo(spaceUid: string, userInfo: any): Promise<void>;
    clients(cb: Function): void;
    service(serviceUid: string, cb: Function): void;
    clientServices(clientUid: string, cb: Function): void;
    serviceTasks(serviceUid: string, cb: Function): void;
    addTask(task: ISherlockTask): Promise<ISherlockTask>;
    taskResults(taskUid: string, cb: Function): void;
    setTaskResult(taskResult: ISherlockTaskResult): Promise<ISherlockTaskResult>;
}

export default class SherlockAdapter {
    settings: any = {};

    constructor(settings?: ISherlockAdapterSettings) {
        this.settings = __deepMerge({}, settings ?? {});
    }
}
