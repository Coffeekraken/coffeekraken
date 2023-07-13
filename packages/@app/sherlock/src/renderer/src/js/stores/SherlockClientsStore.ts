import __SState from '@coffeekraken/s-state'
import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby'

import type { ISherlockClient } from '../../shared/SherlockTypes.js'

import __sherlockRouteStore from './SherlockRouteStore'

export interface IGetClientsParams {
    space?: string
}

export interface ISherlockClientStore {
    [key: string]: ISherlockClient
}

const clientsStore = new __SState({})

__sherlockRouteStore.$set('space', () => {
    ;(async () => {
        const clients = await window.sherlock.getClients(__sherlockRouteStore.space)
        Object.assign(clientsStore, clients)
    })()
})

export function __getClients(params?: IGetClientsParams): Record<string, ISherlockClient> {
    return clientsStore
}

export function __getClient(clientUid: string): ISherlockClient {
    return clientsStore[clientUid]
}

export default clientsStore
