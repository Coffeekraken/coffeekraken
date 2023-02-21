"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const SCommandProcessInterface_1 = __importDefault(require("./interface/SCommandProcessInterface"));
const SProcess_1 = __importDefault(require("./SProcess"));
/**
 * @name            SCommandProcess
 * @namespace       node
 * @type            Class
 * @extends         SProcess
 * @platform        node
 * @status          beta
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, (0, object_1.__deepMerge)(settings !== null && settings !== void 0 ? settings : {}, {
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
        const set = (0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {});
        // @ts-ignore
        const finalParams = SCommandProcessInterface_1.default.apply(params);
        return (0, process_1.__spawn)(finalParams.command, [], Object.assign({ returnValueOnly: true }, set.spawnSettings));
    }
}
exports.default = SCommandProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQXlEO0FBQ3pELHlEQUFzRDtBQUN0RCxvR0FBOEU7QUFNOUUsMERBQW9DO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsYUFBYTtBQUNiLE1BQXFCLGVBQWdCLFNBQVEsa0JBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxhQUErQyxFQUMvQyxRQUE0QztRQUU1QyxLQUFLLENBQ0QsYUFBYSxhQUFiLGFBQWEsY0FBYixhQUFhLEdBQUksRUFBRSxFQUNuQixJQUFBLG9CQUFXLEVBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxFQUFFO1lBQ3hCLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsT0FBTyxDQUNILE1BQXVDLEVBQ3ZDLFFBQTRDO1FBRTVDLE1BQU0sR0FBRyxHQUFHLElBQUEsb0JBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXZELGFBQWE7UUFDYixNQUFNLFdBQVcsR0FDYixrQ0FBMEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0MsT0FBTyxJQUFBLGlCQUFPLEVBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLGtCQUNsQyxlQUFlLEVBQUUsSUFBSSxJQUNsQixHQUFHLENBQUMsYUFBYSxFQUN0QixDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBdERELGtDQXNEQyJ9