const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __bladePhp = require('../../template/bladePhp');
const __deepMap = require('../../object/deepMap');
const __packageRoot = require('../../path/packageRoot');
const __standardizeJson = require('../../npm/standardizeJson');
const __fs = require('fs');
const __path = require('path');
const __SPromise = require('../../promise/SPromise');
const __rimraf = require('rimraf');
const __render = require('../../template/render');
const __express = require('express');
const __trimLines = require('../../string/trimLines');
const __SError = require('../../error/SError');

/**
 * @name                express
 * @namespace           node.server.frontend
 * @type                Function
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @event         log       Some informations that you can or not display to your users
 *
 * @example       js
 * const frontendServer = require('@coffeekraken/sugar/node/server/frontend/frontend');
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (args = {}) => {
  const settings = __deepMerge(__sugarConfig('frontend'), args);
  const server = __express();

  const promise = new __SPromise({
    id: 'server.frontend'
  });

  // load the middlewares
  const middlewaresObj = settings.middlewares || {};
  for (let [key, middleware] of Object.entries(middlewaresObj)) {
    if (middleware.path.slice(-3) !== '.js') middleware.path += '.js';
    middleware.path = __path.resolve(middleware.path);
    if (!__fs.existsSync(middleware.path)) {
      return promise.reject(
        `The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`
      );
    }
    // register the middleware
    server.use(require(middleware.path)(middleware.settings || {}));
  }

  // loop on handlers
  Object.keys(settings.handlers).forEach(async (pageName) => {
    const handlerSettings = settings.handlers[pageName];

    const handlerFn = require(handlerSettings.handler);

    server.get(
      [`${handlerSettings.slug}/*`, `${handlerSettings.slug}`],
      async (req, res) => {
        const handlerPromise = handlerFn(req, server, handlerSettings);
        __SPromise.pipe(handlerPromise, promise);

        response = await handlerPromise;

        // handle response
        const view = response.view || 'pages.404';
        let data = response.data || {};
        const title = response.title || 'Page not found';
        const type = response.type || 'text/html';

        // prepariong the result
        let result;
        switch (type.toLowerCase()) {
          case 'application/json':
            result = data;
            break;
          case 'text/html':
            data = {
              ...res.templateData,
              title,
              type,
              ...data
            };
            const settings = {
              rootDir: [
                __sugarConfig('views.rootDir'),
                __path.resolve(__dirname, 'views')
              ]
            };
            try {
              result = await __render(view, data, settings);
            } catch (e) {
              result = await __render(
                'pages.501',
                {
                  ...data,
                  error: e
                },
                settings
              );
            }
            break;
          default:
            result = data;
            res.type(type);
            break;
        }

        // send the result to the client
        res.send(result);
      }
    );
  });

  server
    .listen(settings.port, settings.hostname, () => {
      setTimeout(() => {
        promise.trigger('log', {
          type: 'header',
          value: __trimLines(`Your <primary>Frontend Express</primary> server is <green>up and running</green>:

              - Hostname        : <yellow>${settings.hostname}</yellow>
              - Port            : <yellow>${settings.port}</yellow>
              - Root directory  : <yellow>${settings.rootDir}</yellow>
              - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`)
        });
      }, 200);
    })
    .on('error', (e) => {
      const string = e.toString();
      promise.reject(`${string}`);
    });

  return promise;
};
