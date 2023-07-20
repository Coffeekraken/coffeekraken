import __SStore from '@coffeekraken/s-store';

import type { ISherlockTaskState } from '../../../../shared/SherlockTypes';

export interface ISherlockTasksStateStore {
    [key: string]: ISherlockTaskState;
}

class SherlockTasksStatesStore extends __SStore {
    _spaceUid: string;
    _tasks: any = {};

    constructor(spaceUid: string) {
        super({
            _tasks: {},
        });
        this._spaceUid = spaceUid;
    }

    getTaskState(taskUid: string): ISherlockTaskState {
        if (!this._tasks[taskUid]) {
            this._tasks[taskUid] = {
                details: false,
            };
        }

        return this._tasks[taskUid];
    }
}

export default SherlockTasksStatesStore;
