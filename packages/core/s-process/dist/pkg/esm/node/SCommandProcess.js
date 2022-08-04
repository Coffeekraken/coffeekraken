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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHdDQUF3QyxDQUFDO0FBQzdELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFNOUUsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxhQUErQyxFQUMvQyxRQUE0QztRQUU1QyxLQUFLLENBQ0QsYUFBYSxhQUFiLGFBQWEsY0FBYixhQUFhLEdBQUksRUFBRSxFQUNuQixXQUFXLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxFQUFFO1lBQ3hCLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsT0FBTyxDQUNILE1BQXVDLEVBQ3ZDLFFBQTRDO1FBRTVDLE1BQU0sR0FBRyxHQUVSLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLGFBQWE7UUFDYixNQUFNLFdBQVcsR0FBMkIsMEJBQTBCLENBQUMsS0FBSyxDQUN4RSxNQUFNLENBQ1QsQ0FBQztRQUVGLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxrQkFDbEMsZUFBZSxFQUFFLElBQUksSUFDbEIsR0FBRyxDQUFDLGFBQWEsRUFDdEIsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9