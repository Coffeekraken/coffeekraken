import __isClass from '@coffeekraken/sugar/shared/is/class';
import __isPath from '@coffeekraken/sugar/node/is/path';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __require from '@coffeekraken/sugar/node/esm/require';
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
 * @param       {String}        id          A unique id for your stdio instance
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
 * await SStdio.new('default', proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function _new(id, sources, stdio = 'inherit', settings = {}) {
    if (!Array.isArray(sources))
        sources = [sources];
    let stdioInstance;
    if (__isClass(stdio)) {
        stdioInstance = new stdio(id, sources, settings);
    }
    else if (__isNode() && __isPath(stdio, true)) {
        // if (!__isNode())
        //   throw new Error(
        //     `<yellow>[SStdio.new]</<yellow> Sorry but to use a path based stdio, you must be in a <magenta>node</magenta> context...`
        //   );
        // @ts-ignore
        const Cls = __require(stdio).default;
        stdioInstance = new Cls(id, sources, settings);
    }
    else if (typeof stdio === 'string') {
        switch (stdio) {
            case 'inherit':
                if (__isNode()) {
                    const __STerminalStdio = __require('../node/terminal/STerminalStdio').default;
                    stdioInstance = new __STerminalStdio(id, sources, settings);
                }
                else {
                    throw new Error(`<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`);
                }
                break;
            case 'terminal':
                if (!__isNode())
                    throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                const __STerminalStdio = __require('../node/terminal/STerminalStdio').default;
                stdioInstance = new __STerminalStdio(id, sources, settings);
                break;
            // case 'blessed':
            //   if (!__isNode())
            //     throw new Error(
            //       `<red>[SStdio.new]</<red> Sorry but to use the "<yellow>SBlessedStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`
            //     );
            //   const { default: __SBlessedStdio } = await import('../node/terminal/SBlessedStdio');
            //   stdioInstance = new __SBlessedStdio(sources, {
            //     ...settings,
            //     attach: true
            //   });
            //   break;
            default:
                break;
        }
    }
    return stdioInstance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHNDQUFzQyxDQUFDO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJLENBQ3hCLEVBQVUsRUFDVixPQUFPLEVBQ1AsUUFBYSxTQUFTLEVBQ3RCLFFBQVEsR0FBRyxFQUFFO0lBRWIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFBSSxhQUFrQixDQUFDO0lBRXZCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xCLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3BEO1NBQU0sSUFBSSxRQUFRLEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQzVDLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsZ0lBQWdJO1FBQ2hJLE9BQU87UUFDUCxhQUFhO1FBQ2IsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNyQyxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNsRDtTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ2xDLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxTQUFTO2dCQUNWLElBQUksUUFBUSxFQUFFLEVBQUU7b0JBQ1osTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQzlCLGlDQUFpQyxDQUNwQyxDQUFDLE9BQU8sQ0FBQztvQkFDVixhQUFhLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUMvRDtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUNYLHdHQUF3RyxDQUMzRyxDQUFDO2lCQUNMO2dCQUNELE1BQU07WUFDVixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxNQUFNLElBQUksS0FBSyxDQUNYLDZJQUE2SSxDQUNoSixDQUFDO2dCQUNOLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUM5QixpQ0FBaUMsQ0FDcEMsQ0FBQyxPQUFPLENBQUM7Z0JBQ1YsYUFBYSxHQUFHLElBQUksZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUQsTUFBTTtZQUNWLGtCQUFrQjtZQUNsQixxQkFBcUI7WUFDckIsdUJBQXVCO1lBQ3ZCLHFKQUFxSjtZQUNySixTQUFTO1lBQ1QseUZBQXlGO1lBQ3pGLG1EQUFtRDtZQUNuRCxtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLFFBQVE7WUFDUixXQUFXO1lBQ1g7Z0JBQ0ksTUFBTTtTQUNiO0tBQ0o7SUFFRCxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDIn0=