// @ts-nocheck

import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';

/**
 * @name            frontspecMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```frontspec.json``` file at the root of
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
 * import frontspecMiddleware from '@coffeekraken/sugar/server/frontend/middleware/frontspecMiddleware';
 * const server = express();
 * server.use(frontspecMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function frontspecMiddleware(settings = {}) {
  return async function (req, res, next) {
    const frontspec = new __SFrontspec();
    const assetsToServe = await frontspec.assetsToServe();

    if (!res.templateData) res.templateData = {};
    if (!res.templateData.assets) res.templateData.assets = {};

    for (let i = 0; i < assetsToServe.length; i++) {
      const assetObj = assetsToServe[i];
      if (!res.templateData.assets[assetObj.type])
        res.templateData.assets[assetObj.type] = {};
      const assetHash = __md5.encrypt(assetObj.path ?? assetObj.src);
      let raw = '';
      const src = `/frontspec/${assetHash}`;

      if (req.path === src) {
        var readStream = __fs.createReadStream(assetObj.path);
        readStream.pipe(res);
        return next();
      }

      switch (assetObj.type.toLowerCase()) {
        case 'js':
          raw = `<script ${[
            assetObj.id ? `id="${assetObj.id}"` : '',
            assetObj.defer ? 'defer' : '',
            `src="${src}"`
          ]
            .join(' ')
            .replace(/\s{2,9999}/gm, ' ')}></script>`;
          break;
        case 'css':
          raw = `<link rel="stylesheet" ${[
            assetObj.id ? `id="${assetObj.id}"` : '',
            assetObj.defer ? 'defer' : '',
            `href="${src}"`
          ]
            .join(' ')
            .replace(/\s{2,9999}/gm, ' ')} />`;
          break;
      }

      res.templateData.assets[assetObj.type][`${assetObj.id}-${assetHash}`] = {
        id: assetObj.id,
        type: assetObj.type,
        hash: assetHash,
        src,
        raw
      };
    }

    // console.log(res.templateData.assets);

    return next();
  };
}
export default frontspecMiddleware;
