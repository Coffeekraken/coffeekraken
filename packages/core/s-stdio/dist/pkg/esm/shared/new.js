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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8saUJBQWlCLE1BQU0sbUNBQW1DLENBQUM7QUFFbEUsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLElBQUksQ0FDOUIsRUFBVSxFQUNWLE9BQU8sRUFDUCxLQUFpQixFQUNqQixRQUFjOztRQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELElBQUksYUFBa0IsQ0FBQztRQUV2QixJQUFJLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxLQUFLLEVBQUU7Z0JBQ1gsS0FBSyxRQUFRLENBQUMsWUFBWTtvQkFDdEIsYUFBYSxHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDN0QsTUFBTTtnQkFDVixLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZCO29CQUNJLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN6RCxNQUFNO2FBQ2I7U0FDSjthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FDWCx3RUFBd0UsQ0FDM0UsQ0FBQztTQUNMO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztDQUFBIn0=