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
    space: string;
    client: string;
    service: string;
    popup: string;

    constructor() {
        super();
    }

    setRoute(params?: ISetRouteParams): ISherlockRouteStore {
        if (params.space && !params.client) {
            this.space = params.space;
            this.client = undefined;
            this.service = undefined;
        } else if (params.client && !params.service) {
            this.space = params.space ?? this.space;
            this.client = params.client;
            this.service = undefined;
        } else if (params.service) {
            this.space = params.space ?? this.space;
            this.client = params.client ?? this.client;
            this.service = params.service;
        }
        if (params?.popup) {
            this.popup = params.popup;
            escapeQueuePromise = __escapeQueue(() => {
                this.popup = undefined;
            });
        } else {
            escapeQueuePromise?.cancel?.();
        }
    }
}

export default SherlockRouteStore;
