// @ts-nocheck

import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __SEnv from '@coffeekraken/s-env';
import __SBench from '@coffeekraken/s-bench';

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
require('events').EventEmitter.defaultMaxListeners = Infinity;
const _requestedFiles: Record<string, any> = {};
function frontspecMiddleware(settings = {}) {
  return async function (req, res, next) {
    // handle already fetched files
    if (_requestedFiles[req.path]) {
      const assetObj = _requestedFiles[req.path];
      let content = __fs.readFileSync(assetObj.path, 'utf8').toString();
      content = content.replace(
        /\/\/# sourceMappingURL=.*\.map/gm,
        `// #sourceMappingUrl=${assetObj.src}.map`
      );
      console.log(`Request on "<cyan>${assetObj.src}</cyan>"`);
      res.send(content);
      return;
    }

    const frontspec = new __SFrontspec();
    const assetsToServe = await frontspec.assetsToServe();

    if (!res.templateData) res.templateData = {};
    if (!res.templateData.assets) res.templateData.assets = {};

    for (let i = 0; i < assetsToServe.length; i++) {
      const assetObj = assetsToServe[i];
      if (!res.templateData.assets[assetObj.type])
        res.templateData.assets[assetObj.type] = {};
      const assetHash = __md5.encrypt(
        assetObj.src ?? assetObj.url ?? assetObj.file?.path
      );
      let raw = '';

      let url;
      if (assetObj.file) {
        url = `/frontspec/${assetHash}-${assetObj.file.name}`;
      } else if (assetObj.url) url = assetObj.url;

      const originalUrl = url;

      // cache busting in dev
      // if (!__SEnv.is('prod') && !assetObj.url?.match(/@vite/)) {
      //   const version = `?v=${Math.round(Math.random() * 9999999999)}`;
      //   if (assetObj.args.src) assetObj.args.src += version;
      //   if (assetObj.args.href) assetObj.args.href += version;
      // }

      switch (assetObj.type.toLowerCase()) {
        case 'js':
          raw = `<script ${[
            assetObj.id ? `id="${assetObj.id}"` : '',
            Object.keys(assetObj.args)
              .map((argName) => {
                return `${argName}${
                  assetObj.args[argName] === true
                    ? ''
                    : `="${assetObj.args[argName]}"`
                }`;
              })
              .join(' ')
          ]
            .join(' ')
            .replace(/\s{2,9999}/gm, ' ')}></script>`;
          break;
        case 'css':
          raw = `<link rel="stylesheet" ${[
            assetObj.id ? `id="${assetObj.id}"` : '',
            Object.keys(assetObj.args)
              .map((argName) => {
                return `${argName}${
                  assetObj.args[argName] === true
                    ? ''
                    : `="${assetObj.args[argName]}"`
                }`;
              })
              .join(' ')
          ]
            .join(' ')
            .replace(/\s{2,9999}/gm, ' ')} />`;
          break;
      }

      if (assetObj.file) {
        if (__fs.existsSync(assetObj.file.path + '.map')) {
          _requestedFiles[`${originalUrl}.map`] = {
            id: assetObj.id + '.map',
            type: assetObj.type + '.map',
            hash: `${assetHash}.map`,
            path: `${assetObj.file.path}.map`,
            src: `${originalUrl}.map`
          };
        }
        _requestedFiles[originalUrl] = {
          id: assetObj.id,
          type: assetObj.type,
          hash: assetHash,
          path: assetObj.file.path,
          url,
          raw
        };
      } else if (assetObj.url) {
        _requestedFiles[originalUrl] = {
          id: assetObj.id,
          type: assetObj.type,
          hash: assetHash,
          url,
          raw
        };
      }

      res.templateData.assets[assetObj.type][assetHash] = _requestedFiles[originalUrl];
    }

    __SBench.step('request', 'frontspecMiddleware');

    return next();
  };
}
export default frontspecMiddleware;
