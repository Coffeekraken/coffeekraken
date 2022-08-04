"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function benchEndMiddleware(settings = {}) {
    return function (req, res, next) {
        return new s_promise_1.default(({ resolve, reject, pipe }) => {
            // console.log('___ST');
            s_bench_1.default.start('request');
            function afterResponse() {
                s_bench_1.default.end('request', {}).log();
            }
            res.on('finish', afterResponse);
            setTimeout(() => {
                next();
            }, 100);
        });
    };
}
exports.default = benchEndMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx3RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3JDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDM0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoRCx3QkFBd0I7WUFDeEIsaUJBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFMUIsU0FBUyxhQUFhO2dCQUNsQixpQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEMsQ0FBQztZQUVELEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRWhDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxrQkFBa0IsQ0FBQyJ9