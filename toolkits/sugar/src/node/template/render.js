const __sugarConfig = require('../config/sugar');
const __getFilename = require('../fs/filename');
const __fs = require('fs');
const __path = require('path');
const __getExt = require('../fs/extension');
const __deepMerge = require('../object/deepMerge');
const __toString = require('../string/toString');
const __SPromise = require('../promise/SPromise');
const __SError = require('../error/SError');

/**
 * @name              render
 * @namespace         sugar.node.template
 * @type              Function
 * @async
 *
 * This function take a view path, a data object and optionaly a settings object to compile
 * the view and return a simple Promise that will be resolved or rejected depending on the
 * process status.
 *
 * @param       {String}        viewPath        The view path to compile. This has to be a dotted path like "my.cool.view" relative to the @config.views.rootDir directory
 * @param       {Object}        [data={}]       An object of data to use to compile the view correctly
 * @param       {Object}        [settings={}]   An object of settings to configure your rendering process. Here's the list of available settings:
 * - rootDir (__sugarConfig('views.rootDir')) {String|Array<String>}: Specify the root directory where to search for views. Can be an array of directories in which the engine will search through if needed
 *
 * @example       js
 * const render = require('@coffeekraken/sugar/node/template/render');
 * const result = await render('my.cool.template, {
 *    hello: 'world'
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function render(viewPath, data = null, settings = {}) {
  return new __SPromise(
    async (resolve, reject, trigger, cancel) => {
      const engines = {
        'blade.php': require('./bladePhp')
      };

      settings = __deepMerge(
        {
          rootDir: []
        },
        settings
      );

      // listing the files available in the passed view folder
      const rootDirectories = [...settings.rootDir] || [
        ...__sugarConfig('views.rootDir')
      ];

      let viewDir = viewPath;
      // Object.keys(engines).forEach((ext) => {
      //   viewDir = viewDir.replace(`.${ext}`, '');
      // });
      viewDir = viewDir.split('.').join('/');
      const viewName = viewDir.split('/').pop().toString();
      const folderPath = viewDir.replace(viewName, '').trim();

      let viewObj = {
        rootDir: null,
        view: null,
        folder: null,
        extension: null,
        path: null
      };
      for (let dirIdx in rootDirectories) {
        if (viewObj.name) break;
        const dir = rootDirectories[dirIdx];
        const filesArray = __fs.readdirSync(
          __path.resolve(rootDirectories[dirIdx], folderPath)
        );
        for (let fileIdx in filesArray) {
          const filename = __getFilename(filesArray[fileIdx]);
          const ext = filename.split('.').slice(1).join('.');
          if (viewName === filename.replace(`.${ext}`, '')) {
            let path = `${folderPath.replace(/\/$/, '')}/${viewName}.${ext}`;
            if (path.slice(0, 1) === '/') path = path.slice(1);
            viewObj = {
              rootDir: dir,
              folder: folderPath.replace(/\/$/, ''),
              view: viewName,
              extension: ext,
              path
            };
            break;
          }
        }
      }

      if (!viewObj.view || !viewObj.rootDir || !viewObj.path) {
        return reject(
          `It seems that the passed view "<cyan>${viewPath}</cyan>" does not exist in any specified views directories:

          - ${rootDirectories.join('\n- ')}
          `
        );
      }

      // throw __toString(viewObj);

      // // check if we don't have data passed to check if we can
      // // grab them from a json or js file
      // if (!data) {
      //   const jsFilePath = __path.resolve(rootDir, viewToCompileWithoutExt) + '.js';
      //   const jsonFilePath =
      //     __path.resolve(rootDir, viewToCompileWithoutExt) + '.json';
      //   if (__fs.existsSync(jsFilePath)) {
      //     data = require(jsFilePath);
      //   } else if (__fs.existsSync(jsonFilePath)) {
      //     data = require(jsonFilePath);
      //   }
      // }

      // get the engine to compile the view
      const engineFn = engines[viewObj.extension.toLowerCase()];
      if (!engineFn) {
        throw new __SError(
          `You try to render the view "<primary>${
            viewObj.path
          }</primary>" but these kind of views are not supported yet. Please use one of these views formats: "<cyan>${Object.keys(
            engines
          ).join(', ')}</cyan>"...`
        );
      }

      // process to the rendering
      const result = await engineFn(viewObj.path, data, {
        ...settings,
        rootDir: viewObj.rootDir
      });

      // // return the result
      resolve(result);
    },
    {
      id: 'template.render'
    }
  );
};
