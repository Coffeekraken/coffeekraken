// @ts-nocheck
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
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
        const packageJsonPath = `${__packageRootDir()}/package.json`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb25NaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUpzb25NaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGlCQUFpQixNQUFNLHNEQUFzRCxDQUFDO0FBQ3JGLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMscUJBQXFCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDMUMsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUM3QixNQUFNLGVBQWUsR0FBRyxHQUFHLGdCQUFnQixFQUFFLGVBQWUsQ0FBQztRQUM3RCxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1NBQ3RDO2FBQU07WUFDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxZQUFZLG1DQUNYLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsV0FBVyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUNwQyxDQUFDO1NBQ0g7UUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==