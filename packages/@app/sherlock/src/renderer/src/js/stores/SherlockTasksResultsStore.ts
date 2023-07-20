import type { ISDobbyTaskResult } from '@coffeekraken/s-dobby';
import __SStore from '@coffeekraken/s-store';

import type { ISherlockTaskResult } from '../../../../shared/SherlockTypes';

import { dobbyClient } from './SherlockTasksStore';

export interface ISherlockTasksResultsStore {
    [key: string]: ISherlockTaskResult[];
}

class SherlockTasksResultsStore extends __SStore {
    _spaceUid: string;
    _results: any = {};

    constructor(spaceUid: string) {
        super({
            _results: {},
        });
        this._spaceUid = spaceUid;

        dobbyClient.on('task.end', (taskResult: ISDobbyTaskResult) => {
            if (!this._results[taskResult.task.uid]) {
                this._results[taskResult.task.uid] = [];
            }

            this._results[taskResult.task.uid].push({
                uid: taskResult.uid,
                taskUid: taskResult.task.uid,
                data: taskResult,
            });

            // save task result
            window.sherlock.taskResult(taskResult, this._spaceUid);
        });
    }

    getTaskResults(taskUid: string): ISherlockTaskResult[] {
        if (!this._results[taskUid]) {
            this._results[taskUid] = [];
        }
        return this._results[taskUid];
    }
}

export default SherlockTasksResultsStore;
