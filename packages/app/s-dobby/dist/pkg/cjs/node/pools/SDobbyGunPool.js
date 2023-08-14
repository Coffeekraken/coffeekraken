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
require("gun/lib/open.js");
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
class SDobbyGunAdapter extends SDobbyPool_js_1.default {
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
exports.default = SDobbyGunAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MscUVBQTRDO0FBRTVDLDJDQUE2QjtBQUM3QiwyQkFBeUI7QUFFekIsdURBQXlEO0FBUXpELDhDQUd1QjtBQUV2Qjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILE1BQXFCLGdCQUNqQixTQUFRLHVCQUFZO0lBT3BCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFNBQThCLEVBQzlCLFFBQWlDO1FBRWpDLEtBQUssQ0FDRCxLQUFLLEVBQ0wsU0FBUyxFQUNULElBQUEsb0JBQVcsRUFDUCxpQkFBUSxDQUFDLGVBQWUsQ0FBQyx1Q0FBMEIsQ0FBQyxFQUNwRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUs7YUFDWixPQUFPLENBQUM7WUFDTCwyQkFBMkI7WUFDM0IsNkNBQTZDO1NBQ2hELENBQUM7YUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVTtRQUNOLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLE1BQU0sR0FBc0I7Z0JBQzlCLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FBQztZQUVGLGlEQUFpRDtZQUVqRCwwQ0FBMEM7WUFDMUMsc0NBQXNDO1lBQ3RDLHVCQUF1QjtZQUN2QixNQUFNO1lBQ04sTUFBTSxJQUFJLENBQUMsSUFBSTtpQkFDVixHQUFHLENBQUMsT0FBTyxDQUFDO2lCQUNaLEdBQUcsRUFBRTtpQkFDTCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxNQUFNO1lBRU4sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWhCLHVCQUF1QjtZQUN2Qix1REFBdUQ7WUFDdkQsNEJBQTRCO1lBQzVCLDZCQUE2QjtZQUM3Qix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLGlDQUFpQztZQUNqQyxrQkFBa0I7WUFDbEIsa0RBQWtEO1lBQ2xELHlCQUF5QjtZQUN6QixTQUFTO1lBQ1Qsc0JBQXNCO1lBQ3RCLGtCQUFrQjtZQUNsQiw4QkFBOEI7WUFDOUIsOEJBQThCO1lBQzlCLHNCQUFzQjtZQUN0Qiw0Q0FBNEM7WUFDNUMsMENBQTBDO1lBQzFDLGFBQWE7WUFDYixTQUFTO1lBQ1QsS0FBSztZQUNMLDBDQUEwQztZQUMxQyxvRUFBb0U7UUFDeEUsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUEzSEQsbUNBMkhDIn0=