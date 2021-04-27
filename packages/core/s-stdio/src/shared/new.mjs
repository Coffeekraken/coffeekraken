import __isClass from '@coffeekraken/sugar/shared/is/class';
import __isPath from '@coffeekraken/sugar/node/is/path';
import __isNode from '@coffeekraken/sugar/shared/is/node';
/**
 * @name            new
 * @type            Function
 *
 * This static method is a sugar to instanciate an stdio by specifying some sources,
 * and either a path to a SStdio class, an SStdio class directly or a pre-registered
 * stdio id like:
 * - inherit: If is in node context, will fallback to STerminalStdio, if in browser, in SConsoleStdio
 * - terminal: STerminalStdio (node only)
 * - console: SConsoleStdio (browser only)
 * - blessed: SBlessedStdio (node only)
 *
 * @param         {SProcess}          proc        The process to display Stdio for
 * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SStdio from '@coffeekraken/s-stdio';
 * import spawn from '@coffeekraken/sugar/node/process/spawn';
 * const proc = spawn('ls -la');
 * SStdio.new(proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function _new(sources, stdio = 'inherit', settings = {}) {
    if (!Array.isArray(sources))
        sources = [sources];
    let stdioInstance;
    if (__isClass(stdio)) {
        stdioInstance = new stdio(sources, settings);
    }
    else if (__isNode() && __isPath(stdio, true)) {
        // if (!__isNode())
        //   throw new Error(
        //     `<yellow>[SStdio.new]</<yellow> Sorry but to use a path based stdio, you must be in a <magenta>node</magenta> context...`
        //   );
        // @ts-ignore
        let Cls = require(stdio).default; // eslint-disable-line
        Cls = Cls.default || Cls;
        stdioInstance = new Cls(sources, settings);
    }
    else if (typeof stdio === 'string') {
        switch (stdio) {
            case 'inherit':
                if (__isNode()) {
                    const __STerminalStdio = require('../node/terminal/STerminalStdio')
                        .default; // eslint-disable-line
                    stdioInstance = new __STerminalStdio(sources, settings);
                }
                else {
                    throw new Error(`<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`);
                }
                break;
            case 'terminal':
                if (!__isNode())
                    throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                const __STerminalStdio = require('../node/terminal/STerminalStdio')
                    .default; // eslint-disable-line
                stdioInstance = new __STerminalStdio(sources, settings);
                break;
            case 'blessed':
                if (!__isNode())
                    throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>SBlessedStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                const __SBlessedStdio = require('../node/terminal/SBlessedStdio')
                    .default; // eslint-disable-line
                stdioInstance = new __SBlessedStdio(sources, Object.assign(Object.assign({}, settings), { attach: true }));
                break;
            default:
                break;
        }
    }
    return stdioInstance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXN0ZGlvL3NyYy9zaGFyZWQvbmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBYSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFBSSxhQUFrQixDQUFDO0lBRXZCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsRUFBRSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDOUMsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixnSUFBZ0k7UUFDaEksT0FBTztRQUNQLGFBQWE7UUFDYixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsc0JBQXNCO1FBQ3hELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUN6QixhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzVDO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEMsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxRQUFRLEVBQUUsRUFBRTtvQkFDZCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQzt5QkFDaEUsT0FBTyxDQUFDLENBQUMsc0JBQXNCO29CQUNsQyxhQUFhLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3pEO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0dBQXdHLENBQ3pHLENBQUM7aUJBQ0g7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssVUFBVTtnQkFDYixJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2IsNklBQTZJLENBQzlJLENBQUM7Z0JBQ0osTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUM7cUJBQ2hFLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtnQkFDbEMsYUFBYSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDYiw0SUFBNEksQ0FDN0ksQ0FBQztnQkFDSixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7cUJBQzlELE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtnQkFDbEMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sa0NBQ3RDLFFBQVEsS0FDWCxNQUFNLEVBQUUsSUFBSSxJQUNaLENBQUM7Z0JBQ0gsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtLQUNGO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyJ9