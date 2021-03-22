// @ts-nocheck

import __fs from 'fs';
import __sugarConfig from '../../../../shared/config/sugar';
import __deepMerge from '../../../../shared/object/deepMerge';
import __extension from '../../../fs/extension';

/**
 * @name            resolveExtensionFreePath
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function will try to resolve extension free requests like node modules, etc...
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
 * import resolveExtensionFreePath from '@coffeekraken/sugar/server/frontend/middleware/resolveExtensionFreePath';
 * const server = express();
 * server.use(resolveExtensionFreePath);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveExtensionFreePath(settings = {}) {
  settings = __deepMerge(
    {
      exclude: []
    },
    settings
  );
  return function (req, res, next) {
    if (settings.exclude.indexOf(req.path) !== -1) {
      return next();
    }
    const pathExtension = __extension(req.path).trim();
    if (pathExtension) return next();

    const rootDir = __sugarConfig('frontend.rootDir');
    const filePath =
      req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;

    // check if the file is on filesystem using the extensions listed in the frontend.config.js file
    for (let i = 0; i < settings.extensions.length; i++) {
      const ext = settings.extensions[i];
      const potentialFilePath = `${rootDir}/${filePath}.${ext}`;
      if (__fs.existsSync(potentialFilePath)) {
        // req.path = `/${filePath}.${ext}`;
        // req.url = `/${filePath}.${ext}`;
        res.redirect(`/${filePath}.${ext}`);
        break;
      }
    }

    next();
  };
}
export default resolveExtensionFreePath;
