import type { ISDobbyTaskResult } from '@coffeekraken/s-dobby';
import __SStore from '@coffeekraken/s-store';

import type { ISherlockTaskResult } from '../../../../shared/SherlockTypes';

import { dobbyClient } from './SherlockTasksStore';

export interface ISherlockTasksResultsStore {
    [key: string]: ISherlockTaskResult[];
}

class SherlockTasksResultsStore extends __SStore {
    constructor() {
        super({
            tasks: {},
        });

        dobbyClient.on('task.end', (taskResult: ISDobbyTaskResult) => {
            if (!this.tasks[taskResult.task.uid]) {
                this.tasks[taskResult.task.uid] = [];
            }

            this.tasks[taskResult.task.uid].push({
                uid: 'sppfkwef',
                taskUid: taskResult.task.uid,
                data: taskResult,
            });
        });
    }

    getTaskResults(taskUid: string): ISherlockTaskResult[] {
        if (!this.tasks[taskUid]) {
            this.tasks[taskUid] = [];
        }
        return this.tasks[taskUid];
    }
}

const tasksResultsStore = new SherlockTasksResultsStore();

export default tasksResultsStore;
