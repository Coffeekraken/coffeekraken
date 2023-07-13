import __SState from '@coffeekraken/s-state'
import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby'

import type { ISherlockService } from '../../shared/SherlockTypes.js'

import __sherlockClientsStore from './SherlockClientsStore'

export interface IGetServicesParams {
    client?: string
}

export interface ISherlockServicesStore {
    [key: string]: ISherlockService
}

const servicesStore = new __SState({})

// load the services when the clients are updated
__sherlockClientsStore.$set('*', ({ value }) => {
    ;(async () => {
        const services = await window.sherlock.getServices(value.uid)
        for (let [serviceUid, service] of Object.entries(services)) {
            servicesStore[`${value.uid}.${service.uid}`] = service
        }
    })()
})

export function __getServices(params?: IGetServicesParams): Record<string, ISherlockService> {
    const startsWith = []
    if (params.client) {
        startsWith.push(params.client)
    }

    const startsWithStr = startsWith.join('.')

    const services = {}
    for (let [serviceUid, service] of Object.entries(servicesStore)) {
        if (startsWith.length && !serviceUid.startsWith(startsWithStr)) {
            continue
        }
        services[serviceUid] = service
    }

    return services
}

export function __getService(serviceUid: string): ISherlockService {
    let service = servicesStore[serviceUid]
    if (!service) {
        for (let [serviceNamespace, service] of Object.entries(servicesStore)) {
            if (serviceNamespace.endsWith(`.${serviceUid}`)) {
                return service
            }
        }
    }
}

export default servicesStore
