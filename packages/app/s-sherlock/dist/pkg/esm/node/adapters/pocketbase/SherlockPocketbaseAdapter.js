var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __deepMerge } from '@coffeekraken/sugar/object';
import __pocketbase from 'pocketbase/cjs';
import EventSource from 'eventsource';
import __SherlockAdapter from '../SherlockAdapter.js';
global.EventSource = EventSource;
export default class SherlockPocketbaseAdapter extends __SherlockAdapter {
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        this._pocketbase = new __pocketbase(this.settings.url);
    }
    tasks(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // current records
            const records = yield this._pocketbase.collection('tasks').getFullList({
                sort: '-name',
                // filter: `service.space.uid="${spaceUid}"`,
            });
            for (let [idx, record] of records.entries()) {
                cb({
                    uid: record.uid,
                    name: record.name,
                    type: record.type,
                    state: record.state,
                    status: record.status,
                    schedule: record.schedule,
                    poolUid: record.poolUid,
                    settings: record.settings,
                });
            }
            // realtime
            this._pocketbase.collection('tasks').subscribe(`*`, function (e) {
                if (e.action !== 'delete') {
                    cb({
                        uid: e.record.uid,
                        name: e.record.name,
                        type: e.record.type,
                        state: e.record.state,
                        status: e.record.status,
                        schedule: e.record.schedule,
                        poolUid: e.record.poolUid,
                        settings: e.record.settings,
                    });
                }
            });
        });
    }
    clients(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // current records
            const records = yield this._pocketbase
                .collection('clients')
                .getFullList({
                sort: '-name',
            });
            for (let [idx, record] of records.entries()) {
                cb({
                    uid: record.uid,
                    name: record.name,
                    description: record.description,
                });
            }
            // realtime
            this._pocketbase.collection('clients').subscribe('*', function (e) {
                if (e.action !== 'delete') {
                    cb({
                        uid: e.record.uid,
                        name: e.record.name,
                        description: e.record.description,
                    });
                }
            });
        });
    }
    setClient(client) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { }));
    }
    service(serviceUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // current records
            const record = yield this._pocketbase
                .collection('services')
                .getFirstListItem(`uid="${serviceUid}"`);
            cb({
                uid: record.uid,
                name: record.name,
                description: record.description,
            });
            // realtime
            this._pocketbase
                .collection('services')
                .subscribe(record.id, function (e) {
                if (e.action !== 'delete') {
                    cb({
                        uid: e.record.uid,
                        name: e.record.name,
                        description: e.record.description,
                    });
                }
            });
        });
    }
    clientServices(clientUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this._pocketbase
                .collection('services')
                .getFullList({
                $autoCancel: false,
                filter: `client.uid="${clientUid}"`,
            });
            for (let [idx, record] of records.entries()) {
                cb({
                    uid: record.uid,
                    name: record.name,
                    description: record.description,
                    url: record.url,
                });
            }
        });
    }
    serviceTasks(serviceUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // current records
            console.log('GET', serviceUid);
            const records = yield this._pocketbase.collection('tasks').getFullList({
                sort: '-name',
                filter: `service.uid="${serviceUid}"`,
            });
            console.log('REC', records);
            for (let [idx, record] of records.entries()) {
                cb({
                    uid: record.uid,
                    name: record.name,
                    type: record.type,
                    state: record.state,
                    status: record.status,
                    schedule: record.schedule,
                    poolUid: record.poolUid,
                    settings: record.settings,
                });
            }
            // realtime
            this._pocketbase.collection('tasks').subscribe('*', function (e) {
                if (e.action !== 'delete') {
                    // filter our events that are not for the current service
                    if (e.record.service.uid !== serviceUid)
                        return;
                    cb({
                        uid: e.record.uid,
                        name: e.record.name,
                        type: e.record.type,
                        state: e.record.state,
                        status: e.record.status,
                        schedule: e.record.schedule,
                        poolUid: e.record.poolUid,
                        settings: e.record.settings,
                    });
                }
            });
        });
    }
    addTask(task) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const service = yield this._pocketbase
                .collection('services')
                .getFirstListItem(`uid="${task.serviceUid}"`);
            const record = yield this._pocketbase.collection('tasks').create({
                uid: task.uid,
                name: task.name,
                type: task.type,
                state: null,
                status: null,
                schedule: task.schedule,
                poolUid: task.poolUid,
                settings: task.settings,
                service: service.id,
            });
            resolve(task);
        }));
    }
    taskResults(taskUid, cb) { }
    setTaskResult(taskResult) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFHdEMsT0FBTyxpQkFBaUIsTUFBTSx1QkFBdUIsQ0FBQztBQVN0RCxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUVqQyxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUNqQixTQUFRLGlCQUFpQjtJQU16QixZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFSyxLQUFLLENBQUMsRUFBWTs7WUFDcEIsa0JBQWtCO1lBQ2xCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUNuRSxJQUFJLEVBQUUsT0FBTztnQkFDYiw2Q0FBNkM7YUFDaEQsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDekMsRUFBRSxDQUFDO29CQUNDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztvQkFDZixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7b0JBQ2pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQkFDakIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO29CQUNu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