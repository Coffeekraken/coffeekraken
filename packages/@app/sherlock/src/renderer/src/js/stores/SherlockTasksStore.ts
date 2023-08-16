import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby';
import __SStore from '@coffeekraken/s-store';

export interface IGetTasksParams {
    client?: string;
    service?: string;
    task?: string;
}

export interface ISherlockTasksStore {
    [key: string]: ISDobbyTaskMetas;
}

import __sherlockApi from '../api/SherlockApi.js';

// dobby client
// export const dobbyClient = new __SDobbyClient();

class SherlockTasksStore extends __SStore {
    _spaceUid: string;
    _tasks: any = {};

    constructor(spaceUid: string) {
        super({
            _tasks: {},
        });
        this._spaceUid = spaceUid;

        __sherlockApi.tasks(this._spaceUid, (task) => {
            this._tasks[task.uid] = task;
        });

        // dobbyClient.on('pool', (poolEvent) => {
        //     Object.assign(this._tasks, poolEvent.config.tasks);
        // });
        // dobbyClient.on('task.start', (res) => {
        //     if (!this._tasks[res.task.uid]) {
        //         return;
        //     }
        //     this._tasks[res.task.uid].status = 'running';
        // });
        // dobbyClient.on('task.end', (result: ISDobbyTaskResult) => {
        //     if (!this._tasks[result.task.uid]) {
        //         return;
        //     }
        //     this._tasks[result.task.uid].status = 'idle';
        // });
        // dobbyClient.on('task.update', (newTaskMetas) => {
        //     const taskMetas = this.getTask(newTaskMetas.uid);
        //     if (!taskMetas) {
        //         return;
        //     }
        //     Object.assign(taskMetas, newTaskMetas);
        // });

        // dobbyClient.connect();
    }

    getServiceStore(params?: IGetTasksParams): Record<string, ISDobbyTaskMetas> {
        // const startWithStr = startsWith.join('.');
        // const tasks = {};
        // for (let [taskUid, task] of Object.entries(this._tasks)) {
        //     if (startsWith.length && !taskUid.startsWith(startWithStr)) {
        //         continue;
        //     }
        //     tasks[taskUid] = task;
        // }
        // return tasks;
    }

    getTask(taskUid: string): ISDobbyTaskMetas {
        return this._tasks[taskUid];
    }

    startTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        // dobbyClient.exec({
        //     type: 'task.start',
        //     taskUid: task.uid,
        //     poolUid: task.poolUid,
        // });
    }

    pauseTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        // dobbyClient.exec({
        //     type: 'task.pause',
        //     taskUid: task.uid,
        //     poolUid: task.poolUid,
        // });
    }

    resumeTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        // dobbyClient.exec({
        //     type: 'task.resume',
        //     taskUid: task.uid,
        //     poolUid: task.poolUid,
        // });
    }

    addTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        // send the task to dobby, the ugly but much
        // appreciate house elf
        window.sherlock.addTask(this._spaceUid, task);
    }
}

export default SherlockTasksStore;
