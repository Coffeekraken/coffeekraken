import __SStore from '@coffeekraken/s-store';

import type { ISherlockUiClientStates } from '../../../../shared/SherlockTypes';

export interface ISetRouteParams {
    space?: string;
    client?: string;
    service?: string;
}

export interface ISherlockAppStore {
    title: string;
    route: string[];
    space: string;
    clientStates: ISherlockUiClientStates;
}

class SherlockAppStore extends __SStore {
    constructor() {
        super({
            title: 'Sherlock',
            route: [],
            space: null,
            clientStates: {},
        });
    }
}

const appStore = new SherlockAppStore();
export default appStore;
