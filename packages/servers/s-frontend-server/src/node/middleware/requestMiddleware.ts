// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __fs from 'fs';
import __SDocmap from '@coffeekraken/s-docmap';

/**
 * @name            requestMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware will fill the templateData.request object with the
 * actual express one
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
 * import requestMiddleware from '@coffeekraken/sugar/server/frontend/middleware/requestMiddleware';
 * const server = express();
 * server.use(requestMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function requestMiddleware(settings = {}) {
    return async function (req, res, next) {
        if (!res.templateData) res.templateData = {};
        res.templateData.request = {
            baseUrl: req.baseUrl,
            body: req.body,
            fresh: req.fresh,
            hostname: req.hostname,
            ip: req.ip,
            ips: req.ips,
            originalUrl: req.originalUrl,
            params: req.params,
            path: req.path,
            protocol: req.protocol,
            query: req.query,
            secure: req.secure,
            stale: req.stale,
            subdomains: req.subdomains,
            xhr: req.xhr,
        };

        __SBench.step('request', 'requestMiddleware');

        return next();
    };
}
export default requestMiddleware;
