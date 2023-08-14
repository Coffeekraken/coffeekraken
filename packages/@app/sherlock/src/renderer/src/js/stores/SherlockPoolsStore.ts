import __SStore from '@coffeekraken/s-store';

import { ISherlockPool } from '../../../../shared/SherlockTypes.js';

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
}

export default SherlockPoolsStore;
