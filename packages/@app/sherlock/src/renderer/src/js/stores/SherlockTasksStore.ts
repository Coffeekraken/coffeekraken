import type { ISDobbyTaskMetas, ISDobbyTaskResult } from '@coffeekraken/s-dobby';
import __SStore from '@coffeekraken/s-store';

import { __SDobbyClient } from '@coffeekraken/s-dobby';

import __sherlockClientsStore from './SherlockClientsStore.js';
import __sherlockRouteStore from './SherlockRouteStore.js';
import __sherlockServicesStore from './SherlockServicesStore.js';

export interface IGetTasksParams {
    client?: string;
    service?: string;
    task?: string;
}

export interface ISherlockTasksStore {
    [key: string]: ISDobbyTaskMetas;
}

// dobby client
export const dobbyClient = new __SDobbyClient();

class SherlockTasksStore extends __SStore {
    constructor() {
        super({
            tasks: {},
        });

        dobbyClient.on('pool', (poolEvent) => {
            Object.assign(this.tasks, poolEvent.config.tasks);
        });
        dobbyClient.on('task.start', (res) => {
            if (!this.tasks[res.task.uid]) {
                return;
            }
            this.tasks[res.task.uid].status = 'running';
        });
        dobbyClient.on('task.end', (result: ISDobbyTaskResult) => {
            if (!this.tasks[result.task.uid]) {
                return;
            }
            this.tasks[result.task.uid].status = 'idle';
        });
        dobbyClient.on('task.update', (newTaskMetas) => {
            const taskMetas = this.getTask(newTaskMetas.uid);
            if (!taskMetas) {
                return;
            }
            Object.assign(taskMetas, newTaskMetas);
        });

        dobbyClient.connect();
    }

    getTasks(params?: IGetTasksParams): Record<string, ISDobbyTaskMetas> {
        const startsWith = [];
        if (params.client) {
            startsWith.push(params.client);
        }
        if (params.service) {
            startsWith.push(params.service);
        }
        if (params.task) {
            startsWith.push(params.task);
        }

        const startWithStr = startsWith.join('.');

        const tasks = {};
        for (let [taskUid, task] of Object.entries(this.tasks)) {
            if (startsWith.length && !taskUid.startsWith(startWithStr)) {
                continue;
            }
            tasks[taskUid] = task;
        }

        return tasks;
    }

    getTask(taskUid: string): ISDobbyTaskMetas {
        return this.tasks[taskUid];
    }

    startTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        dobbyClient.exec({
            type: 'task.start',
            taskUid: task.uid,
            poolUid: task.poolUid,
        });
    }

    pauseTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        dobbyClient.exec({
            type: 'task.pause',
            taskUid: task.uid,
            poolUid: task.poolUid,
        });
    }

    resumeTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        console.log('resume');
        dobbyClient.exec({
            type: 'task.resume',
            taskUid: task.uid,
            poolUid: task.poolUid,
        });
    }

    newTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        const client = __sherlockClientsStore.getClient(__sherlockRouteStore.client),
            service = __sherlockServicesStore.getService(__sherlockRouteStore.service);

        if (!client?.uid || !service?.uid) {
            return;
        }

        // update task uid
        task.uid = `${client.uid}.${service.uid}.${task.uid}`;

        // send the task to dobby, the ugly but much
        // appreciate house elf
        window.sherlock.newTask(task);
    }
}

const tasksStore = new SherlockTasksStore();

export default tasksStore;
