"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDobbyFsAdapterSettingsSpecs = void 0;
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const os_1 = require("os");
const SDobbyAdapter_js_1 = __importDefault(require("../SDobbyAdapter.js"));
const fs_2 = __importDefault(require("fs"));
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
exports.SDobbyFsAdapterSettingsSpecs = {
    type: 'Object',
    title: 'SDobby FS adapter settings',
    description: 'Specify the SDobby FS adapter settings',
    props: {
        rootDir: {
            type: 'String',
            title: 'Root directory',
            description: 'Specify where to save the SDobby configurations',
            default: `${(0, os_1.homedir)()}/.dobby`,
        },
    },
};
class SDobbyFsAdapter extends SDobbyAdapter_js_1.default {
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
        super((0, object_1.__deepMerge)(s_specs_1.default.extractDefaults(exports.SDobbyFsAdapterSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
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
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${uid}.config.json`;
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
    saveConfig(uid, config) {
        return new Promise((resolve) => {
            const configPath = `${this.settings.rootDir}/${uid}.config.json`;
            (0, fs_1.__writeJsonSync)(configPath, config);
            resolve({});
        });
    }
}
exports.default = SDobbyFsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9FQUE2QztBQUM3QywrQ0FBeUU7QUFDekUsdURBQXlEO0FBQ3pELDJCQUE2QjtBQUM3QiwyRUFBa0Q7QUFFbEQsNENBQXNCO0FBVXRCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRVUsUUFBQSw0QkFBNEIsR0FBRztJQUN4QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSw0QkFBNEI7SUFDbkMsV0FBVyxFQUFFLHdDQUF3QztJQUNyRCxLQUFLLEVBQUU7UUFDSCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsV0FBVyxFQUFFLGlEQUFpRDtZQUM5RCxPQUFPLEVBQUUsR0FBRyxJQUFBLFlBQU8sR0FBRSxTQUFTO1NBQ2pDO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBcUIsZUFDakIsU0FBUSwwQkFBZTtJQUt2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWlDO1FBQ3pDLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1AsaUJBQVEsQ0FBQyxlQUFlLENBQUMsb0NBQTRCLENBQUMsRUFDdEQsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVSxDQUFDLEdBQVc7UUFDbEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksR0FBRyxjQUFjLENBQUM7WUFFakUsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sT0FBTyxDQUFDO29CQUNYLEtBQUssRUFBRSxFQUFFO2lCQUNaLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBYyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVLENBQ04sR0FBVyxFQUNYLE1BQXFCO1FBRXJCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEdBQUcsY0FBYyxDQUFDO1lBQ2pFLElBQUEsb0JBQWUsRUFBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBNUVELGtDQTRFQyJ9