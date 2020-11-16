const __SPromise = require('../../../promise/SPromise');
const __sugarConfig = require('../../../config/sugar');
const __resolve = require('resolve');
const __builtInNodeModules = require('../../../module/buildInNodeModules');
const __esbuild = require('esbuild');
const __SDuration = require('../../../time/SDuration');
const rootDir = __sugarConfig('frontend.rootDir');

let exampleOnResolvePlugin = {
  name: 'SFrontendServerEsBuildResolvePlugin',
  setup(build) {
    Object.keys(__builtInNodeModules).forEach((path) => {
      const builtInObj = __builtInNodeModules[path];
      if (builtInObj.polyfill && builtInObj.polyfill.browser) {
        build.onResolve({ filter: new RegExp(`^${path}$`) }, (args) => {
          let resolvedPath = __resolve.sync(builtInObj.polyfill.browser, {
            basedir: rootDir,
            moduleDirectory: ['node_modules'],
            includeCoreModules: false,
            preserveSymlinks: true,
            packageFilter: (pkg, dir) => {
              if (pkg.browser) {
                if (typeof pkg.browser === 'string') {
                  pkg.main = pkg.browser;
                } else if (typeof pkg.browser === 'object') {
                  pkg.main = pkg.browser[Object.keys(pkg.browser)[0]];
                }
              }
              return pkg;
            }
          });
          return { path: resolvedPath };
        });
      }
    });
  }
};

/**
 * @name                js
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function js(req, res, settings = {}) {
  let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
  const duration = new __SDuration();
  const buildService = await __esbuild.startService();
  buildService
    .build({
      entryPoints: [filePath],
      platform: 'browser',
      bundle: true,
      logLevel: 'silent',
      // format: 'esm',
      mainFields: ['browser', 'main'],
      write: false,
      plugins: [exampleOnResolvePlugin]
      // outfile: 'out.js'
    })
    .then((myRes) => {
      if (settings.log) {
        console.log(
          `<bgGreen><black> js </black></bgGreen> Js file "<yellow>${
            req.path
          }</yellow> served in <cyan>${duration.end()}s</cyan>"`
        );
      }

      res.type('text/javascript');
      res.status(200);
      res.send(`
        const process = {};
        ${myRes.outputFiles[0].text}
      `);
    });
};
