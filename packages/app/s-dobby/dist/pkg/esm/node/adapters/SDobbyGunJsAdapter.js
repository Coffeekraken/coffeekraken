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
export const SDobbyGunJsAdapterSettingsSpecs = {
    type: 'Object',
    title: 'SDobby Gun JS adapter settings',
    description: 'Specify the SDobby Gun JS adapter settings',
    props: {
        key: {
            type: 'String',
            title: 'Gun JS storage key',
            description: 'Specify the Gun JS storage key',
            required: true,
        },
    },
};
export default class SDobbyFsAdapter extends __SDobbyAdapter {
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
            'http://localhost:8765/gun1',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBa0IsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHekUsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFFbEQsT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLENBQUM7QUFZN0I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRztJQUMzQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxnQ0FBZ0M7SUFDdkMsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFDakIsU0FBUSxlQUFlO0lBS3ZCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBaUM7UUFDekMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxFQUFFLCtCQUErQixDQUFDLENBQUMsQ0FBQztRQUV2RSxxQ0FBcUM7UUFFckMsY0FBYztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSzthQUNaLE9BQU8sQ0FBQztZQUNMLDRCQUE0QjtZQUM1Qix5Q0FBeUM7U0FDNUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVSxDQUFDLEdBQVc7UUFDbEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFP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