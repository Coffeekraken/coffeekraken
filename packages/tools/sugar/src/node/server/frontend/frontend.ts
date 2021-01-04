// @ts-nocheck

import __mimeTypes from 'mime-types';
import __sugarConfig from '../../config/sugar';
import __deepMerge from '../../object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __SPromise from '../../promise/SPromise';
import __express from 'express';
import __trimLines from '../../string/trimLines';
import __SError from '../../error/SError';
import __STemplate from '../../template/STemplate';
import __deepMap from '../../object/deepMap';
import __extension from '../../fs/extension';
import __packageRoot from '../../path/packageRoot';

/**
 * @name                express
 * @namespace           sugar.node.server.frontend
 * @type                Function
 * @wip
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @event         log       Some informations that you can or not display to your users
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import frontendServer from '@coffeekraken/sugar/node/server/frontend/frontend';
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn = function (args = {}) {
  const settings = __deepMerge(__sugarConfig('frontend'), args);
  const app = __express();

  let server;

  const promise = new __SPromise({
    id: 'frontendServer'
  });

  (async () => {
    // static directories
    Object.keys(settings.staticDirs).forEach((path) => {
      const fsPath = settings.staticDirs[path];
      app.use(path, __express.static(fsPath));
    });

    // load the middlewares
    const middlewaresObj = settings.middlewares || {};
    for (const [key, middleware] of Object.entries(middlewaresObj)) {
      if (middleware.path.slice(-3) !== '.js') middleware.path += '.js';
      middleware.path = __path.resolve(middleware.path);
      if (!__fs.existsSync(middleware.path)) {
        return promise.reject(
          `The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`
        );
      }
      // register the middleware
      app.use(require(middleware.path)(middleware.settings || {}));
    }

    // loop on handlers
    Object.keys(settings.handlers).forEach(async (pageName) => {
      const handlerSettings = __deepMerge(
        {
          log: true
        },
        settings.handlers[pageName]
      );
      let handlerPath = handlerSettings.handler;
      if (handlerPath.slice(-3) !== '.js') handlerPath += '.js';

      if (!__fs.existsSync(handlerPath)) {
        promise.trigger('warn', {
          value: `Frontend handler "<cyan>${__path.relative(
            __packageRoot(),
            handlerPath
          )}</cyan>" does not exists...`
        });
      } else {
        const handlerFn = require(handlerPath);

        const method = handlerSettings.method || 'get';
        let slug = handlerSettings.slug || '*';
        const extension = handlerSettings.extension
          ? Array.isArray(handlerSettings.extension)
            ? Array.isArray(handlerSettings.extension)
            : [handlerSettings.extension]
          : null;

        if (slug !== '*') {
          slug = [`${slug}/*`, `${slug}`];
        }

        setTimeout(() => {
          promise.trigger('log', {
            value: `Handler <cyan>${pageName}</cyan> "<yellow>${method}:${slug}</yellow>" registered <green>successfully</green>`
          });
        }, 1000);

        app[method](slug, async (req, res, next) => {
          const reqPathExtension = __extension(req.path);
          if (extension) {
            if (
              extension.indexOf(reqPathExtension) === -1 &&
              extension.indexOf('.' + reqPathExtension) === -1
            ) {
              return next();
            }
          }

          const handlerPromise = handlerFn(req, res, handlerSettings);
          __SPromise.pipe(handlerPromise, promise);
        });
      }
    });

    server = app
      .listen(settings.port, settings.hostname, () => {
        setTimeout(() => {
          promise.trigger('log', {
            type: 'heading',
            clear: true,
            value: __trimLines(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:

                - Hostname        : <yellow>${settings.hostname}</yellow>
                - Port            : <yellow>${settings.port}</yellow>
                - Root directory  : <yellow>${settings.rootDir}</yellow>
                - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`)
          });
        }, 200);
      })
      .on('error', (e) => {
        const string = e.toString();
        promise.reject(string);
      });
  })();

  promise.on('finally', () => {
    server.close();
  });

  return promise;
};
export = fn;
