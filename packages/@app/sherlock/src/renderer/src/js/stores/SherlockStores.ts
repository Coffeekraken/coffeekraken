import SherlockAppStore from './SherlockAppStore.js';
import __SherlockClientsStore from './SherlockClientsStore.js';
import __SherlockPoolsStore from './SherlockPoolsStore.js';
import __SherlockRouteStore from './SherlockRouteStore.js';
import __SherlockServicesStore from './SherlockServicesStore.js';
import __SherlockServiceStore from './SherlockServiceStore.js';
import __SherlockSpacesStore from './SherlockSpacesStore.js';
import __SherlockTasksResultsStore from './SherlockTasksResultsStore.js';
import __SherlockTasksStateStore from './SherlockTasksStateStore.js';
import __SherlockTasksStore from './SherlockTasksStore.js';
import __SherlockUserInfoStore from './SherlockUserInfoStore.js';

export interface ISherlockStores {
    route: any;
    app: any;
    spaces: any;
    current(): ISherlockSpaceStores;
    space(spaceUid: string): ISherlockSpaceStores;
    dobbyClient: any;
}

export interface ISherlockSpaceStores {
    tasks: any;
    tasksStates: any;
    tasksResults: any;
    clients: any;
    services: any;
    pools: any;
}

const routeStore = new __SherlockRouteStore();

export default {
    app: new SherlockAppStore(),
    route: routeStore,
    spaces: new __SherlockSpacesStore(),
    _spaces: {},
    space(spaceUid?: string): ISherlockSpaceStores {
        if (!spaceUid) {
            spaceUid = routeStore.space;
        }

        if (this._spaces[spaceUid]) {
            return this._spaces[spaceUid];
        }

        this._spaces[spaceUid] = {
            userInfo: new __SherlockUserInfoStore(spaceUid),
            tasks: new __SherlockTasksStore(spaceUid),
            tasksStates: new __SherlockTasksStateStore(spaceUid),
            tasksResults: new __SherlockTasksResultsStore(spaceUid),
            clients: new __SherlockClientsStore(spaceUid),
            services: new __SherlockServicesStore(spaceUid),
            pools: new __SherlockPoolsStore(spaceUid),
            _services: {},
            service(serviceUid?: string) {
                if (!serviceUid) {
                    serviceUid = routeStore.service;
                }
                if (this._services[serviceUid]) {
                    return this._services[serviceUid];
                }
                this._services[serviceUid] = {
                    service: new __SherlockServiceStore(spaceUid, serviceUid),
                };
                return this._services[serviceUid];
            },
        };

        return this._spaces[spaceUid];
    },
};
