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
import __SBasicStdio from '../node/basic/SBasicStdio';
import __SWebsocketStdio from '../node/websocket/SWebsocketStdio';
import __SStdio from './SStdio';
/**
 * @name            new
 * @type            Function
 *
 * This static method is a sugar to instanciate an stdio by specifying some sources,
 * and either a path to a SStdio class, an SStdio class directly or a pre-registered
 * stdio id like:
 * - inherit: If is in node context, will fallback to SBasicStdio, if in browser, in SConsoleStdio
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function _new(id, sources, stdio, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(sources))
            sources = [sources];
        let stdioInstance;
        if (__isNode()) {
            switch (stdio) {
                case __SStdio.UI_WEBSOCKET:
                    stdioInstance = new __SWebsocketStdio(id, sources, settings);
                    break;
                case __SStdio.UI_BASIC:
                default:
                    stdioInstance = new __SBasicStdio(id, sources, settings);
                    break;
            }
        }
        else {
            throw new Error(`No stdio implementation found for the current "browser" environment...`);
        }
        return stdioInstance;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8saUJBQWlCLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxRQUF1QixNQUFNLFVBQVUsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFnQixJQUFJLENBQzlCLEVBQVUsRUFDVixPQUFPLEVBQ1AsS0FBaUIsRUFDakIsUUFBYzs7UUFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUFJLGFBQWtCLENBQUM7UUFFdkIsSUFBSSxRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsS0FBSyxFQUFFO2dCQUNYLEtBQUssUUFBUSxDQUFDLFlBQVk7b0JBQ3RCLGFBQWEsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2pFLE1BQU07Z0JBQ04sS0FBSyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN2QjtvQkFDSSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDekQsTUFBTTthQUNiO1NBQ0o7YUFBTTtZQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztTQUM3RjtRQUNELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7Q0FBQSJ9