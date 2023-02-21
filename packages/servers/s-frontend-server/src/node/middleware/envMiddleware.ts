// @ts-nocheck

import __SEnv from '@coffeekraken/s-env';

/**
 * @name            envMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @platform            node
 * @status              beta
 * @private
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
 * import envMiddleware from '@coffeekraken/sugar/server/frontend/middleware/envMiddleware';
 * const server = express();
 * server.use(envMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function envMiddleware(settings = {}) {
    return function (req, res, next) {
        if (!res.templateData) res.templateData = {};
        if (!res.templateData.shared) res.templateData.shared = {};
        res.templateData.shared.env = {
            ...__SEnv.env,
        };

        res.bench?.step('envMiddleware');

        return next();
    };
}
export default envMiddleware;
