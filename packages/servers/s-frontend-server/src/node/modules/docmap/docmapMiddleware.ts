// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __fs from 'fs';
import __SDocmap from '@coffeekraken/s-docmap';

/**
 * @name            docmapMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```docmap.json``` file at the root of
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
 * import docmapMiddleware from '@coffeekraken/sugar/server/frontend/middleware/docmapMiddleware';
 * const server = express();
 * server.use(docmapMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let docmapCache;
function docmapMiddleware(settings = {}) {
    return async function (req, res, next) {
        if (!res.templateData) res.templateData = {};

        if (docmapCache) {
            res.templateData.docmap = docmapCache;
            return next();
        }

        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();

        // console.log(docmapJson);

        res.templateData.docmap = docmapJson;
        docmapCache = docmapJson;

        __SBench.step('request', 'docmapMiddleware');

        return next();
    };
}
export default docmapMiddleware;
