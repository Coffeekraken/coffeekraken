const __sugarConfig = require('../config/sugar');
const __getFilename = require('../fs/filename');
const __fs = require('fs');
const __path = require('path');
const __getExt = require('../fs/extension');

/**
 * @name              render
 * @namespace         node.template
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
 * - No settings for now...
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
module.exports = async function render(viewPath, data = null, settings = {}) {
  const engines = {
    'blade.php': require('./bladePhp')
  };

  // listing the files available in the passed view folder
  const rootDir = __sugarConfig('views.rootDir');
  let viewDir = viewPath;
  Object.keys(engines).forEach((ext) => {
    viewDir = viewDir.replace(`.${ext}`, '');
  });
  viewDir = viewDir.split('.').join('/');
  const viewName = __getFilename(viewDir).trim();
  const folderPath = viewDir.replace(viewName, '').trim();

  // list all the files in the folder
  const viewToCompile = `${folderPath}${
    __fs.readdirSync(__path.resolve(rootDir, folderPath)).filter((file) => {
      // get the filename
      const filename = __getFilename(file);
      const ext = filename.split('.').slice(1).join('.');
      if (viewName === filename.replace(`.${ext}`, '')) {
        return true;
      }
      return false;
    })[0]
  }`;

  const viewToCompileExt = viewToCompile.split('.').slice(1).join('.');
  const viewToCompileWithoutExt = viewToCompile.replace(
    `.${viewToCompileExt}`,
    ''
  );

  // check if we don't have data passed to check if we can
  // grab them from a json or js file
  if (!data) {
    const jsFilePath = __path.resolve(rootDir, viewToCompileWithoutExt) + '.js';
    const jsonFilePath =
      __path.resolve(rootDir, viewToCompileWithoutExt) + '.json';
    if (__fs.existsSync(jsFilePath)) {
      data = require(jsFilePath);
    } else if (__fs.existsSync(jsonFilePath)) {
      data = require(jsonFilePath);
    }
  }

  // get the engine to compile the view
  const engineFn = engines[viewToCompileExt.toLowerCase()];
  if (!engineFn) {
    throw new Error(
      `You try to render the view "<primary>${viewToCompile}</primary>" but these kind of views are not supported yet. Please use one of these views formats: "<cyan>${Object.keys(
        engines
      ).join(', ')}</cyan>"...`
    );
  }

  // process to the rendering
  const result = await engineFn(viewToCompile, data, settings);

  // return the result
  return result;
};
