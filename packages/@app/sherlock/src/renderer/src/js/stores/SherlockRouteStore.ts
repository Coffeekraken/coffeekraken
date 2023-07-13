import __SState from '@coffeekraken/s-state'
import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby'

import type { ISherlockClient } from '../../shared/SherlockTypes.js'

import __sherlockAppStore from './SherlockAppStore'

export interface ISetRouteParams {
    space?: string
    client?: string
    service?: string
}

export interface ISherlockRouteStore {
    space?: string
    client?: string
    service?: string
}

const routeStore = new __SState({})

export function __setRoute(params?: ISetRouteParams): ISherlockRouteStore {
    if (params.space && !params.client) {
        routeStore.space = params.space
        routeStore.client = undefined
        routeStore.service = undefined
    } else if (params.client && !params.service) {
        routeStore.space = params.space ?? routeStore.space
        routeStore.client = params.client
        routeStore.service = undefined
    } else if (params.service) {
        routeStore.space = params.space ?? routeStore.space
        routeStore.client = params.client ?? routeStore.client
        routeStore.service = params.service
    }
}

export default routeStore
