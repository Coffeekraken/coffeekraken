"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedStdio_1 = __importDefault(require("./blessed/SBlessedStdio"));
const STerminalStdio_1 = __importDefault(require("./terminal/STerminalStdio"));
const class_1 = __importDefault(require("../../shared/is/class"));
const path_1 = __importDefault(require("../../shared/is/path"));
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
exports.default = (sources, stdio = 'inherit', settings = {}) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUFzRDtBQUN0RCwrRUFBeUQ7QUFDekQsa0VBQThDO0FBQzlDLGdFQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsa0JBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBYSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELElBQUksYUFBa0IsQ0FBQztJQUV2QixJQUFJLGVBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQixhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzlDO1NBQU0sSUFBSSxjQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2hDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUM7UUFDekIsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM1QztTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFVBQVU7Z0JBQ2IsYUFBYSxHQUFHLElBQUksd0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLGFBQWEsR0FBRyxJQUFJLHVCQUFlLENBQUMsT0FBTyxrQ0FDdEMsUUFBUSxLQUNYLE1BQU0sRUFBRSxJQUFJLElBQ1osQ0FBQztnQkFDSCxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO0tBQ0Y7SUFFRCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDLENBQUMifQ==