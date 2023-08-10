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
export default class SDobbyP2pAdapter extends __SDobbyPool {
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
        // console.log('set', this.settings);
        // start GunJS
        this._gun = __gun
            .default([
            'http://localhost:8765/gun',
            'https://gun-manhattan.herokuapp.com/gun',
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
     * @return      {Promise<ISDobbyConfig>}            A promise resolved once the config is loaded successfully
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadConfig() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const sampleTask = {
                uid: 'florimont.florimont-website.responseTime',
                type: 'responseTime',
                name: 'Response time',
                schedule: null,
            };
            // const pair = await __gun.default.SEA.pair();
            // if (this.settings.privateKey) {
            //     data = await __gun.default.SEA.encrypt(
            //         data,
            //         this.settings.privateKey,
            //     );
            // }
            // const data = await __gun.default.SEA.sign(enc, pair);
            // const msg = await __gun.default.SEA.verify(data, pair.pub);
            // const dec = await __gun.default.SEA.decrypt(enc, {
            //     epriv: pair.epriv,
            // });
            // const proof = await __gun.default.SEA.work(dec, pair);
            // const check = await __gun.default.SEA.work(d, pair);
            // console.log(dec);
            // console.log(proof === check);
            yield this._gun.get('tasks').put(null);
            this._gun
                .get('tasks')
                .map()
                .on((task) => {
                delete task._;
                console.log('__tasks', task);
            });
            this._gun.get('tasks').get(sampleTask.uid).put(sampleTask);
            // const configPath = `${this.settings.rootDir}/${uid}.config.json`;
            // if (!__fs.existsSync(configPath)) {
            //     return resolve({
            //         tasks: {},
            //     });
            // }
            // const config = __readJsonSync(configPath);
            // resolve(config);
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
    saveConfig(uid, config) {
        return new Promise((resolve) => {
            // const configPath = `${this.settings.rootDir}/${uid}.config.json`;
            // __writeJsonSync(configPath, config);
            resolve({});
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxDQUFDO0FBRTdCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFpQixFQUViLDBCQUEwQixHQUM3QixNQUFNLGVBQWUsQ0FBQztBQVF2Qjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQ2pCLFNBQVEsWUFBWTtJQU9wQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQWUsRUFDZixTQUE4QixFQUM5QixRQUFpQztRQUVqQyxLQUFLLENBQ0QsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLENBQ1AsUUFBUSxDQUFDLGVBQWUsQ0FBQywwQkFBMEIsQ0FBQyxFQUNwRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLHFDQUFxQztRQUVyQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLO2FBQ1osT0FBTyxDQUFDO1lBQ0wsMkJBQTJCO1lBQzNCLHlDQUF5QztTQUM1QyxDQUFDO2FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxVQUFVLEdBQUc7Z0JBQ2YsR0FBRyxFQUFFLDBDQUEwQztnQkFDL0MsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTthQUNqQixDQUFDO1lBRUYsK0NBQStDO1lBRS9DLGtDQUFrQztZQUNsQyw4Q0FBOEM7WUFDOUMsZ0JBQWdCO1lBQ2hCLG9DQUFvQztZQUNwQyxTQUFTO1lBQ1QsSUFBSTtZQUVKLHdEQUF3RDtZQUN4RCw4REFBOEQ7WUFDOUQscURBQXFEO1lBQ3JELHlCQUF5QjtZQUN6QixNQUFNO1lBQ04seURBQXlEO1lBQ3pELHVEQUF1RDtZQUV2RCxvQkFBb0I7WUFDcEIsZ0NBQWdDO1lBRWhDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxJQUFJO2lCQUNKLEdBQUcsQ0FBQyxPQUFPLENBQUM7aUJBQ1osR0FBRyxFQUFFO2lCQUNMLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNULE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTNELG9FQUFvRTtZQUVwRSxzQ0FBc0M7WUFDdEMsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQixVQUFVO1lBQ1YsSUFBSTtZQUVKLDZDQUE2QztZQUM3QyxtQkFBbUI7UUFDdkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVLENBQ04sR0FBVyxFQUNYLE1BQXFCO1FBRXJCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixvRUFBb0U7WUFDcEUsdUNBQXVDO1lBQ3ZDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9