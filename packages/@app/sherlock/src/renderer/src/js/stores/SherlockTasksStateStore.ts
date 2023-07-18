import __SStore from '@coffeekraken/s-store';

import type { ISherlockTaskState } from '../../../../shared/SherlockTypes';

export interface ISherlockTasksStateStore {
    [key: string]: ISherlockTaskState;
}

class SherlockTasksStatesStore extends __SStore {
    constructor() {
        super({
            tasks: {},
        });
    }

    getTaskState(taskUid: string): ISherlockTaskState {
        if (!tasksStateStore[taskUid]) {
            tasksStateStore[taskUid] = {
                details: false,
            };
        }

        return tasksStateStore[taskUid];
    }
}

const tasksStateStore = new SherlockTasksStatesStore();

export default tasksStateStore;
