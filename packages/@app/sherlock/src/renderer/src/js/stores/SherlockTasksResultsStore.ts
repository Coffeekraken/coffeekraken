import type { ISDobbyTaskResult } from '@coffeekraken/s-dobby';
import __SStore from '@coffeekraken/s-store';

import type { ISherlockTask, ISherlockTaskResult } from '../../../../shared/SherlockTypes';

import { dobbyClient } from './SherlockTasksStore';

export interface ISherlockTasksResultsStore {
    [key: string]: ISherlockTaskResult[];
}

import __sherlockStores from './SherlockStores';

class SherlockTasksResultsStore extends __SStore {
    _spaceUid: string;
    _results: any = {};
    _tasksLoadingStates: Record<string, boolean> = {};

    constructor(spaceUid: string) {
        super();
        this._spaceUid = spaceUid;

        __sherlockStores.route.$set('service', async () => {
            const tasks: Record<string, ISherlockTask> = __sherlockStores.current().tasks.getTasks({
                client: __sherlockStores.route.client,
            });

            for (let [taskUid, task] of Object.entries(tasks)) {
                this._tasksLoadingStates[taskUid] = true;

                window.sherlock.getTaskResults(this._spaceUid, task.uid).then((results) => {
                    for (let [taskResultUid, taskResult] of Object.entries(results)) {
                        this._setTaskResults(taskResult.taskUid, taskResult);
                    }
                    this._tasksLoadingStates[taskUid] = false;
                });
            }
        });

        dobbyClient.on('task.end', (dobbyTaskResult: ISDobbyTaskResult) => {
            const taskResult: ISherlockTaskResult = {
                uid: dobbyTaskResult.uid,
                taskUid: dobbyTaskResult.task.uid,
                data: dobbyTaskResult,
            };

            this._setTaskResults(taskResult.taskUid, taskResult);

            // save task result
            window.sherlock.setTaskResult(this._spaceUid, JSON.parse(JSON.stringify(taskResult)));
        });
    }

    _setTaskResults(taskUid: string, taskResult: ISherlockTaskResult) {
        if (!this._results[taskUid]) {
            this._results[taskUid] = {};
        }
        this._results[taskUid][taskResult.uid] = taskResult;
    }

    areTaskResultsLoading(taskUid: string): boolean {
        return this._tasksLoadingStates[taskUid];
    }

    getTaskResults(taskUid: string): ISherlockTaskResult[] {
        if (!this._results[taskUid]) {
            this._results[taskUid] = {};
        }
        return this._results[taskUid];
    }
}

export default SherlockTasksResultsStore;
