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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNyQyxPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzNCLHdCQUF3QjtRQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0QyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVsQixTQUFTLGFBQWE7WUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVoQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxrQkFBa0IsQ0FBQyJ9