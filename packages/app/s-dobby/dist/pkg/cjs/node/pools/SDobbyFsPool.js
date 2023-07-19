"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const SDobbyPool_js_1 = __importDefault(require("../SDobbyPool.js"));
const fs_2 = __importDefault(require("fs"));
const specs_js_1 = require("../specs.js");
/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyAdapter
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyFsPool extends SDobbyPool_js_1.default {
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
    constructor(poolMetas, dobby, settings) {
        super(poolMetas, dobby, (0, object_1.__deepMerge)(s_specs_1.default.extractDefaults(specs_js_1.SDobbyFsPoolSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
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
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${this.uid}.config.json`;
            if (!fs_2.default.existsSync(configPath)) {
                return resolve({
                    tasks: {},
                });
            }
            const config = (0, fs_1.__readJsonSync)(configPath);
            resolve(config);
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
    saveConfig() {
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${this.uid}.config.json`;
            (0, fs_1.__writeJsonSync)(configPath, this.config);
            resolve({});
        });
    }
}
exports.default = SDobbyFsPool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLCtDQUF5RTtBQUN6RSx1REFBeUQ7QUFDekQscUVBQTRDO0FBRTVDLDRDQUFzQjtBQVd0QiwwQ0FBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFxQixZQUFhLFNBQVEsdUJBQVk7SUFHbEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxTQUEyQixFQUMzQixLQUFlLEVBQ2YsUUFBOEI7UUFFOUIsS0FBSyxDQUNELFNBQVMsRUFDVCxLQUFLLEVBQ0wsSUFBQSxvQkFBVyxFQUNQLGlCQUFRLENBQUMsZUFBZSxDQUFDLG9DQUF5QixDQUFDLEVBQ25ELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUM7WUFFdEUsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sT0FBTyxDQUFDO29CQUNYLEtBQUssRUFBRSxFQUFFO2lCQUNaLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBYyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDO1lBQ3RFLElBQUEsb0JBQWUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTdFRCwrQkE2RUMifQ==