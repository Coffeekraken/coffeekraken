"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
/**
 * @name                            serverObjectFromExpressRequest
 * @namespace            node.php
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * This function take an express request object and return an object that you can merge with the
 * $_SERVER php variable to fill it with correct data when calling a php script with the "php" command
 * line that does not provide informations like HTTP_HOST, etc...
 *
 * @param           {Object}            expressRequestObject        The express request object
 * @return          {Object}                                        An object that you can merge with your $_SERVER php variable
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __serverObjectFromExpressRequest($1)
 *
 * @example             js
 * import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
 * const serverObject = __serverObjectFromExpressRequest(req);
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __serverObjectFromExpressRequest(req) {
    var _a;
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`, urlObj = url_1.default.parse(fullUrl);
    const $_SERVER = {
        HTTP_HOST: urlObj.host,
        REQUEST_URI: urlObj.path,
        SERVER_PROTOCOL: (_a = urlObj.protocol) === null || _a === void 0 ? void 0 : _a.replace(/:$/, ''),
        REQUEST_METHOD: req.method,
        REQUEST_TIME: Date.now(),
        REQUEST_TIME_FLOAT: Date.now(),
        QUERY_STRING: urlObj.query,
        DOCUMENT_ROOT: (0, packageRootDir_1.default)(),
        HTTPS: urlObj.protocol === 'https' ? 'on' : 'off',
    };
    return $_SERVER;
}
exports.default = __serverObjectFromExpressRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxTQUF3QixnQ0FBZ0MsQ0FBQyxHQUFHOztJQUN4RCxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQ3BFLE1BQU0sR0FBRyxhQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWxDLE1BQU0sUUFBUSxHQUFHO1FBQ2IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJO1FBQ3RCLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSTtRQUN4QixlQUFlLEVBQUUsTUFBQSxNQUFNLENBQUMsUUFBUSwwQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNuRCxjQUFjLEVBQUUsR0FBRyxDQUFDLE1BQU07UUFDMUIsWUFBWSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDeEIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUM5QixZQUFZLEVBQUUsTUFBTSxDQUFDLEtBQUs7UUFDMUIsYUFBYSxFQUFFLElBQUEsd0JBQWdCLEdBQUU7UUFDakMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7S0FDcEQsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFqQkQsbURBaUJDIn0=