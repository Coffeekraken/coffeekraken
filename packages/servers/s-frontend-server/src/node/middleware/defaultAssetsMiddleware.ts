// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';

/**
 * @name            defaultAssetsMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will check if some default assets like javascript and css
 * file(s) are present and can be integrated automatically to the templateData stack
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
 * import defaultAssetsMiddleware from '@coffeekraken/sugar/server/frontend/middleware/defaultAssetsMiddleware';
 * const server = express();
 * server.use(defaultAssetsMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function defaultAssetsMiddleware(settings = {}) {
  return async function (req, res, next) {
    const serverRootDir = __sugarConfig('frontendServer.rootDir');
    const assetsConfig = __sugarConfig('frontendServer.assets');

    if (!res.templateData) res.templateData = {};
    if (!res.templateData.assets) res.templateData.assets = {};

    Object.keys(assetsConfig ?? {}).forEach((type) => {
      Object.keys(assetsConfig[type]).forEach((id) => {
        const assetObj = assetsConfig[type][id];
        if (!assetObj.path) return;

        // fill assetobj
        assetObj.type = assetObj.type ?? type;

        if (__fs.existsSync(assetObj.path)) {
          if (!res.templateData.assets[type])
            res.templateData.assets[type] = {};
          const assetHash = __md5.encrypt(assetObj.path ?? assetObj.src);
          let raw = '',
            finalId = assetObj.id ?? id;
          const src = assetObj.path.replace(serverRootDir, '');

          switch (assetObj.type.toLowerCase()) {
            case 'js':
              raw = `<script ${[
                finalId ? `id="${finalId}"` : '',
                assetObj.defer ? 'defer' : '',
                `src="${src}"`
              ]
                .join(' ')
                .replace(/\s{2,9999}/gm, ' ')}></script>`;
              break;
            case 'css':
              raw = `<link rel="stylesheet" ${[
                finalId ? `id="${finalId}"` : '',
                assetObj.defer ? 'defer' : '',
                `href="${src}"`
              ]
                .join(' ')
                .replace(/\s{2,9999}/gm, ' ')} />`;
              break;
          }

          if (__fs.existsSync(assetObj.path + '.map')) {
            res.templateData.assets[type][finalId + '.map'] = {
              id: finalId + '.map',
              type: assetObj.type + '.map',
              hash: `${assetHash}.map`,
              path: `${assetObj.path}.map`,
              src: `${src}.map`
            };
          }

          res.templateData.assets[type][finalId] = {
            id: finalId,
            type: assetObj.type,
            hash: assetHash,
            path: assetObj.path,
            src,
            raw
          };
        }
      });
    });

    return next();
  };
}
export default defaultAssetsMiddleware;
