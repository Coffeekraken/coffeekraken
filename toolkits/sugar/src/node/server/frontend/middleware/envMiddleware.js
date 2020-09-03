const __packageRoot = require('../../../path/packageRoot');
const __fs = require('fs');
const __env = require('../../../core/env');

/**
 * @name            envMiddleware
 * @namespace       node.server.frontend.middleware
 * @type            Function
 *
 * This function describe the middleware that will add the "env" property to the ```res.templateData``` object
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
 * @param           {Function}          next            The next function to call when the middleware has finished his job
 *
 * @example         js
 * const express = require('express');
 * const envMiddleware = require('@coffeekraken/sugar/server/frontend/middleware/envMiddleware');
 * const server = express();
 * server.use(envMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function envMiddleware(settings = {}) {
  return function (req, res, next) {
    res.templateData = {
      ...(res.templateData || {}),
      env: __env('NODE_ENV') || 'development'
    };
    next();
  };
};
