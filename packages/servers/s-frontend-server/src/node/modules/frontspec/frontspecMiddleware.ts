// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __fs from 'fs';

/**
 * @name            frontspecMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```frontspec.json``` file at the root of
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
 * import frontspecMiddleware from '@coffeekraken/sugar/server/frontend/middleware/frontspecMiddleware';
 * const server = express();
 * server.use(frontspecMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function frontspecMiddleware(settings = {}) {
    return async function (req, res, next) {
        const frontspec = new __SFrontspec();

        if (!res.templateData) res.templateData = {};
        if (!res.templateData.frontspec) res.templateData.frontspec = {};

        res.templateData.frontspec = {
            ...(await frontspec.read()),
            ...res.templateData.frontspec,
        };

        __SBench.step('request', 'frontspecMiddleware');

        return next();
    };
}
export default frontspecMiddleware;
