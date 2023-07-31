import { __deepMerge } from '@coffeekraken/sugar/object';

import type {
    ISherlockClient,
    ISherlockService,
    ISherlockTaskResult,
} from '../../shared/SherlockTypes.js';

export interface ISherlockAdapterSettings {}

export interface ISherlockAdapter {
    getClients(): Promise<Record<string, ISherlockClient>>;
    getServices(clientUid: string): Promise<Record<string, ISherlockService>>;
    taskResult(taskResult: ISherlockTaskResult): Promise<ISherlockTaskResult>;
}

export default class SherlockAdapter {
    settings: any = {};

    constructor(settings?: ISherlockAdapterSettings) {
        this.settings = __deepMerge({}, settings ?? {});
    }
}
