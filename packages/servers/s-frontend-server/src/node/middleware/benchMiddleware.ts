// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SPromise from '@coffeekraken/s-promise';

/**
 * @name            benchEndMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * SMall middleware to end the request benchmark
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
 * import benchEndMiddleware from '@coffeekraken/sugar/server/frontend/middleware/benchEndMiddleware';
 * const server = express();
 * server.use(benchEndMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function benchEndMiddleware(settings = {}) {
    return function (req, res, next) {
        return new __SPromise(({ resolve, reject, pipe }) => {
            // console.log('___ST');
            __SBench.start('request');

            function afterResponse() {
                __SBench.end('request');
            }

            res.on('finish', afterResponse);

            setTimeout(() => {
                next();
            }, 100);
        });
    };
}
export default benchEndMiddleware;
