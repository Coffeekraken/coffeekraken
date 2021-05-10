// @ts-nocheck

import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * @name            proxyMiddleware
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
 * import proxyMiddleware from '@coffeekraken/sugar/server/frontend/middleware/proxyMiddleware';
 * const server = express();
 * server.use(proxyMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function proxyMiddleware(settings = {}) {
  return function (req, res, next) {
    res.templateData = {
      ...(res.templateData || {}),
      env: __env('NODE_ENV') || 'development'
    };
    return next();
  };
}
export default proxyMiddleware;
