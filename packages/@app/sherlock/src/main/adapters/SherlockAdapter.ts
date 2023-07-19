import { __deepMerge } from '@coffeekraken/sugar/object';

import type { ISherlockClient, ISherlockService } from '../../shared/SherlockTypes.js';

export interface ISherlockAdapterSettings {}

export interface ISherlockAdapter {
    getClients(spaceUid: string): Promise<Record<string, ISherlockClient>>;
    getServices(clientUid: string): Promise<Record<string, ISherlockService>>;
}

export default class SherlockAdapter {
    settings: any = {};

    constructor(settings?: ISherlockAdapterSettings) {
        this.settings = __deepMerge({}, settings ?? {});
    }
}
