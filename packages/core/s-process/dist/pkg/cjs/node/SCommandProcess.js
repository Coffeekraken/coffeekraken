"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SCommandProcessInterface_1 = __importDefault(require("./interface/SCommandProcessInterface"));
const SProcess_1 = __importDefault(require("./SProcess"));
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
class SCommandProcess extends SProcess_1.default {
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, (0, deepMerge_1.default)(settings !== null && settings !== void 0 ? settings : {}, {
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
        const set = (0, deepMerge_1.default)(this.settings, settings !== null && settings !== void 0 ? settings : {});
        // @ts-ignore
        const finalParams = SCommandProcessInterface_1.default.apply(params);
        return (0, spawn_1.default)(finalParams.command, [], Object.assign({ returnValueOnly: true }, set.spawnSettings));
    }
}
exports.default = SCommandProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUZBQTZEO0FBQzdELDRGQUFzRTtBQUN0RSxvR0FBOEU7QUFNOUUsMERBQW9DO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxhQUFhO0FBQ2IsTUFBcUIsZUFBZ0IsU0FBUSxrQkFBVTtJQUNuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLGFBQStDLEVBQy9DLFFBQTRDO1FBRTVDLEtBQUssQ0FDRCxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxFQUFFLEVBQ25CLElBQUEsbUJBQVcsRUFBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLEVBQUU7WUFDeEIsYUFBYSxFQUFFLEVBQUU7WUFDakIsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxPQUFPLENBQ0gsTUFBdUMsRUFDdkMsUUFBNEM7UUFFNUMsTUFBTSxHQUFHLEdBRVIsSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7UUFFNUMsYUFBYTtRQUNiLE1BQU0sV0FBVyxHQUNiLGtDQUEwQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUEsZUFBTyxFQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxrQkFDbEMsZUFBZSxFQUFFLElBQUksSUFDbEIsR0FBRyxDQUFDLGFBQWEsRUFDdEIsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQXhERCxrQ0F3REMifQ==