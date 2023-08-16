var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __pocketbase from 'pocketbase/cjs';
import __SDobbyPool from '../SDobbyPool.js';
global.EventSource = EventSource;
/**
 * @name                SDobbyPocketbasePool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyFeeder
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby feeder.
 *
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyPocketbasePool extends __SDobbyPool {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(dobby, poolMetas, settings) {
        super(dobby, poolMetas, settings);
        console.log('SSSS', this.settings);
        this._pocketbase = new __pocketbase(this.settings.url);
    }
    updateTask(taskUid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('_UP_', data);
            const pbTask = yield this._pocketbase
                .collection(this.settings.tasksCollection)
                .getFirstListItem({
                filter: `uid="${taskUid}"`,
            });
            if (!pbTask)
                throw new Error(`No task found with the uid "${taskUid}"`);
            const newTask = yield this._pocketbase
                .collection(this.settings.tasksCollection)
                .update(pbTask.id, data);
            return newTask;
        });
    }
    loadTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            // actual tasks
            const records = yield this._pocketbase
                .collection(this.settings.tasksCollection)
                .getFullList();
            for (let [idx, record] of records.entries()) {
                this.addTask(record);
            }
            // realtime
            this._pocketbase
                .collection(this.settings.tasksCollection)
                .subscribe('*', function (e) {
                console.log('UPDATE', e);
                if (e.action === 'create') {
                    this.addTask(e.record);
                }
                else if (e.action === 'delete') {
                    this.removeTask(e.record.uid);
                }
                else {
                    if (e.record.state === 'queued') {
                        console.log('EXEVUTE');
                        // this.executeTask(e.record);
                    }
                }
            });
        });
    }
    loadReporters() {
        return __awaiter(this, void 0, void 0, function* () {
            // actual tasks
            const records = yield this._pocketbase
                .collection(this.settings.reportersCollection)
                .getFullList();
            for (let [idx, record] of records.entries()) {
                this.addReporter(record);
            }
            // realtime
            this._pocketbase
                .collection(this.settings.reportersCollection)
                .subscribe('*', function (e) {
                if (e.action === 'delete') {
                    this.removeReporter(e.record.uid);
                }
                else {
                    this.addReporter(e.record);
                }
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBVzVDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFDakIsU0FBUSxZQUFZO0lBT3BCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFNBQTJCLEVBQzNCLFFBQXdDO1FBRXhDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVLLFVBQVUsQ0FDWixPQUFlLEVBQ2YsSUFBK0I7O1lBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVc7aUJBQ2hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztpQkFDekMsZ0JBQWdCLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLFFBQVEsT0FBTyxHQUFHO2FBQzdCLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQyxNQUFNO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFFeEUsTUFBTSxPQUFPLEdBQXFCLE1BQU0sSUFBSSxDQUFDLFdBQVc7aUJBQ25ELFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztpQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBRUssU0FBUzs7WUFDWCxlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVztpQkFDakMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO2lCQUN6QyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hCO1lBRUQsV0FBVztZQUNYLElBQUksQ0FBQyxXQUFXO2lCQUNYLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztpQkFDekMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV6QixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO29CQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDMUI7cUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQztxQkFBTTtvQkFDSCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdkIsOEJBQThCO3FCQUNqQztpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztLQUFBO0lBRUssYUFBYTs7WUFDZixlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVztpQkFDakMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7aUJBQzdDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUI7WUFFRCxXQUFXO1lBQ1gsSUFBSSxDQUFDLFdBQVc7aUJBQ1gsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7aUJBQzdDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO2dCQUN2QixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO29CQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3JDO3FCQUFNO29CQUNILElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztLQUFBO0NBQ0oifQ==