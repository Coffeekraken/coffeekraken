// @ts-nocheck
/**
 * @name            proxyMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will add the "env" property to the ```res.templateData``` object
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
 * import proxyMiddleware from '@coffeekraken/sugar/server/frontend/middleware/proxyMiddleware';
 * const server = express();
 * server.use(proxyMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function proxyMiddleware(settings = {}) {
    return function (req, res, next) {
        res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { env: __env('NODE_ENV') || 'development' });
        return next();
    };
}
export default proxyMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHlNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJveHlNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFJZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsZUFBZSxDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3BDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDN0IsR0FBRyxDQUFDLFlBQVksbUNBQ1gsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixHQUFHLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQWEsR0FDeEMsQ0FBQztRQUNGLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsZUFBZSxDQUFDIn0=