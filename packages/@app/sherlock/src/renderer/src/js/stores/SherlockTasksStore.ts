import __SState from '@coffeekraken/s-state'
import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby'

import { __SDobbyClient } from '@coffeekraken/s-dobby'

export interface IGetTasksParams {
    client?: string
    service?: string
    task?: string
}

export interface ISherlockTasksStore {
    [key: string]: ISDobbyTaskMetas
}

const tasksStore = new __SState({})

// dobby client
const dobbyClient = new __SDobbyClient()

dobbyClient.on('config', (config) => {
    Object.assign(tasksStore, config.tasks)
})

dobbyClient.connect()

export function __getTasks(params?: IGetTasksParams): Record<string, ISDobbyTaskMetas> {
    const startsWith = []
    if (params.client) {
        startsWith.push(params.client)
    }
    if (params.service) {
        startsWith.push(params.service)
    }
    if (params.task) {
        startsWith.push(params.task)
    }

    const startWithStr = startsWith.join('.')

    console.log('s', startWithStr)
}
export function __getTask(taskId: string): ISDobbyTaskMetas {
    return tasksStore[taskId]
}

export default tasksStore
