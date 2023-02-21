"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
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
        const bench = new s_bench_1.default('request');
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
exports.default = benchEndMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNyQyxPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzNCLHdCQUF3QjtRQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbEIsU0FBUyxhQUFhO1lBQ2xCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRUQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFaEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLGtCQUFrQixDQUFDIn0=