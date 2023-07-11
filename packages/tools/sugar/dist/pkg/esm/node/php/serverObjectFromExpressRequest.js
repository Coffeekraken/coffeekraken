import __url from 'url';
import __packageRootDir from '../path/packageRootDir.js';
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
export default function __serverObjectFromExpressRequest(req) {
    var _a;
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`, urlObj = __url.parse(fullUrl);
    const $_SERVER = {
        HTTP_HOST: urlObj.host,
        REQUEST_URI: urlObj.path,
        SERVER_PROTOCOL: (_a = urlObj.protocol) === null || _a === void 0 ? void 0 : _a.replace(/:$/, ''),
        REQUEST_METHOD: req.method,
        REQUEST_TIME: Date.now(),
        REQUEST_TIME_FLOAT: Date.now(),
        QUERY_STRING: urlObj.query,
        DOCUMENT_ROOT: __packageRootDir(),
        HTTPS: urlObj.protocol === 'https' ? 'on' : 'off',
    };
    return $_SERVER;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUN4QixPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0NBQWdDLENBQUMsR0FBRzs7SUFDeEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUNwRSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQyxNQUFNLFFBQVEsR0FBRztRQUNiLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSTtRQUN0QixXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUk7UUFDeEIsZUFBZSxFQUFFLE1BQUEsTUFBTSxDQUFDLFFBQVEsMENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7UUFDbkQsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNO1FBQzFCLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3hCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDOUIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxLQUFLO1FBQzFCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRTtRQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztLQUNwRCxDQUFDO0lBRUYsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyJ9