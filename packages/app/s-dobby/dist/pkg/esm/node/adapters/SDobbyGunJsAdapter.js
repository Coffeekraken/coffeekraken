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
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import __SDobbyAdapter from '../SDobbyAdapter.js';
import * as __gun from 'gun';
/**
 * @name                SDobbyFsAdapter
 * @namespace           node
 * @type                Class
 * @extends             SDobbyAdapter
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyAdapterSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyP2pAdapter extends __SDobbyAdapter {
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
    constructor(settings) {
        super(__SSpecs.apply(settings !== null && settings !== void 0 ? settings : {}, SDobbyGunJsAdapterSettingsSpecs));
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
    loadConfig(uid) {
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
            const pair = {
                pub: 'pAmFo7JUqxtVAzZn8UZuaIaYjKE_pSyB1fpd9cXHp_E._3TbLKi1W4byQo7v6ZtmZVvcAgkk_Y4FIBm2xwZjvZc',
                priv: '5Mk4bpYdSOOSn4jBU5b7EJx07VO97zwICdBzjIH79So',
                epub: 'anCsQb1ZSk2ck9q6clqN323Zwz3wMwp8S1T74LUDgcw.U9bBHIjSmk113tfJUwTwkpIA5RJU-MqXJKfPB53t4Rc',
                epriv: '3ZYC0Lc0baeM29NRhuCn2BhKj1tGgQoaZDFjdY9AiAI',
            };
            const depair = {
                // pub: 'pAmFo7JUqxtVAzZn8UZuaIaYjKE_pSyB1fpd9cXHp_E._3TbLKi1W4byQo7v6ZtmZVvcAgkk_Y4FIBm2xwZjvZc',
                // epub: 'anCsQb1ZSk2ck9q6clqN323Zwz3wMwp8S1T74LUDgcw.U9bBHIjSmk113tfJUwTwkpIA5RJU-MqXJKfPB53t4Rc',
                epriv: '3ZYC0Lc0baeM29NRhuCn2BhKj1tGgQoaZDFjdY9AiAI',
            };
            // console.log('pair', pair);
            const enc = yield __gun.default.SEA.encrypt(d, pair);
            const data = yield __gun.default.SEA.sign(enc, pair);
            // console.log('Data', data);
            const msg = yield __gun.default.SEA.verify(data, pair.pub);
            const dec = yield __gun.default.SEA.decrypt(enc, depair);
            // const proof = await __gun.default.SEA.work(dec, pair);
            // const check = await __gun.default.SEA.work(d, pair);
            console.log(data);
            console.log(dec);
            // console.log(dec);
            // console.log(proof === check);
            const gConfig = this._gun
                .get(this.settings.key)
                .get('tasks')
                .on((tasks) => {
                console.log('tasks', tasks);
            });
            // gConfig.put(enc);
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
            const configPath = `${this.settings.rootDir}/${uid}.config.json`;
            __writeJsonSync(configPath, config);
            resolve({});
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssQ0FBQztBQVU3Qjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQ2pCLFNBQVEsZUFBZTtJQUt2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWlDO1FBQ3pDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDLENBQUM7UUFFdkUscUNBQXFDO1FBRXJDLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUs7YUFDWixPQUFPLENBQUM7WUFDTCwyQkFBMkI7WUFDM0IseUNBQXlDO1NBQzVDLENBQUM7YUFDRCxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVUsQ0FBQyxHQUFXO1FBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLENBQUMsR0FBRztnQkFDTixLQUFLLEVBQUU7b0JBQ0gsMENBQTBDLEVBQUU7d0JBQ3hDLEdBQUcsRUFBRSwwQ0FBMEM7d0JBQy9DLElBQUksRUFBRSxjQUFjO3dCQUNwQixJQUFJLEVBQUUsZUFBZTt3QkFDckIsUUFBUSxFQUFFLGVBQWU7cUJBQzVCO2lCQUNKO2FBQ0osQ0FBQztZQUVGLCtDQUErQztZQUMvQyxNQUFNLElBQUksR0FBRztnQkFDVCxHQUFHLEVBQUUseUZBQXlGO2dCQUM5RixJQUFJLEVBQUUsNkNBQTZDO2dCQUNuRCxJQUFJLEVBQUUseUZBQXlGO2dCQUMvRixLQUFLLEVBQUUsNkNBQTZDO2FBQ3ZELENBQUM7WUFDRixNQUFNLE1BQU0sR0FBRztnQkFDWCxrR0FBa0c7Z0JBQ2xHLG1HQUFtRztnQkFDbkcsS0FBSyxFQUFFLDZDQUE2QzthQUN2RCxDQUFDO1lBQ0YsNkJBQTZCO1lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsNkJBQTZCO1lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELHlEQUF5RDtZQUN6RCx1REFBdUQ7WUFFdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLG9CQUFvQjtZQUNwQixnQ0FBZ0M7WUFFaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUk7aUJBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDdEIsR0FBRyxDQUFDLE9BQU8sQ0FBQztpQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUVQLG9CQUFvQjtZQUVwQixvRUFBb0U7WUFFcEUsc0NBQXNDO1lBQ3RDLHVCQUF1QjtZQUN2QixxQkFBcUI7WUFDckIsVUFBVTtZQUNWLElBQUk7WUFFSiw2Q0FBNkM7WUFDN0MsbUJBQW1CO1FBQ3ZCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVSxDQUNOLEdBQVcsRUFDWCxNQUFxQjtRQUVyQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLGNBQWMsQ0FBQztZQUNqRSxlQUFlLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9