import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SCommandProcessInterface from './interface/SCommandProcessInterface';
import __SProcess from './SProcess';
/**
 * @name            SCommandProcess
 * @namespace       s-process
 * @type            Class
 * @extends         SProcess
 * @status          wip
 *
 * This class represent an SProcess started with a simple bash command like "ls -la" or whatever
 *
 * @param       {ISCommandProcessCtorSettings}          [settings={}]           Some settings to configure your command process
 *
 * @example         js
 * import { SCommandProcess } from '@coffeekreken/s-process';
 * const commandProcess = new SCommandProcess();
 * commandProcess.run('npm i');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// @ts-ignore
export default class SCommandProcess extends __SProcess {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(initialParams, settings) {
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, __deepMerge({
            commandProcess: {}
        }, settings !== null && settings !== void 0 ? settings : {}, {
            process: {
                runAsChild: false
            }
        }));
    }
    /**
     * @name        commandProcessSettings
     * @type          ISCommandProcessSettings
     * @get
     *
     * Access the command process settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get commandProcessSettings() {
        return this._settings.commandProcess;
    }
    /**
     * @name          process
     * @type          Function
     * @async
     *
     * Run the actual command through a ```spawn``` call.
     * The spawn function used here is the sugar one stored in "sugar.node.process.spawn"
     *
     * @param         {String}        command         The command you want to execute
     * @param         {ISCommandProcessSettings}      [settings={}]       Some command process settings you want to override
     * @return        {SPromise}                  An SPromise through which you can subscribe for some ```log``` and that will be resolved once the command has ended
     *
     * @since		2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    process(params, settings) {
        const set = (__deepMerge(this.commandProcessSettings, settings !== null && settings !== void 0 ? settings : {}));
        return __spawn(params.command, [], Object.assign({ returnValueOnly: true }, set.spawnSettings));
    }
}
SCommandProcess.interfaces = {
    params: __SCommandProcessInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbW1hbmRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbW1hbmRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHdDQUF3QyxDQUFDO0FBQzdELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFLOUUsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFtQnJEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBK0MsRUFDL0MsUUFBZ0Q7UUFFaEQsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsV0FBVyxDQUNUO1lBQ0UsY0FBYyxFQUFFLEVBQUU7U0FDbkIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLEVBQ2Q7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLEtBQUs7YUFDbEI7U0FDRixDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUExQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBZ0NEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsT0FBTyxDQUNMLE1BQVcsRUFDWCxRQUE0QztRQUU1QyxNQUFNLEdBQUcsR0FBNkIsQ0FDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDekQsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxrQkFDL0IsZUFBZSxFQUFFLElBQUksSUFDbEIsR0FBRyxDQUFDLGFBQWEsRUFDcEIsQ0FBQztJQUNMLENBQUM7O0FBMUVNLDBCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFLDBCQUEwQjtDQUNuQyxDQUFDIn0=