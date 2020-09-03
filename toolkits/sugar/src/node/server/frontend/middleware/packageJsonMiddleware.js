const __packageRoot = require('../../../path/packageRoot');
const __fs = require('fs');
const __standardizeJson = require('../../../npm/standardizeJson');

/**
 * @name            packageJsonMiddleware
 * @namespace       node.server.frontend.middleware
 * @type            Function
 *
 * This function describe the middleware that will fetch the ```package.json``` file at the root of
 * your server directory and add it to the template data sended to the rendered view
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
 * @param           {Function}          next            The next function to call when the middleware has finished his job
 *
 * @example         js
 * const express = require('express');
 * const packageJsonMiddleware = require('@coffeekraken/sugar/server/frontend/middleware/packageJsonMiddleware');
 * const server = express();
 * server.use(packageJsonMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function packageJsonMiddleware(settings = {}) {
  return function (req, res, next) {
    const packageJsonPath = `${__packageRoot()}/package.json`;
    let package;
    if (!__fs.existsSync(packageJsonPath)) {
    } else {
      package = require(packageJsonPath);
      res.templateData = {
        ...(res.templateData || {}),
        packageJson: __standardizeJson(package)
      };
    }

    next();
  };
};
