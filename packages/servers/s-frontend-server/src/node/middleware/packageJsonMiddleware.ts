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
        } else {
            pkg = __readJsonSync(packageJsonPath);
            if (!res.templateData) res.templateData = {};
            if (!res.templateData.shared) res.templateData.shared = {};
            res.templateData.shared.packageJson = {
                ...__formatPackageJson(pkg),
            };
        }

        __SBench.step('request', 'packageJsonMiddleware');

        return next();
    };
}
export default packageJsonMiddleware;
