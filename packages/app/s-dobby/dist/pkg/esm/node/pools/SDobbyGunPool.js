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
            .get('development');
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
            const d = {
                tasks: {
                    'florimont.florimont-website.responseTime': {
                        uid: 'florimont.florimont-website.responseTime',
                        type: 'responseTime',
                        name: 'Response time',
                        schedule: '*/5 * * * * *',
                    },
                },
            };
            // const pair = await __gun.default.SEA.pair();
            let data = d;
            if (this.settings.privateKey) {
                data = yield __gun.default.SEA.encrypt(data, this.settings.privateKey);
            }
            // const data = await __gun.default.SEA.sign(enc, pair);
            // const msg = await __gun.default.SEA.verify(data, pair.pub);
            // const dec = await __gun.default.SEA.decrypt(enc, {
            //     epriv: pair.epriv,
            // });
            // const proof = await __gun.default.SEA.work(dec, pair);
            // const check = await __gun.default.SEA.work(d, pair);
            console.log(data);
            // console.log(dec);
            // console.log(proof === check);
            const gConfig = this._gun
                .get(this.settings.gunUid)
                .get('tasks')
                .on((tasks) => {
                console.log('tasks', tasks);
            });
            gConfig.put(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxDQUFDO0FBRTdCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFpQixFQUViLDBCQUEwQixHQUM3QixNQUFNLGVBQWUsQ0FBQztBQVF2Qjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQ2pCLFNBQVEsWUFBWTtJQU9wQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQWUsRUFDZixTQUE4QixFQUM5QixRQUFpQztRQUVqQyxLQUFLLENBQ0QsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLENBQ1AsUUFBUSxDQUFDLGVBQWUsQ0FBQywwQkFBMEIsQ0FBQyxFQUNwRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLHFDQUFxQztRQUVyQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLO2FBQ1osT0FBTyxDQUFDO1lBQ0wsMkJBQTJCO1lBQzNCLHlDQUF5QztTQUM1QyxDQUFDO2FBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHO2dCQUNOLEtBQUssRUFBRTtvQkFDSCwwQ0FBMEMsRUFBRTt3QkFDeEMsR0FBRyxFQUFFLDBDQUEwQzt3QkFDL0MsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLElBQUksRUFBRSxlQUFlO3dCQUNyQixRQUFRLEVBQUUsZUFBZTtxQkFDNUI7aUJBQ0o7YUFDSixDQUFDO1lBRUYsK0NBQStDO1lBRS9DLElBQUksSUFBSSxHQUFRLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUMxQixJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQ2xDLElBQUksRUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQzthQUNMO1lBRUQsd0RBQXdEO1lBQ3hELDhEQUE4RDtZQUM5RCxxREFBcUQ7WUFDckQseUJBQXlCO1lBQ3pCLE1BQU07WUFDTix5REFBeUQ7WUFDekQsdURBQXVEO1lBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEIsb0JBQW9CO1lBQ3BCLGdDQUFnQztZQUVoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSTtpQkFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDO2lCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBRVAsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsQixvRUFBb0U7WUFFcEUsc0NBQXNDO1lBQ3RDLHVCQUF1QjtZQUN2QixxQkFBcUI7WUFDckIsVUFBVTtZQUNWLElBQUk7WUFFSiw2Q0FBNkM7WUFDN0MsbUJBQW1CO1FBQ3ZCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVSxDQUNOLEdBQVcsRUFDWCxNQUFxQjtRQUVyQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0Isb0VBQW9FO1lBQ3BFLHVDQUF1QztZQUN2QyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==