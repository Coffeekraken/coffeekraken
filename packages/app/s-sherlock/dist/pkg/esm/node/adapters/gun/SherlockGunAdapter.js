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
import __SherlockAdapter from '../SherlockAdapter.js';
import * as __gun from 'gun';
export default class SherlockGunAdapter extends __SherlockAdapter {
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd6RCxPQUFPLGlCQUFpQixNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxDQUFDO0FBUTdCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQ2pCLFNBQVEsaUJBQWlCO0lBUXpCLFlBQVksUUFBcUM7UUFDN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2QyxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLO2FBQ1osT0FBTyxDQUFDO1lBQ0wsMkJBQTJCO1lBQzNCLHlDQUF5QztTQUM1QyxDQUFDO2FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0IsQ0FBQyxHQUFTLEVBQUU7WUFDUixzQ0FBc0M7WUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsU0FBUyxFQUFFO29CQUNQLEdBQUcsRUFBRSxXQUFXO29CQUNoQixJQUFJLEVBQUUsV0FBVztvQkFDakIsV0FBVyxFQUFFLGtCQUFrQjtpQkFDbEM7YUFDSixDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUM3Qix3QkFBd0IsRUFBRTtvQkFDdEIsR0FBRyxFQUFFLGNBQWM7b0JBQ25CLElBQUksRUFBRSxjQUFjO29CQUNwQixXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxHQUFHLEVBQUUsc0JBQXNCO2lCQUM5QjthQUNKLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFRCxPQUFPLENBQUMsRUFBWTtRQUNoQixJQUFJLENBQUMsSUFBSTthQUNKLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDZCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2RCxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNYLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBdUI7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJO2lCQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ3pCLEdBQUcsQ0FBQyxTQUFTLENBQUM7aUJBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQixFQUFFLEVBQVk7UUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU07YUFDRCxHQUFHLENBQUMsVUFBVSxDQUFDO2FBQ2YsR0FBRyxFQUFFO2FBQ0wsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG1GQUFtRjtJQUNuRiw4REFBOEQ7SUFDOUQsOERBQThEO0lBQzlELGNBQWM7SUFDZCx3QkFBd0I7SUFDeEIsaUJBQWlCO0lBQ2pCLDBCQUEwQjtJQUMxQiw2QkFBNkI7SUFDN0Isc0NBQXNDO0lBQ3RDLHdCQUF3QjtJQUN4QixjQUFjO0lBQ2QsSUFBSTtJQUVKLFdBQVcsQ0FBQyxPQUFlLEVBQUUsRUFBWTtRQUNyQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDZCxHQUFHLEVBQUU7YUFDTCxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNmLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsYUFBYSxDQUNULFVBQStCO1FBRS9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=