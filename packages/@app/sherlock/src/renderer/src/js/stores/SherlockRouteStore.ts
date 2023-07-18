import __SStore from '@coffeekraken/s-store';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';

export interface ISetRouteParams {
    space?: string;
    client?: string;
    service?: string;
    popup?: string;
}

export interface ISherlockRouteStore {
    space?: string;
    client?: string;
    service?: string;
    popup?: string;
}

let escapeQueuePromise;

class SherlockRouteStore extends __SStore {
    constructor() {
        super();
    }

    setRoute(params?: ISetRouteParams): ISherlockRouteStore {
        if (params.space && !params.client) {
            routeStore.space = params.space;
            routeStore.client = undefined;
            routeStore.service = undefined;
        } else if (params.client && !params.service) {
            routeStore.space = params.space ?? routeStore.space;
            routeStore.client = params.client;
            routeStore.service = undefined;
        } else if (params.service) {
            routeStore.space = params.space ?? routeStore.space;
            routeStore.client = params.client ?? routeStore.client;
            routeStore.service = params.service;
        }
        if (params?.popup) {
            routeStore.popup = params.popup;
            escapeQueuePromise = __escapeQueue(() => {
                routeStore.popup = undefined;
            });
        } else {
            escapeQueuePromise?.cancel?.();
        }
    }
}

const routeStore = new SherlockRouteStore();

export default routeStore;
