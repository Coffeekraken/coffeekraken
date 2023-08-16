"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const cjs_1 = __importDefault(require("pocketbase/cjs"));
const eventsource_1 = __importDefault(require("eventsource"));
const SherlockAdapter_js_1 = __importDefault(require("../SherlockAdapter.js"));
global.EventSource = eventsource_1.default;
class SherlockPocketbaseAdapter extends SherlockAdapter_js_1.default {
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        this._pocketbase = new cjs_1.default(this.settings.url);
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
            const records = yield this._pocketbase.collection('tasks').getFullList({
                sort: '-name',
                filter: `service.uid="${serviceUid}"`,
            });
            for (let [idx, record] of records.entries()) {
                cb({
                    uid: record.uid,
                    name: record.name,
                    type: record.type,
                    state: record.state,
                    schedule: record.schedule,
                    poolUid: record.poolUid,
                    serviceUid: record.service.uid,
                    settings: record.settings,
                });
            }
            // realtime
            this._pocketbase.collection('tasks').subscribe('*', (e) => __awaiter(this, void 0, void 0, function* () {
                console.log('UPDATE', e);
                if (e.action !== 'delete') {
                    const service = yield this._pocketbase
                        .collection('services')
                        .getFirstListItem(`uid="${serviceUid}"`);
                    console.log('SE', service);
                    // filter our events that are not for the current service
                    if (!service || service.uid !== serviceUid)
                        return;
                    cb({
                        uid: e.record.uid,
                        name: e.record.name,
                        type: e.record.type,
                        state: e.record.state,
                        schedule: e.record.schedule,
                        poolUid: e.record.poolUid,
                        serviceUid: e.record.service,
                        settings: e.record.settings,
                    });
                }
            }));
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
                state: task.schedule ? 'active' : 'idle',
                schedule: task.schedule,
                poolUid: task.poolUid,
                reporterUid: task.reporterUid,
                settings: task.settings,
                service: service.id,
            });
            resolve(task);
        }));
    }
    startTask(taskUid) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const task = yield this._pocketbase
                .collection('tasks')
                .getFirstListItem(`uid="${taskUid}"`);
            console.log('RASKkksksksksks', task);
            const record = yield this._pocketbase
                .collection('tasks')
                .update(task.id, {
                state: 'queued',
            });
            console.log('Reso___', record);
            resolve(taskUid);
        }));
    }
    taskResults(taskUid, cb) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const task = yield this._pocketbase
                .collection('tasks')
                .getFirstListItem(`uid="${taskUid}"`);
            const record = yield this._pocketbase
                .collection('tasks')
                .update(task.id, {
                state: 'paused',
            });
            resolve(taskUid);
        }));
    }
    setTaskResult(taskResult) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { }));
    }
}
exports.default = SherlockPocketbaseAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXlEO0FBRXpELHlEQUEwQztBQUUxQyw4REFBc0M7QUFHdEMsK0VBQXNEO0FBU3RELE1BQU0sQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQztBQUVqQyxNQUFxQix5QkFDakIsU0FBUSw0QkFBaUI7SUFNekIsWUFBWSxRQUE0QztRQUNwRCxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxhQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUssS0FBSyxDQUFDLEVBQVk7O1lBQ3BCLGtCQUFrQjtZQUNsQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFDbkUsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsNkNBQTZDO2FBQ2hELENBQUMsQ0FBQztZQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3pDLEVBQUUsQ0FBQztvQkFDQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7b0JBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO29CQUNqQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7b0JBQ2pCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztvQkFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7b0JBQ3pCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztv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