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

  const promise = new __SPromise(null, {
    id: 'server.frontend'
  }).start();

  // load the "frontspec.json" file
  const frontspecPath = `${__packageRoot()}/frontspec.json`;
  let frontspec;
  if (!__fs.existsSync(frontspecPath)) {
    promise.trigger('log', {
      value: `#warning It seems that you don't have any "<cyan>frontspec.json</cyan>" at the root of your package. You will miss a lot of cool features without it...`
    });
  } else {
    frontspec = require(frontspecPath);
    for (let key in frontspec.assets) {
      for (let key1 in frontspec.assets[key]) {
        if (frontspec.assets[key][key1].path.slice(0, 1) === '/') continue;
        frontspec.assets[key][
          key1
        ].path = `/${frontspec.assets[key][key1].path}`;
      }
    }
  }

  // build the "templateData" object to pass to the render engines
  const templateData = {
    frontspec: JSON.stringify(frontspec),
    env: process.env.NODE_ENV || 'development',
    settings: JSON.stringify(settings),
    packageJson: __standardizeJson(require(__packageRoot() + '/package.json'))
  };

  server.get('/', async (req, res) => {
    const indexHtmlPath = __packageRoot(process.cwd()) + '/index.html';
    const indexViewPath = `${__sugarConfig('views.rootDir')}/index.blade.php`;
    if (__fs.existsSync(indexViewPath)) {
      // get the view content
      const viewContent = __fs.readFileSync(
        `${__sugarConfig('views.rootDir')}/index.blade.php`,
        'utf8'
      );

      let view = 'index';
      const tmpDir = __path.resolve(__sugarConfig('views.rootDir'), 'tmp');

      // check if the view does extend a special layout
      if (!viewContent.includes('@extends(')) {
        // make sure we have a tmp dir
        if (!__fs.existsSync(tmpDir)) __fs.mkdirSync(tmpDir);
        // copy the default layout
        __fs.copyFileSync(
          __path.resolve(__dirname, 'views/layouts/main.blade.php'),
          __path.resolve(tmpDir, 'main.blade.php')
        );
        // generate a new view that will extends the default one provided by sugar
        const newViewContent = `
            @extends('tmp.main')
            @section('content')
              ${viewContent}
            @endsection
          `;
        __fs.writeFileSync(
          __path.resolve(tmpDir, 'index.blade.php'),
          newViewContent
        );
        // change the view to render
        view = 'tmp.index';
      }

      // render the view
      let result = await __bladePhp(view, {
        ...templateData
      });

      // remove tmp folder
      __rimraf.sync(tmpDir);

      res.send(result);
    } else if (__fs.existsSync(indexHtmlPath)) {
      const content = __fs.readFileSync(indexHtmlPath, 'utf8');
      if (!content.includes('<body')) {
        const baseContent = __fs.readFileSync(
          __dirname + '/static/index.html',
          'utf8'
        );
        const stringToCompile = baseContent.replace('[content]', content);
        // const result = renderTemplate(stringToCompile, templateData);
        res.send(result);
      } else {
        // const result = renderTemplate(content, templateData);
        res.send(result);
      }
    } else {
      res.send(`You need to create at least one of these files:
        <ul>
          <li>${indexHtmlPath}</li>
          <li>${indexViewPath}</li>
        </ul>
        `);
    }
  });

  // loop on handlers
  Object.keys(settings.handlers).forEach(async (pageName) => {
    const handlerSettings = settings.handlers[pageName];

    const handlerFn = require(handlerSettings.handler);

    server.get(
      [`${handlerSettings.slug}/*`, `${handlerSettings.slug}`],
      async (req, res) => {
        const handlerPromise = handlerFn(req, server, handlerSettings);
        __SPromise.pipe(handlerPromise, promise);
        const responsePromise = handlerPromise;
        const response = await responsePromise;

        // handle response
        const view = response.view || 'pages.404';
        let data = response.data || null;
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
              ...templateData,
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
      }, 1000);
    })
    .on('error', (e) => {
      const string = e.toString();
      throw new __SError(`
          Something goes wrong with your <yellow>Frontend Server Process</yellow>:

          ${string}
        `);
    });

  return promise;
};
