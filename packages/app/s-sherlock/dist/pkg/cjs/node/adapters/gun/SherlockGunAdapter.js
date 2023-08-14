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
const SherlockAdapter_js_1 = __importDefault(require("../SherlockAdapter.js"));
const __gun = __importStar(require("gun"));
class SherlockGunAdapter extends SherlockAdapter_js_1.default {
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        // start GunJS
        this._gun = __gun
            .default([
            'http://localhost:8765/gun',
            'https://gun-manhattan.herokuapp.com/gun',
        ])
            .get(this.settings.gunUid);
        (() => __awaiter(this, void 0, void 0, function* () {
            // this._gun.get('clients').put(null);
            const clients = this._gun.get('clients');
            const florimont = clients.put({
                florimont: {
                    uid: 'florimont',
                    name: 'Florimont',
                    description: 'Florimont school',
                },
            });
            const services = this._gun.get('services');
            const florimontch = services.put({
                'florimont.florimont-ch': {
                    uid: 'florimont-ch',
                    name: 'florimont.ch',
                    description: 'Florimont website',
                    url: 'https://florimont.ch',
                },
            });
            florimont.get('services').set(florimontch);
        }))();
    }
    clients(cb) {
        this._gun
            .get('clients')
            .map((client) => (client === null ? undefined : client))
            .on((client) => {
            delete client._;
            cb(client);
        });
    }
    setClient(client) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const clients = this._gun
                .get(this.settings.gunUid)
                .get('clients')
                .set(client);
            resolve(clients);
        }));
    }
    clientServices(clientUid, cb) {
        const client = this._gun.get('clients').get(clientUid);
        client
            .get('services')
            .map()
            .on((service) => {
            delete service._;
            cb(service);
        });
    }
    // 0clientServiceTasks(clientUid: string, serviceUid: string, cb: Function): void {
    //     const client = this._gun.get('clients').get(clientUid);
    //     const service = client.get('services').get(serviceUid);
    //     service
    //         .get('tasks')
    //         .map()
    //         .on((task) => {
    //             delete task._;
    //             console.log('A', task);
    //             cb(task);
    //         });
    // }
    taskResults(taskUid, cb) {
        const task = this._gun.get('tasks').get(taskUid);
        task.get('results')
            .map()
            .on((taskResult) => {
            delete taskResult._;
            cb(taskResult);
        });
    }
    setTaskResult(taskResult) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const task = this._gun.get('tasks').get(taskResult.taskUid);
            task.get('results').set(taskResult);
            resolve(taskResult);
        }));
    }
}
exports.default = SherlockGunAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBeUQ7QUFHekQsK0VBQXNEO0FBRXRELDJDQUE2QjtBQVE3QixNQUFxQixrQkFDakIsU0FBUSw0QkFBaUI7SUFRekIsWUFBWSxRQUFxQztRQUM3QyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUs7YUFDWixPQUFPLENBQUM7WUFDTCwyQkFBMkI7WUFDM0IseUNBQXlDO1NBQzVDLENBQUM7YUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixDQUFDLEdBQVMsRUFBRTtZQUNSLHNDQUFzQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMxQixTQUFTLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLFdBQVc7b0JBQ2hCLElBQUksRUFBRSxXQUFXO29CQUNqQixXQUFXLEVBQUUsa0JBQWtCO2lCQUNsQzthQUNKLENBQUMsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQzdCLHdCQUF3QixFQUFFO29CQUN0QixHQUFHLEVBQUUsY0FBYztvQkFDbkIsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLFdBQVcsRUFBRSxtQkFBbUI7b0JBQ2hDLEdBQUcsRUFBRSxzQkFBc0I7aUJBQzlCO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFZO1FBQ2hCLElBQUksQ0FBQyxJQUFJO2FBQ0osR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ1gsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUF1QjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUk7aUJBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDekIsR0FBRyxDQUFDLFNBQVMsQ0FBQztpQkFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsTUFBTTthQUNELEdBQUcsQ0FBQyxVQUFVLENBQUM7YUFDZixHQUFHLEVBQUU7YUFDTCxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNaLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsbUZBQW1GO0lBQ25GLDhEQUE4RDtJQUM5RCw4REFBOEQ7SUFDOUQsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixpQkFBaUI7SUFDakIsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3QixzQ0FBc0M7SUFDdEMsd0JBQXdCO0lBQ3hCLGNBQWM7SUFDZCxJQUFJO0lBRUosV0FBVyxDQUFDLE9BQWUsRUFBRSxFQUFZO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUNkLEdBQUcsRUFBRTthQUNMLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2YsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxhQUFhLENBQ1QsVUFBK0I7UUFFL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUExR0QscUNBMEdDIn0=