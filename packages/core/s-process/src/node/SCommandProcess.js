"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
class SCommandProcess extends __SProcess {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbW1hbmRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbW1hbmRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsNEZBQXNFO0FBQ3RFLG9HQUE4RTtBQUM5RSxtRkFFZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILGFBQWE7QUFDYixNQUFxQixlQUFnQixTQUFRLFVBQVU7SUFtQnJEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBK0MsRUFDL0MsUUFBZ0Q7UUFFaEQsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRSxFQUFFO1NBQ25CLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxFQUNkO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1NBQ0YsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBMUNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3hCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDOUMsQ0FBQztJQWdDRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE9BQU8sQ0FDTCxNQUFXLEVBQ1gsUUFBNEM7UUFFNUMsTUFBTSxHQUFHLEdBQTZCLENBQ3BDLG1CQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN6RCxDQUFDO1FBQ0YsT0FBTyxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLGtCQUMvQixlQUFlLEVBQUUsSUFBSSxJQUNsQixHQUFHLENBQUMsYUFBYSxFQUNwQixDQUFDO0lBQ0wsQ0FBQzs7QUEzRUgsa0NBNEVDO0FBM0VRLDBCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFLGtDQUEwQjtDQUNuQyxDQUFDIn0=