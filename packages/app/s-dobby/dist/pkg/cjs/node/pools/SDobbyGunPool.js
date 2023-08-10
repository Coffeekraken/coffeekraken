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
const SDobbyPool_js_1 = __importDefault(require("../SDobbyPool.js"));
const __gun = __importStar(require("gun"));
const object_1 = require("@coffeekraken/sugar/object");
const exports_js_1 = require("../exports.js");
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
class SDobbyP2pAdapter extends SDobbyPool_js_1.default {
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
        super(dobby, poolMetas, (0, object_1.__deepMerge)(s_specs_1.default.extractDefaults(exports_js_1.SDobbyGunPoolSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
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
exports.default = SDobbyP2pAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MscUVBQTRDO0FBRTVDLDJDQUE2QjtBQUU3Qix1REFBeUQ7QUFFekQsOENBR3VCO0FBUXZCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBcUIsZ0JBQ2pCLFNBQVEsdUJBQVk7SUFPcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxLQUFlLEVBQ2YsU0FBOEIsRUFDOUIsUUFBaUM7UUFFakMsS0FBSyxDQUNELEtBQUssRUFDTCxTQUFTLEVBQ1QsSUFBQSxvQkFBVyxFQUNQLGlCQUFRLENBQUMsZUFBZSxDQUFDLHVDQUEwQixDQUFDLEVBQ3BELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYscUNBQXFDO1FBRXJDLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUs7YUFDWixPQUFPLENBQUM7WUFDTCwyQkFBMkI7WUFDM0IseUNBQXlDO1NBQzVDLENBQUM7YUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVTtRQUNOLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLFVBQVUsR0FBRztnQkFDZixHQUFHLEVBQUUsMENBQTBDO2dCQUMvQyxJQUFJLEVBQUUsY0FBYztnQkFDcEIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCLENBQUM7WUFFRiwrQ0FBK0M7WUFFL0Msa0NBQWtDO1lBQ2xDLDhDQUE4QztZQUM5QyxnQkFBZ0I7WUFDaEIsb0NBQW9DO1lBQ3BDLFNBQVM7WUFDVCxJQUFJO1lBRUosd0RBQXdEO1lBQ3hELDhEQUE4RDtZQUM5RCxxREFBcUQ7WUFDckQseUJBQXlCO1lBQ3pCLE1BQU07WUFDTix5REFBeUQ7WUFDekQsdURBQXVEO1lBRXZELG9CQUFvQjtZQUNwQixnQ0FBZ0M7WUFFaEMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLElBQUk7aUJBQ0osR0FBRyxDQUFDLE9BQU8sQ0FBQztpQkFDWixHQUFHLEVBQUU7aUJBQ0wsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFM0Qsb0VBQW9FO1lBRXBFLHNDQUFzQztZQUN0Qyx1QkFBdUI7WUFDdkIscUJBQXFCO1lBQ3JCLFVBQVU7WUFDVixJQUFJO1lBRUosNkNBQTZDO1lBQzdDLG1CQUFtQjtRQUN2QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVUsQ0FDTixHQUFXLEVBQ1gsTUFBcUI7UUFFckIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLG9FQUFvRTtZQUNwRSx1Q0FBdUM7WUFDdkMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBcklELG1DQXFJQyJ9