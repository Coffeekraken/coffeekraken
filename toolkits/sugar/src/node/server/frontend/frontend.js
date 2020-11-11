const __mimeTypes = require('mime-types');
const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __SPromise = require('../../promise/SPromise');
const __express = require('express');
const __trimLines = require('../../string/trimLines');
const __SError = require('../../error/SError');
const __STemplate = require('../../template/STemplate');
const __deepMap = require('../../object/deepMap');
const __extension = require('../../fs/extension');

/**
 * @name                express
 * @namespace           sugar.node.server.frontend
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
    id: 'frontendServer'
  });

  // static directories
  Object.keys(settings.staticDirs).forEach((path) => {
    const fsPath = settings.staticDirs[path];
    server.use(path, __express.static(fsPath));
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

    let method = handlerSettings.method || 'get',
      slug = handlerSettings.slug || '*',
      extension = handlerSettings.extension
        ? Array.isArray(handlerSettings.extension)
          ? Array.isArray(handlerSettings.extension)
          : [handlerSettings.extension]
        : null;

    if (slug !== '*') {
      slug = [`${slug}/*`, `${slug}`];
    }

    server[method](slug, async (req, res, next) => {
      const reqPathExtension = __extension(req.path);

      if (extension) {
        if (
          extension.indexOf(reqPathExtension) === -1 &&
          extension.indexOf('.' + reqPathExtension) === -1
        ) {
          return next();
        }
      }

      const handlerPromise = handlerFn(req, server, handlerSettings);
      __SPromise.pipe(handlerPromise, promise);

      response = await handlerPromise;

      // handle response
      let code = response.code || 200;
      let view = response.view || 'pages.404';
      let data = response.data || {};
      let title = response.title || 'Page not found';
      let type = response.type || 'text/html';

      let result;
      if (data && data.body && data.body.includes('<html>')) {
        result = data.body;
      } else {
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
                // __path.resolve(__dirname, 'views'),
                __path.resolve(__dirname, '../../../php/views/blade')
              ]
            };

            try {
              const templateInstance = new __STemplate(view, settings);
              result = await templateInstance.render(data, settings);
            } catch (e) {
              const templateInstance = new __STemplate('pages.501', settings);
              code = 501;
              result = await templateInstance.render(
                {
                  ...data,
                  body: e
                },
                settings
              );
            }
            break;
          default:
            const mime = __mimeTypes.contentType(type);
            result = data;
            res.type(mime);
            break;
        }
      }

      // set the code
      res.status(code);

      // send the result to the client
      res.send(result);
    });
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
      promise.reject(string);
    });

  return promise;
};
