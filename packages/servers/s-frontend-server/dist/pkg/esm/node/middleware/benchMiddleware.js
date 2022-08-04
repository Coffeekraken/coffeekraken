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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function benchEndMiddleware(settings = {}) {
    return function (req, res, next) {
        return new __SPromise(({ resolve, reject, pipe }) => {
            // console.log('___ST');
            __SBench.start('request');
            function afterResponse() {
                __SBench.end('request', {}).log();
            }
            res.on('finish', afterResponse);
            setTimeout(() => {
                next();
            }, 100);
        });
    };
}
export default benchEndMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDckMsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUMzQixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDaEQsd0JBQXdCO1lBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFMUIsU0FBUyxhQUFhO2dCQUNsQixRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBRUQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFaEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsa0JBQWtCLENBQUMifQ==