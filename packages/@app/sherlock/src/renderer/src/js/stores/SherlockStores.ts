import __sherlockAppStore from './SherlockAppStore.js';
import __sherlockClientsStore from './SherlockClientsStore.js';
import __sherlockRouteStore from './SherlockRouteStore.js';
import __sherlockServicesStore from './SherlockServicesStore.js';
import __sherlockSpacesStore from './SherlockSpacesStore.js';
import __sherlockTasksResultsStore from './SherlockTasksResultsStore.js';
import __sherlockTasksStateStore from './SherlockTasksStateStore.js';
import __sherlockTasksStore, { dobbyClient } from './SherlockTasksStore.js';

export default {
    app: __sherlockAppStore,
    route: __sherlockRouteStore,
    tasks: __sherlockTasksStore,
    tasksStates: __sherlockTasksStateStore,
    tasksResults: __sherlockTasksResultsStore,
    spaces: __sherlockSpacesStore,
    clients: __sherlockClientsStore,
    services: __sherlockServicesStore,
    dobbyClient,
};
