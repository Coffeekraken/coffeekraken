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
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const fs_1 = require("@coffeekraken/sugar/fs");
const SDobbyAdapter_js_1 = __importDefault(require("../SDobbyAdapter.js"));
const __gun = __importStar(require("gun"));
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
class SDobbyP2pAdapter extends SDobbyAdapter_js_1.default {
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
        super(s_specs_1.default.apply(settings !== null && settings !== void 0 ? settings : {}, SDobbyGunJsAdapterSettingsSpecs));
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
            (0, fs_1.__writeJsonSync)(configPath, config);
            resolve({});
        });
    }
}
exports.default = SDobbyP2pAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsK0NBQXlEO0FBQ3pELDJFQUFrRDtBQUVsRCwyQ0FBNkI7QUFVN0I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxNQUFxQixnQkFDakIsU0FBUSwwQkFBZTtJQUt2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWlDO1FBQ3pDLEtBQUssQ0FBQyxpQkFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDO1FBRXZFLHFDQUFxQztRQUVyQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLO2FBQ1osT0FBTyxDQUFDO1lBQ0wsMkJBQTJCO1lBQzNCLHlDQUF5QztTQUM1QyxDQUFDO2FBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVLENBQUMsR0FBVztRQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxDQUFDLEdBQUc7Z0JBQ04sS0FBSyxFQUFFO29CQUNILDBDQUEwQyxFQUFFO3dCQUN4QyxHQUFHLEVBQUUsMENBQTBDO3dCQUMvQyxJQUFJLEVBQUUsY0FBYzt3QkFDcEIsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLFFBQVEsRUFBRSxlQUFlO3FCQUM1QjtpQkFDSjthQUNKLENBQUM7WUFFRiwrQ0FBK0M7WUFDL0MsTUFBTSxJQUFJLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLHlGQUF5RjtnQkFDOUYsSUFBSSxFQUFFLDZDQUE2QztnQkFDbkQsSUFBSSxFQUFFLHlGQUF5RjtnQkFDL0YsS0FBSyxFQUFFLDZDQUE2QzthQUN2RCxDQUFDO1lBQ0YsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsa0dBQWtHO2dCQUNsRyxtR0FBbUc7Z0JBQ25HLEtBQUssRUFBRSw2Q0FBNkM7YUFDdkQsQ0FBQztZQUNGLDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JELDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RCx5REFBeUQ7WUFDekQsdURBQXVEO1lBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQixvQkFBb0I7WUFDcEIsZ0NBQWdDO1lBRWhDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJO2lCQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7aUJBQ3RCLEdBQUcsQ0FBQyxPQUFPLENBQUM7aUJBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFUCxvQkFBb0I7WUFFcEIsb0VBQW9FO1lBRXBFLHNDQUFzQztZQUN0Qyx1QkFBdUI7WUFDdkIscUJBQXFCO1lBQ3JCLFVBQVU7WUFDVixJQUFJO1lBRUosNkNBQTZDO1lBQzdDLG1CQUFtQjtRQUN2QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVUsQ0FDTixHQUFXLEVBQ1gsTUFBcUI7UUFFckIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksR0FBRyxjQUFjLENBQUM7WUFDakUsSUFBQSxvQkFBZSxFQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFoSUQsbUNBZ0lDIn0=