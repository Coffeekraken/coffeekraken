// @ts-nocheck
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __formatPackageJson } from '@coffeekraken/sugar/package';
import __fs from 'fs';
/**
 * @name            packageJsonMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @platform             node
 * @status              beta
 * @private
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
        var _a;
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
        (_a = res.bench) === null || _a === void 0 ? void 0 : _a.step('packageJsonMiddleware');
        return next();
    };
}
export default packageJsonMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7O1FBQzNCLE1BQU0sZUFBZSxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7U0FDdEM7YUFBTTtZQUNILEdBQUcsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU07Z0JBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQzNELEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcscUJBQzVCLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUM5QixDQUFDO1NBQ0w7UUFFRCxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXpDLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==