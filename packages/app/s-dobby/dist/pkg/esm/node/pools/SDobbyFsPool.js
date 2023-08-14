import __SSpecs from '@coffeekraken/s-specs';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyPool from '../SDobbyPool.js';
import { __homeDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import { SDobbyFsPoolSettingsSpecs } from '../specs.js';
/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyPool
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
export default class SDobbyFsPool extends __SDobbyPool {
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
        super(dobby, poolMetas, __deepMerge(__SSpecs.extractDefaults(SDobbyFsPoolSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
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
        return new Promise((resolve) => {
            const configPath = `${this.settings.folder.replace(/^\~/, `${__homeDir()}`)}/${this.uid}.tasks.json`;
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
    saveConfig() {
        return new Promise((resolve) => {
            const configPath = `${this.settings.folder.replace(/^\~/, `${__homeDir()}`)}/${this.uid}.tasks.json`;
            __writeJsonSync(configPath, this.config);
            resolve({});
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFVdEIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsWUFBWTtJQUdsRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQWUsRUFDZixTQUEyQixFQUMzQixRQUFnQztRQUVoQyxLQUFLLENBQ0QsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLENBQ1AsUUFBUSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUNuRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM5QyxLQUFLLEVBQ0wsR0FBRyxTQUFTLEVBQUUsRUFBRSxDQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxPQUFPLENBQUM7b0JBQ1gsS0FBSyxFQUFFLEVBQUU7aUJBQ1osQ0FBQyxDQUFDO2FBQ047WUFFRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzlDLEtBQUssRUFDTCxHQUFHLFNBQVMsRUFBRSxFQUFFLENBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQzNCLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9