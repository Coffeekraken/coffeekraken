const __packageRoot = require('../../../path/packageRoot');
const __fs = require('fs');

/**
 * @name            frontspecMiddleware
 * @namespace       node.server.frontend.middleware
 * @type            Function
 *
 * This function describe the middleware that will fetch the ```frontspec.json``` file at the root of
 * your server directory and add it to the template data sended to the rendered view
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
 * @param           {Function}          next            The next function to call when the middleware has finished his job
 *
 * @example         js
 * const express = require('express');
 * const frontspecMiddleware = require('@coffeekraken/sugar/server/frontend/middleware/frontspecMiddleware');
 * const server = express();
 * server.use(frontspecMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function frontspecMiddleware(settings = {}) {
  return function (req, res, next) {
    const frontspecPath = `${__packageRoot()}/frontspec.json`;
    let frontspec;
    if (!__fs.existsSync(frontspecPath)) {
    } else {
      frontspec = require(frontspecPath);
      res.templateData = {
        ...(res.templateData || {}),
        frontspec
      };
    }

    next();
  };
};
