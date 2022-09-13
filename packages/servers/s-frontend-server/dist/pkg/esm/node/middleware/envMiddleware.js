// @ts-nocheck
import __SBench from '@coffeekraken/s-bench';
import __SEnv from '@coffeekraken/s-env';
/**
 * @name            envMiddleware
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
 * import envMiddleware from '@coffeekraken/sugar/server/frontend/middleware/envMiddleware';
 * const server = express();
 * server.use(envMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function envMiddleware(settings = {}) {
    return function (req, res, next) {
        if (!res.templateData)
            res.templateData = {};
        if (!res.templateData.shared)
            res.templateData.shared = {};
        res.templateData.shared.env = Object.assign({}, __SEnv.env);
        __SBench.step('request', 'envMiddleware');
        return next();
    };
}
export default envMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsYUFBYSxDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ2hDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZO1lBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTTtZQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMzRCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLHFCQUNwQixNQUFNLENBQUMsR0FBRyxDQUNoQixDQUFDO1FBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFMUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==