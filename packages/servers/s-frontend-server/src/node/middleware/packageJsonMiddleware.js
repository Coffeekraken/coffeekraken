// @ts-nocheck
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import __standardizeJson from '@coffeekraken/sugar/shared/npm/utils/standardizeJson';
import __SBench from '@coffeekraken/s-bench';
/**
 * @name            packageJsonMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will fetch the ```package.json``` file at the root of
 * your server directory and add it to the template data sended to the rendered view
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
 * import packageJsonMiddleware from '@coffeekraken/sugar/server/frontend/middleware/packageJsonMiddleware';
 * const server = express();
 * server.use(packageJsonMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function packageJsonMiddleware(settings = {}) {
    return function (req, res, next) {
        const packageJsonPath = `${__packageRoot()}/package.json`;
        let pkg;
        if (!__fs.existsSync(packageJsonPath)) {
        }
        else {
            pkg = require(packageJsonPath);
            res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { packageJson: __standardizeJson(pkg) });
        }
        __SBench.step('request', 'packageJsonMiddleware');
        return next();
    };
}
export default packageJsonMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb25NaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUpzb25NaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxpQkFBaUIsTUFBTSxzREFBc0QsQ0FBQztBQUNyRixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQzFDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDN0IsTUFBTSxlQUFlLEdBQUcsR0FBRyxhQUFhLEVBQUUsZUFBZSxDQUFDO1FBQzFELElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7U0FDdEM7YUFBTTtZQUNMLEdBQUcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLFlBQVksbUNBQ1gsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixXQUFXLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQ3BDLENBQUM7U0FDSDtRQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFFbEQsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxxQkFBcUIsQ0FBQyJ9