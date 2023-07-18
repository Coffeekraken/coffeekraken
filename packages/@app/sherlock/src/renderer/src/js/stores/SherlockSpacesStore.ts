import type { ISherlockSpace } from '../../shared/SherlockTypes.js';

import __SStore from '@coffeekraken/s-store';

export interface ISherlockSpacesStore {
    [key: string]: ISherlockSpace;
}

class SherlockSpacesStore extends __SStore {
    constructor() {
        super();

        this._init();
    }

    async _init() {
        // load the spaces
        const spaces = await window.sherlock.getSpaces();
        Object.assign(spacesStore, spaces);
    }

    getSpaces(): Record<string, ISherlockSpace> {
        return spacesStore;
    }

    getSpace(spaceUid: string): ISherlockSpace {
        return spacesStore[spaceUid];
    }
}

const spacesStore = new SherlockSpacesStore();

export default spacesStore;
