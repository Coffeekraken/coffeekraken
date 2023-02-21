// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';

/**
 * @name            benchEndMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @platform            node
 * @status              beta
 * @private
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function benchEndMiddleware(settings = {}) {
    return function (req, res, next) {
        // console.log('___ST');
        const bench = new __SBench('request');

        res.bench = bench;

        function afterResponse() {
            bench.end();
        }

        res.on('finish', afterResponse);

        setTimeout(() => {
            next();
        }, 100);
    };
}
export default benchEndMiddleware;
