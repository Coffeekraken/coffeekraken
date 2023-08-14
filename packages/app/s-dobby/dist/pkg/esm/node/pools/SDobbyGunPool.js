var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSpecs from '@coffeekraken/s-specs';
import __SDobbyPool from '../SDobbyPool.js';
import * as __gun from 'gun';
import 'gun/lib/open.js';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { SDobbyGunPoolSettingsSpecs, } from '../exports.js';
/**
 * @name                SDobbyGunPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyPool
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyGunPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyGunAdapter extends __SDobbyPool {
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
        super(dobby, poolMetas, __deepMerge(__SSpecs.extractDefaults(SDobbyGunPoolSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
        // start GunJS
        this._gun = __gun
            .default([
            'http://localhost:8765/gun',
            // 'https://gun-manhattan.herokuapp.com/gun',
        ])
            .get(this.settings.gunUid);
    }
    /**
     * @name        loadConfig
     * @type        Function
     * @async
     *
     * Load the configuration
     *
     * @param       {String}            uid             The current dobby process uid
     * @return      {Promise<ISDobbyPoolConfig>}            A promise resolved once the config is loaded successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadConfig() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const config = {
                tasks: {},
            };
            // this._gun.get('tasks').put(null, async () => {
            // this._gun.get('tasks').once((task) => {
            //     console.log('TASKSSSSS', task);
            //     resolve(config);
            // });
            yield this._gun
                .get('tasks')
                .map()
                .open((task) => {
                delete task._;
                config.tasks[task.uid] = task;
                this.events.emit('pool.task.add', task);
            });
            // });
            resolve(config);
            // const sampleTask = {
            //     uid: 'florimont.florimont-website.responseTime',
            //     type: 'responseTime',
            //     name: 'Response time',
            //     state: 'active',
            //     status: 'idle',
            //     schedule: '*/5 * * * * *',
            //     settings: {
            //         url: 'https://postcss.coffeekraken.io',
            //         timeout: 2000,
            //     },
            //     poolUid: 'gun',
            //     reporter: {
            //         type: 'pocketbase',
            //         name: 'Pocketbase',
            //         settings: {
            //             url: 'http://127.0.0.1:8090',
            //             collection: 'tasksResults',
            //         },
            //     },
            // };
            // await this._gun.get('tasks').put(null);
            // await this._gun.get('tasks').get(sampleTask.uid).put(sampleTask);
        }));
    }
    /**
     * @name        saveConfig
     * @type        Function
     * @async
     *
     * Save the configuration
     *
     * @param       {String}            uid             The current dobby process uid
     * @return      {Promise<void>}                     A promise resolved once the config is successfully saved
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    saveConfig() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield this._gun.get('tasks').put(this.config.tasks);
            resolve({});
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzdCLE9BQU8saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBUXpELE9BQWlCLEVBRWIsMEJBQTBCLEdBQzdCLE1BQU0sZUFBZSxDQUFDO0FBRXZCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFDakIsU0FBUSxZQUFZO0lBT3BCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFNBQThCLEVBQzlCLFFBQWlDO1FBRWpDLEtBQUssQ0FDRCxLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsQ0FDUCxRQUFRLENBQUMsZUFBZSxDQUFDLDBCQUEwQixDQUFDLEVBQ3BELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsY0FBYztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSzthQUNaLE9BQU8sQ0FBQztZQUNMLDJCQUEyQjtZQUMzQiw2Q0FBNkM7U0FDaEQsQ0FBQzthQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sTUFBTSxHQUFzQjtnQkFDOUIsS0FBSyxFQUFFLEVBQUU7YUFDWixDQUFDO1lBRUYsaURBQWlEO1lBRWpELDBDQUEwQztZQUMxQyxzQ0FBc0M7WUFDdEMsdUJBQXVCO1lBQ3ZCLE1BQU07WUFDTixNQUFNLElBQUksQ0FBQyxJQUFJO2lCQUNWLEdBQUcsQ0FBQyxPQUFPLENBQUM7aUJBQ1osR0FBRyxFQUFFO2lCQUNMLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU07WUFFTixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEIsdUJBQXVCO1lBQ3ZCLHVEQUF1RDtZQUN2RCw0QkFBNEI7WUFDNUIsNkJBQTZCO1lBQzdCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsaUNBQWlDO1lBQ2pDLGtCQUFrQjtZQUNsQixrREFBa0Q7WUFDbEQseUJBQXlCO1lBQ3pCLFNBQVM7WUFDVCxzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLDhCQUE4QjtZQUM5Qiw4QkFBOEI7WUFDOUIsc0JBQXNCO1lBQ3RCLDRDQUE0QztZQUM1QywwQ0FBMEM7WUFDMUMsYUFBYTtZQUNiLFNBQVM7WUFDVCxLQUFLO1lBQ0wsMENBQTBDO1lBQzFDLG9FQUFvRTtRQUN4RSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9