import __SStore from '@coffeekraken/s-store';

import { ISDobbyReporterMetas } from '@coffeekraken/s-dobby';
import { ISherlockPool } from '../../../../shared/SherlockTypes.js';

import __SherlockReportersStore from './SherlockReportersStore.js';

export interface ISherlockPoolsStore {
    [key: string]: ISherlockPool;
}

class SherlockPoolsStore extends __SStore {
    _pools: any = {};
    _spaceUid: string;

    constructor(spaceUid: string) {
        super({
            _pools: {},
        });
        this._spaceUid = spaceUid;
    }

    async mount() {
        // load the spaces
        const space = await window.sherlock.getSpace(this._spaceUid);
        // set the pools
        Object.assign(this._pools, space.pools ?? {});
    }

    getPools(): Record<string, ISherlockPool> {
        return this._pools;
    }

    getPoolReporters(poolUid: string): Record<string, ISDobbyReporterMetas> {
        const reportersStore = new __SherlockReportersStore(poolUid);
        return reportersStore.getReporters();
    }
}

export default SherlockPoolsStore;
