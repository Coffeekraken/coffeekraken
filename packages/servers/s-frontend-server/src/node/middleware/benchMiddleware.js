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
            pipe(__SBench.start('request'));
            function afterResponse() {
                __SBench.end('request');
            }
            res.on('finish', afterResponse);
            next();
        });
    };
}
export default benchEndMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVuY2hNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmVuY2hNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDdkMsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUM3QixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7WUFFaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVoQyxTQUFTLGFBQWE7Z0JBQ3BCLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUVELEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRWhDLElBQUksRUFBRSxDQUFDO1FBRVQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxrQkFBa0IsQ0FBQyJ9