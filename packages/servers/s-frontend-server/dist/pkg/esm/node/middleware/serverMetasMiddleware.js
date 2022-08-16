// @ts-nocheck
import __SBench from '@coffeekraken/s-bench';
import __SEnv from '@coffeekraken/s-env';
/**
 * @name            serverMetasMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will add the "server" property to the ```res.templateData``` object
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
 * import serverMetasMiddleware from '@coffeekraken/sugar/server/frontend/middleware/serverMetasMiddleware';
 * const server = express();
 * server.use(serverMetasMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function serverMetasMiddleware(settings = {}) {
    return function (req, res, next) {
        if (!res.templateData)
            res.templateData = {};
        if (!res.templateData.shared)
            res.templateData.shared = {};
        res.templateData.shared.env = Object.assign({}, __SEnv.env);
        __SBench.step('request', 'serverMetasMiddleware');
        return next();
    };
}
export default serverMetasMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMscUJBQXFCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDeEMsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVk7WUFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNELEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcscUJBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQ2hCLENBQUM7UUFFRixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==