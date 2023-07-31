import type { ISherlockSpace } from '../../shared/SherlockTypes.js';

import __SStore from '@coffeekraken/s-store';

import __sherlockStores from './SherlockStores.js';

export interface ISherlockSpacesStore {
    [key: string]: ISherlockSpace;
}

class SherlockSpacesStore extends __SStore {
    _spaces: any = {};

    constructor() {
        super({
            _spaces: {},
        });
        this._init();
    }

    async _init() {
        // load the spaces
        const spaces = await window.sherlock.getSpaces();
        Object.assign(this._spaces, spaces);

        // for (let [spaceUid, space] of Object.entries(this._spaces)) {
        //     __sherlockStores.newSpace(space);
        // }
    }

    async selectSpace(space: ISherlockSpace): Promise<void> {
        const res = await window.sherlock.setSpace(space.toJson());
        __sherlockStores.initSpace(space);
        __sherlockStores.route.setRoute({
            space: space.uid,
        });
    }

    getSpaces(): Record<string, ISherlockSpace> {
        return this._spaces;
    }

    getSpace(spaceUid: string): ISherlockSpace {
        return this._spaces[spaceUid];
    }
}

export default SherlockSpacesStore;
