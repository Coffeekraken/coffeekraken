"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const SDobbyPool_js_1 = __importDefault(require("../SDobbyPool.js"));
const path_1 = require("@coffeekraken/sugar/path");
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
    constructor(dobby, poolMetas, settings) {
        super(dobby, poolMetas, (0, object_1.__deepMerge)(s_specs_1.default.extractDefaults(specs_js_1.SDobbyFsPoolSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
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
            const configPath = `${this.settings.folder.replace(/^\~/, `${(0, path_1.__homeDir)()}`)}/${this.uid}.tasks.json`;
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
            const configPath = `${this.settings.folder.replace(/^\~/, `${(0, path_1.__homeDir)()}`)}/${this.uid}.tasks.json`;
            (0, fs_1.__writeJsonSync)(configPath, this.config);
            resolve({});
        });
    }
}
exports.default = SDobbyFsPool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLCtDQUF5RTtBQUN6RSx1REFBeUQ7QUFDekQscUVBQTRDO0FBRTVDLG1EQUFxRDtBQUVyRCw0Q0FBc0I7QUFXdEIsMENBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBcUIsWUFBYSxTQUFRLHVCQUFZO0lBR2xEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFNBQTJCLEVBQzNCLFFBQWdDO1FBRWhDLEtBQUssQ0FDRCxLQUFLLEVBQ0wsU0FBUyxFQUNULElBQUEsb0JBQVcsRUFDUCxpQkFBUSxDQUFDLGVBQWUsQ0FBQyxvQ0FBeUIsQ0FBQyxFQUNuRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM5QyxLQUFLLEVBQ0wsR0FBRyxJQUFBLGdCQUFTLEdBQUUsRUFBRSxDQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUUzQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxPQUFPLENBQUM7b0JBQ1gsS0FBSyxFQUFFLEVBQUU7aUJBQ1osQ0FBQyxDQUFDO2FBQ047WUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFjLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFFMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzlDLEtBQUssRUFDTCxHQUFHLElBQUEsZ0JBQVMsR0FBRSxFQUFFLENBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQzNCLElBQUEsb0JBQWUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQW5GRCwrQkFtRkMifQ==