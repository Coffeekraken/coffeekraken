// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __esbuild from 'esbuild';
import __builtInNodeModules from '../module/buildInNodeModules';
import __resolve from 'resolve';
import __filter from '../object/filter';
import __SBuildJsInterface from './build/interface/SBuildJsInterface';
import __esbuildScssLoaderPlugin from './build/plugins/esbuild/esbuildScssLoaderPlugin';

/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js
 * @type                Class
 * @wip
 *
 * This class wrap the "esbuild" compiler with some additional features to compile your js files
 * quicky and efficiently
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 10-100x faster
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 * *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/scss/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://github.com/evanw/esbuild
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _rootDir;

export = class SJsCompiler {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the instance settings
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name            _resolverPlugin
   * @type            Object
   * @static
   *
   * ESBuild resolver plugin
   *
   * @since       2.0.0
   */
  static _resolverPlugin = {
    name: 'SFrontendServerEsBuildResolvePlugin',
    setup(build) {
      Object.keys(__builtInNodeModules).forEach((path) => {
        const builtInObj = __builtInNodeModules[path];
        if (builtInObj.polyfill && builtInObj.polyfill.browser) {
          build.onResolve({ filter: new RegExp(`^${path}$`) }, (args) => {
            let resolvedPath = __resolve.sync(builtInObj.polyfill.browser, {
              basedir: _rootDir,
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
   * @name            _esbuildAcceptedSettings
   * @type            Array
   * @static
   *
   * This static property store all the accepted esbuild options keys
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _esbuildAcceptedSettings = [
    'bundle',
    'define',
    'external',
    'format',
    'globalName',
    'inject',
    'jsxFactory',
    'jsxFragment',
    'platform',
    'loader',
    'minify',
    'outdir',
    'outfile',
    'sourcemap',
    'target',
    'write',
    'avoidTDZ',
    // 'banner',
    'charset',
    'color',
    'errorLimit',
    'footer',
    'keepNames',
    'logLevel',
    'mainFields',
    'metafile',
    'outExtension',
    'plugins',
    'outbase',
    'publicPath',
    'pure',
    'resolveExtensions',
    'sourcefile',
    'stdin',
    'tsconfig',
    'tsconfigRaw'
  ];

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    this._settings = __deepMerge(
      {
        id: this.constructor.name,
        ...__SBuildJsInterface.getDefaultValues(),
        plugins: []
      },
      settings
    );

    this._settings.plugins.unshift(this.constructor._resolverPlugin);
    this._settings.plugins.unshift(__esbuildScssLoaderPlugin);

    // prod
    if (this._settings.prod) {
      this._settings.bundle = true;
      this._settings.minify = true;
    }
  }

  /**
   * @name              compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {String}            filePath          The source you want to compile. Must be a file path
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  compile(filePath, settings = {}) {
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        settings = __deepMerge(this._settings, settings);

        _rootDir = settings.rootDir;
        const banner = settings.banner || '';

        settings = __filter(settings, (key, value) => {
          if (Array.isArray(value) && !value.length) return false;
          return this.constructor._esbuildAcceptedSettings.indexOf(key) !== -1;
        });

        const startTime = Date.now();

        const buildService = await __esbuild.startService();
        buildService
          .build({
            ...settings,
            entryPoints: [filePath],
            logLevel: 'silent',
            write: false,
            sourcemap: settings.map,
            charset: 'utf8'
          })
          .then((resultObj) => {
            // resolve with the compilation result
            resolve({
              js: `
                ${banner}
                let process = {};
                ${resultObj.outputFiles[0].text}
              `,
              startTime: startTime,
              endTime: Date.now(),
              duration: Date.now() - startTime
            });
          });
      },
      {
        id: this._settings.id
      }
    );
  }
}
