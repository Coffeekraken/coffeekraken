"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("./SProcess"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SCommandProcessInterface_1 = __importDefault(require("./interface/SCommandProcessInterface"));
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SCommandProcess extends SProcess_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, deepMerge_1.default({
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings) {
        const set = (deepMerge_1.default(this.commandProcessSettings, settings !== null && settings !== void 0 ? settings : {}));
        return spawn_1.default(params.command, [], Object.assign({ returnValueOnly: true }, set.spawnSettings));
    }
}
exports.default = SCommandProcess;
SCommandProcess.interfaces = {
    params: SCommandProcessInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbW1hbmRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbW1hbmRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUEsMERBQW9DO0FBQ3BDLDRGQUFzRTtBQUN0RSxvR0FBOEU7QUFDOUUsbUZBRWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxhQUFhO0FBQ2IsTUFBcUIsZUFBZ0IsU0FBUSxrQkFBVTtJQW1CckQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUErQyxFQUMvQyxRQUFnRDtRQUVoRCxLQUFLLENBQ0gsYUFBYSxhQUFiLGFBQWEsY0FBYixhQUFhLEdBQUksRUFBRSxFQUNuQixtQkFBVyxDQUNUO1lBQ0UsY0FBYyxFQUFFLEVBQUU7U0FDbkIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLEVBQ2Q7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLEtBQUs7YUFDbEI7U0FDRixDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUExQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBZ0NEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsT0FBTyxDQUNMLE1BQVcsRUFDWCxRQUE0QztRQUU1QyxNQUFNLEdBQUcsR0FBNkIsQ0FDcEMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3pELENBQUM7UUFDRixPQUFPLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsa0JBQy9CLGVBQWUsRUFBRSxJQUFJLElBQ2xCLEdBQUcsQ0FBQyxhQUFhLEVBQ3BCLENBQUM7SUFDTCxDQUFDOztBQTNFSCxrQ0E0RUM7QUEzRVEsMEJBQVUsR0FBRztJQUNsQixNQUFNLEVBQUUsa0NBQTBCO0NBQ25DLENBQUMifQ==