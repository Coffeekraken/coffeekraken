import { ISherlockSpace } from '../../../../shared/SherlockTypes.js';
import SherlockAppStore from './SherlockAppStore.js';
import __SherlockClientsStore from './SherlockClientsStore.js';
import SherlockRouteStore from './SherlockRouteStore.js';
import __SherlockServicesStore from './SherlockServicesStore.js';
import __SherlockSpacesStore from './SherlockSpacesStore.js';
import __SherlockTasksResultsStore from './SherlockTasksResultsStore.js';
import __SherlockTasksStateStore from './SherlockTasksStateStore.js';
import __SherlockTasksStore, { dobbyClient } from './SherlockTasksStore.js';

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
}

export default {
    app: new SherlockAppStore(),
    route: new SherlockRouteStore(),
    spaces: new __SherlockSpacesStore(),
    _spaces: {},
    current(): ISherlockSpaceStores {
        return this._spaces[this.route.space];
    },
    space(spaceUid: string): ISherlockSpaceStores {
        return this._spaces[spaceUid];
    },
    newSpace(space: ISherlockSpace): void | ISherlockSpaceStores {
        if (this._spaces[space.uid]) {
            return;
        }
        console.log('NEW', space);
        this._spaces[space.uid] = {
            tasks: new __SherlockTasksStore(space.uid),
            tasksStates: new __SherlockTasksStateStore(space.uid),
            tasksResults: new __SherlockTasksResultsStore(space.uid),
            clients: new __SherlockClientsStore(space.uid),
            services: new __SherlockServicesStore(space.uid),
        };
    },
    dobbyClient,
};
