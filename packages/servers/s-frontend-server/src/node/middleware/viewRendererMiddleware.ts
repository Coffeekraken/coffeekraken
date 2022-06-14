// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __fs from 'fs';
import __SDocmap from '@coffeekraken/s-docmap';
import __SViewRenderer from '@coffeekraken/s-view-renderer';

/**
 * @name            viewRendererMiddleware
 * @namespace       node.middleware
 * @type            Function
 * @status              wip
 *
 * This middleware will gives you access down the tree to a "viewRenerer" propery on the "res" object that you can use to render your views.
 * It's juar an SViewRenderer instance instanciates with all the shared data passed from the server
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
 * import viewRendererMiddleware from '@coffeekraken/sugar/server/frontend/middleware/viewRendererMiddleware';
 * const server = express();
 * server.use(viewRendererMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _viewRenderer, _sharedData;
function viewRendererMiddleware(settings = {}) {
    return async function (req, res, next) {
        // renderer
        if (!_viewRenderer) {
            _viewRenderer = new __SViewRenderer({
                sharedData: res.templateData.shared ?? {},
            });
        }

        res.viewRenderer = _viewRenderer;

        __SBench.step('request', 'viewRendererMiddleware');

        return next();
    };
}
export default viewRendererMiddleware;
