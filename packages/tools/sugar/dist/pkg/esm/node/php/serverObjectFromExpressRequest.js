import { __packageRootDir } from '@coffeekraken/sugar/path';
import __url from 'url';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUV4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdDQUFnQyxDQUFDLEdBQUc7O0lBQ3hELE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFDcEUsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEMsTUFBTSxRQUFRLEdBQUc7UUFDYixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUk7UUFDdEIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJO1FBQ3hCLGVBQWUsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ25ELGNBQWMsRUFBRSxHQUFHLENBQUMsTUFBTTtRQUMxQixZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUN4QixrQkFBa0IsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQzlCLFlBQVksRUFBRSxNQUFNLENBQUMsS0FBSztRQUMxQixhQUFhLEVBQUUsZ0JBQWdCLEVBQUU7UUFDakMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7S0FDcEQsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMifQ==