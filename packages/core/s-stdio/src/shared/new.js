var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __isPath from '@coffeekraken/sugar/node/is/path';
import __isNode from '@coffeekraken/sugar/shared/is/node';
/**
 * @name            new
 * @type            Function
 * @async
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
 * await SStdio.new(proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function _new(sources, stdio = 'inherit', settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
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
            let { default: Cls } = yield import(stdio); // eslint-disable-line
            Cls = Cls.default || Cls;
            stdioInstance = new Cls(sources, settings);
        }
        else if (typeof stdio === 'string') {
            switch (stdio) {
                case 'inherit':
                    if (__isNode()) {
                        const { default: __STerminalStdio } = yield import('../node/terminal/STerminalStdio');
                        stdioInstance = new __STerminalStdio(sources, settings);
                    }
                    else {
                        throw new Error(`<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`);
                    }
                    break;
                case 'terminal':
                    if (!__isNode())
                        throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                    const { default: __STerminalStdio } = yield import('../node/terminal/STerminalStdio');
                    stdioInstance = new __STerminalStdio(sources, settings);
                    break;
                case 'blessed':
                    if (!__isNode())
                        throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>SBlessedStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                    const { default: __SBlessedStdio } = yield import('../node/terminal/SBlessedStdio');
                    stdioInstance = new __SBlessedStdio(sources, Object.assign(Object.assign({}, settings), { attach: true }));
                    break;
                default:
                    break;
            }
        }
        return stdioInstance;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFhLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTs7UUFDL0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakQsSUFBSSxhQUFrQixDQUFDO1FBRXZCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLFFBQVEsRUFBRSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDOUMsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixnSUFBZ0k7WUFDaEksT0FBTztZQUNQLGFBQWE7WUFDYixJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1lBQ2xFLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztZQUN6QixhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2IsS0FBSyxTQUFTO29CQUNaLElBQUksUUFBUSxFQUFFLEVBQUU7d0JBQ2QsTUFBTSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7d0JBQ3RGLGFBQWEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDekQ7eUJBQU07d0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYix3R0FBd0csQ0FDekcsQ0FBQztxQkFDSDtvQkFDRCxNQUFNO2dCQUNSLEtBQUssVUFBVTtvQkFDYixJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2IsNklBQTZJLENBQzlJLENBQUM7b0JBQ0osTUFBTSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBQ3RGLGFBQWEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDeEQsTUFBTTtnQkFDUixLQUFLLFNBQVM7b0JBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDYixNQUFNLElBQUksS0FBSyxDQUNiLDRJQUE0SSxDQUM3SSxDQUFDO29CQUNKLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDcEYsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sa0NBQ3RDLFFBQVEsS0FDWCxNQUFNLEVBQUUsSUFBSSxJQUNaLENBQUM7b0JBQ0gsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7U0FDRjtRQUVELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7Q0FBQSJ9