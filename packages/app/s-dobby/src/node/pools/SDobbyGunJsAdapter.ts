import __SSpecs from '@coffeekraken/s-specs';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import __SDobbyAdapter from '../SDobbyAdapter.js';

import * as __gun from 'gun';

import { ISDobbyP2pPoolSettings } from '../../shared/types.js';
import type {
    ISDobbyAdapter,
    ISDobbyAdapterSettings,
    ISDobbyConfig,
    ISDobbySaveConfigResult,
} from './types';

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

export default class SDobbyP2pAdapter
    extends __SDobbyAdapter
    implements ISDobbyAdapter
{
    settings: ISDobbyP2pPoolSettings;

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
    constructor(settings?: ISDobbyAdapterSettings) {
        super(__SSpecs.apply(settings ?? {}, SDobbyGunJsAdapterSettingsSpecs));

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
    loadConfig(uid: string): Promise<ISDobbyConfig> {
        return new Promise(async (resolve) => {
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
            const enc = await __gun.default.SEA.encrypt(d, pair);
            const data = await __gun.default.SEA.sign(enc, pair);
            // console.log('Data', data);
            const msg = await __gun.default.SEA.verify(data, pair.pub);
            const dec = await __gun.default.SEA.decrypt(enc, depair);
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
        });
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
    saveConfig(
        uid: string,
        config: ISDobbyConfig,
    ): Promise<ISDobbySaveConfigResult> {
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${uid}.config.json`;
            __writeJsonSync(configPath, config);
            resolve({});
        });
    }
}
