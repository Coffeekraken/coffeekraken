var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __STerminalStdio from '../node/terminal/STerminalStdio';
import __SNoUiStdio from './noUi/SNoUiStdio';
import __SStdio from './SStdio';
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
 * @param           {ISStdioUi}         stdio           Specify the stdio to init
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
export default function _new(id, sources, stdio, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(sources))
            sources = [sources];
        let stdioInstance;
        switch (stdio) {
            case __SStdio.UI_TERMINAL:
                if (__isNode()) {
                    stdioInstance = new __STerminalStdio(id, sources, settings);
                }
                else {
                    throw new Error(`<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`);
                }
                break;
            case __SStdio.UI_CONSOLE:
                // if (!__isNode())
                //     throw new Error(
                //         `<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`,
                //     );
                // stdioInstance = new __STerminalStdio(id, sources, settings);
                break;
            case __SStdio.NO_UI:
            default:
                stdioInstance = new __SNoUiStdio(id, sources, settings);
                break;
        }
        return stdioInstance;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxZQUFZLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxRQUF1QixNQUFNLFVBQVUsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFnQixJQUFJLENBQzlCLEVBQVUsRUFDVixPQUFPLEVBQ1AsS0FBaUIsRUFDakIsUUFBYzs7UUFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUFJLGFBQWtCLENBQUM7UUFFdkIsUUFBUSxLQUFLLEVBQUU7WUFDWCxLQUFLLFFBQVEsQ0FBQyxXQUFXO2dCQUNyQixJQUFJLFFBQVEsRUFBRSxFQUFFO29CQUNaLGFBQWEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQy9EO3FCQUFNO29CQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsd0dBQXdHLENBQzNHLENBQUM7aUJBQ0w7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDLFVBQVU7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2Qix5SkFBeUo7Z0JBQ3pKLFNBQVM7Z0JBQ1QsK0RBQStEO2dCQUMvRCxNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3BCO2dCQUNJLGFBQWEsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1NBQ2I7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0NBQUEifQ==