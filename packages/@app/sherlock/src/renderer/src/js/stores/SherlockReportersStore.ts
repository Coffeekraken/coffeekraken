import __SStore from '@coffeekraken/s-store';

import { ISDobbyReporterMetas } from '@coffeekraken/s-dobby';
import { ISherlockPool } from '../../../../shared/SherlockTypes.js';

export interface ISherlockReportersStore {
    [key: string]: ISherlockPool;
}

class SherlockReportersStore extends __SStore {
    _reporters: Record<string, ISDobbyReporterMetas> = {};
    _poolUid: string;

    constructor(poolUid: string) {
        super({
            _pools: {},
        });
        this._poolUid = poolUid;
    }

    async mount() {
        // load the spaces
        const reporters = await window.sherlock.getReporters(this._poolUid);
        // set the pools
        Object.assign(this._reporters, reporters ?? {});

        console.log('____A', reporters);
    }

    getReporters(): Record<string, ISDobbyReporterMetas> {
        return this._reporters;
    }
}

export default SherlockReportersStore;
