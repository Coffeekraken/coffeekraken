// @ts-nocheck

import __packageRoot from '../../../path/packageRoot';
import __fs from 'fs';
import __sugarConfig from '../../../config/sugar';
import __deepMerge from '../../../../shared/object/deepMerge';
import __deepMap from '../../../../shared/object/deepMap';

/**
 * @name            importmapMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```importmap.json``` file at the root of
 * your server directory or at the root of your dist directory and add it to the template data sended to the rendered view
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
 * @param           {Function}          next            The next function to call when the middleware has finished his job
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import express from 'express';
 * import importmapMiddleware from '@coffeekraken/sugar/server/frontend/middleware/importmapMiddleware';
 * const server = express();
 * server.use(importmapMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function importmapMiddleware(settings = {}) {
  return function (req, res, next) {
    const defaultFrontSpec = __sugarConfig('frontspec') || {};
    const frontspecPath = `${__packageRoot()}/frontspec.json`;
    let frontspec = defaultFrontSpec;
    if (__fs.existsSync(frontspecPath)) {
      const frontspecFile = require(frontspecPath);
      frontspec = __deepMerge(frontspec, frontspecFile);
    }

    frontspec = __deepMap(frontspec, (value, prop, fullPath) => {
      if (typeof value === 'string') {
        return value
          .replace(`${__packageRoot()}/`, '')
          .replace(__packageRoot(), '');
      }
      return value;
    });

    res.templateData = {
      ...(res.templateData || {}),
      frontspec
    };

    next();
  };
}
export default importmapMiddleware;
