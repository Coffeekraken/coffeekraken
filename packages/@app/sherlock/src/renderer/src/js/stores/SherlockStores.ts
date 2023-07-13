import __sherlockAppStore from './SherlockAppStore.js'
import __sherlockTasksStore, { __getTasks } from './SherlockTasksStore.js'
import __sherlockRouteStore, { __setRoute } from './SherlockRouteStore.js'
import __sherlockSpacesStore, { __getSpaces, __getSpace } from './SherlockSpacesStore.js'
import __sherlockClientsStore, { __getClients, __getClient } from './SherlockClientsStore.js'
import __sherlockServicesStore, { __getServices, __getService } from './SherlockServicesStore.js'

export default {
    app: __sherlockAppStore,
    route: __sherlockRouteStore,
    setRoute: __setRoute,
    tasks: __sherlockTasksStore,
    getTasks: __getTasks,
    spaces: __sherlockSpacesStore,
    getSpace: __getSpace,
    getSpaces: __getSpaces,
    clients: __sherlockClientsStore,
    getClient: __getClient,
    getClients: __getClients,
    services: __sherlockServicesStore,
    getService: __getService,
    getServices: __getServices
}
