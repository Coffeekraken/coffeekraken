"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const __contentful = __importStar(require("contentful"));
const __contentfulManagement = __importStar(require("contentful-management"));
const SherlockAdapter_js_1 = __importDefault(require("../SherlockAdapter.js"));
class SherlockContentfulAdapter extends SherlockAdapter_js_1.default {
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
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
exports.default = SherlockContentfulAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBeUQ7QUFDekQseURBQTJDO0FBQzNDLDhFQUFnRTtBQUdoRSwrRUFBc0Q7QUFTdEQsTUFBcUIseUJBQ2pCLFNBQVEsNEJBQWlCO0lBT3pCLFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2QyxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1lBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDMUIsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVztTQUN6QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDO1lBQ3pELFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQjtTQUNuRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsdUJBQXVCLENBQUMsS0FBVTtRQUM5QixPQUFPO1lBQ0gsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3ZCLFdBQVcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVc7U0FDeEMsQ0FBQztJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQzFDLFlBQVksRUFB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