// @ts-nocheck
import __SBench from '@coffeekraken/s-bench';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __formatPackageJson from '@coffeekraken/sugar/shared/package/formatPackageJson';
import __fs from 'fs';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function packageJsonMiddleware(settings = {}) {
    return function (req, res, next) {
        const packageJsonPath = `${__packageRootDir()}/package.json`;
        let pkg;
        if (!__fs.existsSync(packageJsonPath)) {
        }
        else {
            pkg = __readJsonSync(packageJsonPath);
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.packageJson = Object.assign({}, __formatPackageJson(pkg));
        }
        __SBench.step('request', 'packageJsonMiddleware');
        return next();
    };
}
export default packageJsonMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sbUJBQW1CLE1BQU0sc0RBQXNELENBQUM7QUFDdkYsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMscUJBQXFCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDeEMsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUMzQixNQUFNLGVBQWUsR0FBRyxHQUFHLGdCQUFnQixFQUFFLGVBQWUsQ0FBQztRQUM3RCxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1NBQ3RDO2FBQU07WUFDSCxHQUFHLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUMzRCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLHFCQUM1QixtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FDOUIsQ0FBQztTQUNMO1FBRUQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUVsRCxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLHFCQUFxQixDQUFDIn0=