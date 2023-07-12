import { __deepMerge } from '@coffeekraken/sugar/object';

import type { ISherlockClient, ISherlockService, ISherlockSpace } from '../../shared/SherlockTypes.js';

export interface ISherlockAdapterSettings {}

export interface ISherlockAdapter {
    getSpaces(): Promise<ISherlockSpace[]>;
    getClients(spaceUid: string): Promise<ISherlockClient[]>;
    getServices(clientUid: string): Promise<ISherlockService[]>;
}

export default class SherlockAdapter {

    settings: any = {};

    constructor(settings?: ISherlockAdapterSettings) {
        this.settings = __deepMerge({

        }, settings ?? {});
    }

}