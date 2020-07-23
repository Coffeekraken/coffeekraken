const __execPhp = require('exec-php');
const __deepMerge = require('../object/deepMerge');
const __sugarConfig = require('../config/sugar');
const __fs = require('fs');
const __path = require('path');

/**
 * @name                      bladePhp
 * @namespace                 node.template
 * @type                      Function
 *
 * Compile a blade php view and return a promise with the
 * resulting template
 *
 * @param    {String}               view                            relative path to the view to render
 * @param    {Object}               [data={}]                        The data to pass to the view
 * @param     {Object}              [settings={}]                     A settings object to configure your blade compilation
 * - rootDir (__sugarConfig('views.rootDir')) {String}: Specify the root views folder
 * - cacheDir (__sugarConfig('views.cacheDir')) {String}: Specify the root views cache folder
 * @return    {Promise}                                                A promise with the template result passed in
 *
 * @example    js
 * const bladePhp = require('@coffeekraken/sugar/template/bladePhp');
 * bladePhp('my-cool-view', {
 *   hello: 'World'
 * }).then((result) => {
 *   // do something with the result
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (view, data = {}, settings = {}) => {
  settings = __deepMerge(
    {
      rootDir: __sugarConfig('views.rootDir'),
      cacheDir: __sugarConfig('views.cacheDir')
    },
    settings
  );

  const sugarViewsDir = __path.resolve(`${__dirname}/../../php/views`);

  // const viewPath = `${settings.rootDir}/${view
  //   .replace('.blade.php', '')
  //   .split('.')
  //   .join('/')}.blade.php`;
  // const sugarViewPath = `${sugarViewsDir}/${view
  //   .replace('.blade.php', '')
  //   .split('.')
  //   .join('/')}.blade.php`;

  // if (!__fs.existsSync(viewPath)) {
  //   if (!__fs.existsSync(sugarViewPath)) {
  //     throw new Error(
  //       `It seems thats the view "<primary>${view}</primary>" does not exists either in your project views folder "<cyan>${settings.rootDir}</cyan>", nor in the Sugar package folder "<magenta>${sugarViewsDir}</magenta>"...`
  //     );
  //   }
  //   settings.rootDir = sugarViewsDir;
  // }

  if (!__fs.existsSync(settings.cacheDir)) __fs.mkdirSync(settings.cacheDir);

  return new Promise((resolve, reject) => {
    // preparing the php execution
    __execPhp(
      __dirname + '/bladePhp/compile.php',
      __dirname + '/../../bin/php',
      (error, php, outprint) => {
        if (error) {
          throw new Error(error);
        }
        // execute the php engine and get back the result
        php.compile(
          [settings.rootDir, sugarViewsDir, '/'],
          view.replace('.blade.php', '').split('/').join('.'),
          data,
          settings.cacheDir,
          (error, result, output, printed) => {
            // get the best result possible
            const ret = result || printed || output || error;
            // resolve the promise with the best result possible
            resolve(ret);
          }
        );
      }
    );
  });
};
