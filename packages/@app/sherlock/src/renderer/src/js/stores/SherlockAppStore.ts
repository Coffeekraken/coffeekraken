import __SState from '@coffeekraken/s-state'

import type {
    ISherlockService,
    ISherlockSpace,
    ISherlockUiClientStates
} from '../../../../shared/SherlockTypes'

export interface ISetRouteParams {
    space?: string
    client?: string
    service?: string
}

export interface ISherlockAppStore {
    title: string
    route: string[]
    space: string
    clientStates: ISherlockUiClientStates
}

const appStore = new __SState({
    title: 'Sherlock',
    route: [],
    space: null,
    clientStates: {}
})

export function __setRoute(params: ISetRouteParams): void {
    const newRoute = []
    if (params.space) {
        newRoute.push(params.space)
    }
    if (params.client) {
        newRoute.push(params.client)
    }
}

export default appStore
