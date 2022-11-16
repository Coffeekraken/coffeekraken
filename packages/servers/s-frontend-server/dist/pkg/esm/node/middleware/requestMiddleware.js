// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name            requestMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware will fill the templateData.request object with the
 * actual express one
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
 * @param           {Function}          next            The next function to call when the middleware has finished his job
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import express from 'express';
 * import requestMiddleware from '@coffeekraken/sugar/server/frontend/middleware/requestMiddleware';
 * const server = express();
 * server.use(requestMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function requestMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.templateData)
                res.templateData = {};
            res.templateData.request = {
                // baseUrl: req.baseUrl,
                // body: req.body,
                // // fresh: req.fresh,
                // hostname: req.hostname,
                // ip: req.ip,
                // ips: req.ips,
                // originalUrl: req.originalUrl,
                // params: req.params,
                path: req.path,
                // protocol: req.protocol,
                // query: req.query,
                // secure: req.secure,
                // stale: req.stale,
                // subdomains: req.subdomains,
                // xhr: req.xhr,
            };
            (_a = res.bench) === null || _a === void 0 ? void 0 : _a.step('request', 'requestMiddleware');
            return next();
        });
    };
}
export default requestMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3BDLE9BQU8sVUFBZ0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOzs7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHO2dCQUN2Qix3QkFBd0I7Z0JBQ3hCLGtCQUFrQjtnQkFDbEIsdUJBQXVCO2dCQUN2QiwwQkFBMEI7Z0JBQzFCLGNBQWM7Z0JBQ2QsZ0JBQWdCO2dCQUNoQixnQ0FBZ0M7Z0JBQ2hDLHNCQUFzQjtnQkFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLDBCQUEwQjtnQkFDMUIsb0JBQW9CO2dCQUNwQixzQkFBc0I7Z0JBQ3RCLG9CQUFvQjtnQkFDcEIsOEJBQThCO2dCQUM5QixnQkFBZ0I7YUFDbkIsQ0FBQztZQUVGLE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBRWhELE9BQU8sSUFBSSxFQUFFLENBQUM7O0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9