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

        // __sherlockApi.tasks(this._spaceUid, (task) => {
        //     console.log('TA__SK', task);

        //     // this._tasks[task.uid] = task;
        // });

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

    getTask(taskUid: string): ISDobbyTaskMetas {
        return this._tasks[taskUid];
    }

    async startTask(task: ISDobbyTaskMetas): Promise<ISDobbyTaskMetas> {
        try {
            await window.sherlock.startTask(this._spaceUid, task.uid);
        } catch (e) {
            console.log('CA?', e);
        }
    }

    pauseTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        window.sherlock.pauseTask(this._spaceUid, task.uid);
    }

    resumeTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {}

    addTask(task: ISDobbyTaskMetas): ISDobbyTaskMetas {
        // send the task to dobby, the ugly but much
        // appreciate house elf
        window.sherlock.addTask(this._spaceUid, task);
    }
}

export default SherlockTasksStore;
