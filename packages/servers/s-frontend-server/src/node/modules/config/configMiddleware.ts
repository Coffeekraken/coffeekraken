// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __fs from 'fs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFile from '@coffeekraken/s-file';

/**
 * @name            configMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will expose the config and config files add it to the template data sended to the rendered view
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
 * import configMiddleware from '@coffeekraken/sugar/server/frontend/middleware/configMiddleware';
 * const server = express();
 * server.use(configMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function configMiddleware(settings = {}) {
    return async function (req, res, next) {
        const configJson = __SSugarConfig.get('');

        if (!res.templateData) res.templateData = {};
        res.templateData.config = configJson;
        res.templateData.config._sViewRendererShared = true; // for the SViewRenderer to avoid saving multiple times the same data at each view rendering

        res.templateData.configFiles = __SSugarConfig.filesPaths.map((path) =>
            __SFile.new(path).toObject(false),
        );

        // get the last item of the request
        const lastPath = req.path.split('/').pop();

        const requestedConfig = res.templateData.configFiles?.filter((file) => {
            return file.name === `${lastPath}.config.js`;
        });

        if (requestedConfig.length) {
            res.templateData.requestedConfig = await __SSugarConfig.toDocblocks(
                requestedConfig[0].path,
            );
        }

        __SBench.step('request', 'configMiddleware');

        return next();
    };
}
export default configMiddleware;
