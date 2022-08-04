"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const SBasicStdio_1 = __importDefault(require("../node/basic/SBasicStdio"));
const SWebsocketStdio_1 = __importDefault(require("../node/websocket/SWebsocketStdio"));
const SStdio_1 = __importDefault(require("./SStdio"));
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
function _new(id, sources, stdio, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(sources))
            sources = [sources];
        let stdioInstance;
        if ((0, node_1.default)()) {
            switch (stdio) {
                case SStdio_1.default.UI_WEBSOCKET:
                    stdioInstance = new SWebsocketStdio_1.default(id, sources, settings);
                    break;
                case SStdio_1.default.UI_BASIC:
                default:
                    stdioInstance = new SBasicStdio_1.default(id, sources, settings);
                    break;
            }
        }
        else {
            throw new Error(`No stdio implementation found for the current "browser" environment...`);
        }
        return stdioInstance;
    });
}
exports.default = _new;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQTBEO0FBQzFELDRFQUFzRDtBQUN0RCx3RkFBa0U7QUFFbEUsc0RBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQThCLElBQUksQ0FDOUIsRUFBVSxFQUNWLE9BQU8sRUFDUCxLQUFpQixFQUNqQixRQUFjOztRQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELElBQUksYUFBa0IsQ0FBQztRQUV2QixJQUFJLElBQUEsY0FBUSxHQUFFLEVBQUU7WUFDWixRQUFRLEtBQUssRUFBRTtnQkFDWCxLQUFLLGdCQUFRLENBQUMsWUFBWTtvQkFDdEIsYUFBYSxHQUFHLElBQUkseUJBQWlCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDN0QsTUFBTTtnQkFDVixLQUFLLGdCQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN2QjtvQkFDSSxhQUFhLEdBQUcsSUFBSSxxQkFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3pELE1BQU07YUFDYjtTQUNKO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLHdFQUF3RSxDQUMzRSxDQUFDO1NBQ0w7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0NBQUE7QUExQkQsdUJBMEJDIn0=