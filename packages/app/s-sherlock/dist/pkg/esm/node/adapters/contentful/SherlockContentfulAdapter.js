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
import * as __contentful from 'contentful';
import * as __contentfulManagement from 'contentful-management';
import __SherlockAdapter from '../SherlockAdapter.js';
export default class SherlockContentfulAdapter extends __SherlockAdapter {
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        // creating the contentful client
        this._client = __contentful.createClient({
            space: this.settings.space,
            accessToken: this.settings.accessToken,
        });
        this._managementClient = __contentfulManagement.createClient({
            accessToken: this.settings.managementAccessToken,
        });
    }
    _processClientFromEntry(entry) {
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
        };
    }
    getPools() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const entries = yield this._client.getEntries({
                content_type: 'client',
            });
            const clients = {};
            entries.items.forEach((entry) => {
                clients[entry.fields.uid] = this._processClientFromEntry(entry);
            });
            resolve(clients);
        }));
    }
    spaceTasks(spaceUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // // current records
            // const records = await this._pocketbase.collection('tasks').getFullList({
            //     sort: '-name',
            //     filter: `service.space.uid="${spaceUid}"`,
            // });
            // for (let [idx, record] of records.entries()) {
            //     cb({
            //         uid: record.uid,
            //         name: record.name,
            //         type: record.type,
            //         state: record.state,
            //         status: record.status,
            //         schedule: record.schedule,
            //         poolUid: record.poolUid,
            //         settings: record.settings,
            //     });
            // }
            // // realtime
            // this._pocketbase
            //     .collection('tasks')
            //     .subscribe(`service.space.uid="${spaceUid}"`, function (e) {
            //         if (e.action !== 'delete') {
            //             cb({
            //                 uid: e.record.uid,
            //                 name: e.record.name,
            //                 type: e.record.type,
            //                 state: e.record.state,
            //                 status: e.record.status,
            //                 schedule: e.record.schedule,
            //                 poolUid: e.record.poolUid,
            //                 settings: e.record.settings,
            //             });
            //         }
            //     });
        });
    }
    clients(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this._client.getEntries({
                content_type: 'client',
            });
            entries.items.forEach((entry) => {
                cb(this._processClientFromEntry(entry));
            });
        });
    }
    _processServiceFromEntry(entry) {
        var _a;
        return {
            uid: entry.fields.uid,
            name: entry.fields.name,
            description: entry.fields.description,
            url: entry.fields.url,
            client: (_a = entry.fields.client) === null || _a === void 0 ? void 0 : _a.uid,
        };
    }
    clientServices(clientUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this._client.getEntries({
                content_type: 'service',
                'fields.client.fields.uid': clientUid,
                'fields.client.sys.contentType.sys.id': 'client',
            });
            entries.items.forEach((entry) => {
                cb(this._processServiceFromEntry(entry));
            });
        });
    }
    clientServicesTasks(clientUid, serviceUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // const entries = await this._client.getEntries({
            //     content_type: 'service',
            //     'fields.client.fields.uid': clientUid,
            //     'fields.client.sys.contentType.sys.id': 'client',
            // });
            // entries.items.forEach((entry) => {
            //     cb(this._processServiceFromEntry(entry));
            // });
        });
    }
    _getEnvironment() {
        return new Promise((resolve) => {
            // This API call will request a space with the specified ID
            this._managementClient
                .getSpace(this.settings.space)
                .then((space) => {
                space.getEnvironment('master').then((environment) => {
                    resolve(environment);
                });
            });
        });
    }
    _processTaskResultFromEntry(entry) {
        return {
            uid: entry.fields.uid,
            taskUid: entry.fields.taskUid,
            data: entry.fields.data,
        };
    }
    taskResults(taskUid, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this._client.getEntries({
                limit: 25,
                content_type: 'taskResult',
                'fields.taskUid': taskUid,
            });
            entries.items.forEach((entry) => {
                cb(this._processTaskResultFromEntry(entry));
            });
        });
    }
    setTaskResult(taskResult) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const environment = yield this._getEnvironment();
            yield environment.createEntryWithId('taskResult', taskResult.uid, {
                fields: {
                    uid: {
                        'en-US': taskResult.uid,
                    },
                    taskUid: {
                        'en-US': taskResult.taskUid,
                    },
                    data: {
                        'en-US': taskResult.data,
                    },
                },
            });
            const entry = yield environment.getEntry(taskResult.uid);
            yield entry.publish();
            resolve(taskResult);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEtBQUssWUFBWSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEtBQUssc0JBQXNCLE1BQU0sdUJBQXVCLENBQUM7QUFHaEUsT0FBTyxpQkFBaUIsTUFBTSx1QkFBdUIsQ0FBQztBQVN0RCxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUNqQixTQUFRLGlCQUFpQjtJQU96QixZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkMsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztZQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzFCLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVc7U0FDekMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLFlBQVksQ0FBQztZQUN6RCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUI7U0FDbkQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHVCQUF1QixDQUFDLEtBQVU7UUFDOUIsT0FBTztZQUNILEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDckIsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUN2QixXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXO1NBQ3hDLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFP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