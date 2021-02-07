// @ts-nocheck

import __packageRoot from '../../../path/packageRoot';
import __fs from 'fs';
import __standardizeJson from '../../../npm/standardizeJson';

/**
 * @name            packageJsonMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will fetch the ```package.json``` file at the root of
 * your server directory and add it to the template data sended to the rendered view
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
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
    } else {
      pkg = require(packageJsonPath);
      res.templateData = {
        ...(res.templateData || {}),
        packageJson: __standardizeJson(pkg)
      };
    }

    next();
  };
}
export = packageJsonMiddleware;
