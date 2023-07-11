import { __deepMerge } from '@coffeekraken/sugar/object';
import { __spawn } from '@coffeekraken/sugar/process';
import __SProcess from './SProcess.js';
import __SCommandProcessInterface from './interface/SCommandProcessInterface.js';
/**
 * @name            SCommandProcess
 * @namespace       node
 * @type            Class
 * @extends         SProcess
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent an SProcess started with a simple bash command like "ls -la" or whatever
 *
 * @param       {ISCommandProcessSettings}          [settings={}]           Some settings to configure your command process
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, __deepMerge(settings !== null && settings !== void 0 ? settings : {}, {
            spawnSettings: {},
            runAsChild: false,
        }));
    }
    /**
     * @name          process
     * @type          Function
     * @async
     *
     * Run the actual command through a ```spawn``` call.
     * The spawn function used here is the sugar one stored in "sugar.node.process.spawn"
     *
     * @param         {String}        command         The command you want to execute
     * @param         {ISCommandProcessSettings}      [settings={}]       Some command process settings you want to override
     * @return        {SPromise}                  An SPromise through which you can subscribe for some ```log``` and that will be resolved once the command has ended
     *
     * @since		2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    process(params, settings) {
        const set = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
        // @ts-ignore
        const finalParams = __SCommandProcessInterface.apply(params);
        return __spawn(finalParams.command, [], Object.assign({ returnValueOnly: true }, set.spawnSettings));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNdEQsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sMEJBQTBCLE1BQU0seUNBQXlDLENBQUM7QUFFakY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsYUFBYTtBQUNiLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksYUFBK0MsRUFDL0MsUUFBNEM7UUFFNUMsS0FBSyxDQUNELGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsV0FBVyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsRUFBRTtZQUN4QixhQUFhLEVBQUUsRUFBRTtZQUNqQixVQUFVLEVBQUUsS0FBSztTQUNwQixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE9BQU8sQ0FDSCxNQUF1QyxFQUN2QyxRQUE0QztRQUU1QyxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztRQUV2RCxhQUFhO1FBQ2IsTUFBTSxXQUFXLEdBQ2IsMEJBQTBCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxrQkFDbEMsZUFBZSxFQUFFLElBQUksSUFDbEIsR0FBRyxDQUFDLGFBQWEsRUFDdEIsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9