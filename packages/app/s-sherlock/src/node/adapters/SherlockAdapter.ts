import { __deepMerge } from '@coffeekraken/sugar/object';

import type {
    ISherlockTask,
    ISherlockTaskResult,
} from '../../shared/SherlockTypes.js';

export interface ISherlockAdapterSettings {}

export interface ISherlockAdapter {
    clients(cb: Function): void;
    service(serviceUid: string, cb: Function): void;
    tasks(cb: Function): void;
    clientServices(clientUid: string, cb: Function): void;
    serviceTasks(serviceUid: string, cb: Function): void;
    addTask(task: ISherlockTask): Promise<ISherlockTask>;
    startTask(taskUid: string): Promise<string>;
    pauseTask(taskUid: string): Promise<string>;
    taskResults(taskUid: string, cb: Function): void;
    setTaskResult(
        taskResult: ISherlockTaskResult,
    ): Promise<ISherlockTaskResult>;
}

export default class SherlockAdapter {
    settings: any = {};

    constructor(settings?: ISherlockAdapterSettings) {
        this.settings = __deepMerge({}, settings ?? {});
    }
}
