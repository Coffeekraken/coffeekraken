"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedStdio_1 = __importDefault(require("./blessed/SBlessedStdio"));
const STerminalStdio_1 = __importDefault(require("./terminal/STerminalStdio"));
const class_1 = __importDefault(require("../is/class"));
const path_1 = __importDefault(require("../is/path"));
/**
 * @name            stdio
 * @namespace           sugar.node.stdio
 * @type            Function
 * @status              wip
 *
 * This function simply take a SProcess compatible process instance and display the Stdio
 * accordingly to the context where this process is running. If the Stdio is in a childProcess,
 * it will just console.log the log, error, etc... to the terminal but if the
 * process is in the main terminal instance, it will be wrapped inside a blessed box instance
 * and displayed nicely.
 *
 * @param         {SProcess}          proc        The process to display Stdio for
 * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import Stdio from '@coffeekraken/sugar/node/stdio/stdio';
 * import spawn from '@coffeekraken/sugar/node/process/spawn';
 * const proc = spawn('ls -la');
 * Stdio(proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = (sources, stdio, settings = {}) => {
    if (!Array.isArray(sources))
        sources = [sources];
    let stdioInstance;
    if (class_1.default(stdio)) {
        stdioInstance = new stdio(sources, settings);
    }
    else if (path_1.default(stdio, true)) {
        let Cls = require(stdio);
        Cls = Cls.default || Cls;
        stdioInstance = new Cls(sources, settings);
    }
    else if (typeof stdio === 'string') {
        switch (stdio) {
            case 'inherit':
            case 'terminal':
                stdioInstance = new STerminalStdio_1.default(sources, settings);
                break;
            case 'blessed':
                stdioInstance = new SBlessedStdio_1.default(sources, Object.assign(Object.assign({}, settings), { attach: true }));
                break;
            default:
                break;
        }
    }
    return stdioInstance;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUFzRDtBQUN0RCwrRUFBeUQ7QUFDekQsd0RBQW9DO0FBQ3BDLHNEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsa0JBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVqRCxJQUFJLGFBQWtCLENBQUM7SUFFdkIsSUFBSSxlQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEIsYUFBYSxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM5QztTQUFNLElBQUksY0FBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDO1FBQ3pCLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwQyxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxVQUFVO2dCQUNiLGFBQWEsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixhQUFhLEdBQUcsSUFBSSx1QkFBZSxDQUFDLE9BQU8sa0NBQ3RDLFFBQVEsS0FDWCxNQUFNLEVBQUUsSUFBSSxJQUNaLENBQUM7Z0JBQ0gsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtLQUNGO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDIn0=