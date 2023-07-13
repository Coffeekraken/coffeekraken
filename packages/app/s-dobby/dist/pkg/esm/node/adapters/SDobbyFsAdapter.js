import __SSpecs from '@coffeekraken/s-specs';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { homedir } from 'os';
import __SDobbyAdapter from '../SDobbyAdapter.js';
import __fs from 'fs';
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
export const SDobbyFsAdapterSettingsSpecs = {
    type: 'Object',
    title: 'SDobby FS adapter settings',
    description: 'Specify the SDobby FS adapter settings',
    props: {
        rootDir: {
            type: 'String',
            title: 'Root directory',
            description: 'Specify where to save the SDobby configurations',
            default: `${homedir()}/.dobby`,
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
        super(__deepMerge(__SSpecs.extractDefaults(SDobbyFsAdapterSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
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
            if (!__fs.existsSync(configPath)) {
                return resolve({
                    tasks: {},
                });
            }
            const config = __readJsonSync(configPath);
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
            __writeJsonSync(configPath, config);
            resolve({});
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDN0IsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFFbEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBVXRCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUc7SUFDeEMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLFdBQVcsRUFBRSx3Q0FBd0M7SUFDckQsS0FBSyxFQUFFO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLFdBQVcsRUFBRSxpREFBaUQ7WUFDOUQsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVM7U0FDakM7S0FDSjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxPQUFPLGVBQ2pCLFNBQVEsZUFBZTtJQUt2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWlDO1FBQ3pDLEtBQUssQ0FDRCxXQUFXLENBQ1AsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxFQUN0RCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVLENBQUMsR0FBVztRQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLGNBQWMsQ0FBQztZQUVqRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxPQUFPLENBQUM7b0JBQ1gsS0FBSyxFQUFFLEVBQUU7aUJBQ1osQ0FBQyxDQUFDO2FBQ047WUFFRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVUsQ0FDTixHQUFXLEVBQ1gsTUFBcUI7UUFFckIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksR0FBRyxjQUFjLENBQUM7WUFDakUsZUFBZSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==