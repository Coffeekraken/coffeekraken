// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import * as __esbuild from 'esbuild';
import __glob from 'glob';
import __path from 'path';
import __resolve from 'resolve';
import __isGlob from '../../../shared/is/glob';
import __deepMerge from '../../../shared/object/deepMerge';
import __filter from '../../../shared/object/filter';
import __absolute from '../../../shared/path/absolute';
import __SDuration from '../../../shared/time/SDuration';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __builtInNodeModules from '../../module/buildInNodeModules';
import __packageRoot from '../../path/packageRoot';
import __SJsCompilerParamsInterface from './interface/SJsCompilerParamsInterface';

export interface ISJsCompilerCtorSettings {
  jsCompiler?: Partial<ISJsCompilerSettings>;
}
export interface ISJsCompilerSettings {}

export interface ISJsCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  bundle: boolean;
  map: boolean;
  prod: boolean;
  stripComments: boolean;
  minify: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  serve: boolean;
  port: number;
  host: string;
  esbuild: any;
}

export type ISJsCompiler = ISCompiler;

/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "esbuild" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISJsCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/scss/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.esbuild');
 *
 * @see             https://www.npmjs.com/package/esbuild
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends __SCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SJsCompilerParamsInterface
    }
  };

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
    name: 'SJsFileEsBuildResolvePlugin',
    setup(build) {
      Object.keys(__builtInNodeModules).forEach((path) => {
        const builtInObj = __builtInNodeModules[path];
        if (builtInObj.polyfill && builtInObj.polyfill.browser) {
          build.onResolve({ filter: new RegExp(`^${path}$`) }, (args) => {
            const resolvedPath = __resolve.sync(builtInObj.polyfill.browser, {
              basedir: _rootDir,
              moduleDirectory: [
                'node_modules',
                __path.resolve(__packageRoot(__dirname), 'node_modules')
              ],
              // @ts-ignore
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
   * @name      jsCompilerSettings
   * @type      ISJsCompilerSettings
   * @get
   *
   * Access to the esbuild compiler settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get jsCompilerSettings(): ISJsCompilerSettings {
    return (<any>this)._settings.esbuildCompiler;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams: Partial<ISJsCompilerParams>,
    settings: ISJsCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          esbuildCompiler: {}
        },
        settings || {}
      )
    );
  }

  /**
   * @name              _compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(
    params: ISJsCompilerParams,
    settings: Partial<ISJsCompilerSettings> = {}
  ) {
    return new __SPromise(({ resolve, reject, pipe, emit }) => {
      (async () => {
        settings = __deepMerge(this.jsCompilerSettings, {}, settings);

        let input = Array.isArray(params.input) ? params.input : [params.input];

        // prod
        if (params.prod || params.bundle) {
          params.minify = true;
          params.stripComments = true;
          params.map = false;
        }

        const esbuildParams: any = {
          charset: 'utf8',
          format: 'iife',
          logLevel: 'silent',
          ...__filter(params, (key, value) => {
            if (Array.isArray(value) && !value.length) return false;
            return (
              (<any>this.constructor)._esbuildAcceptedSettings.indexOf(key) !==
              -1
            );
          }),
          bundle: params.bundle,
          write: params.save,
          // outfile: 'out.js',
          outdir: params.outputDir,
          minify: params.minify,
          sourcemap: params.map,
          ...params.esbuild
        };

        let filesPaths: string[] = [];
        // make input absolute
        input = __absolute(input);
        // process inputs
        input.forEach((inputStr) => {
          if (__isGlob(inputStr)) {
            filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
          } else {
            filesPaths.push(inputStr);
          }
        });

        // set the entrypoints
        esbuildParams.entryPoints = filesPaths;

        console.log(esbuildParams);

        const esbuildService = await __esbuild.startService();
        const esbuildResult = await esbuildService.build(esbuildParams);
        console.log(esbuildResult);

        const resultsObj = {};
        const duration = new __SDuration();

        // for (let i = 0; i < filesPaths.length; i++) {
        //   let filePath = filesPaths[i];
        //   let file = new __SJsFile(filePath, {
        //     jsFile: {
        //       compile: settings
        //     }
        //   });
        //   pipe(file);

        //   const resPromise = file.compile(params, {
        //     ...settings
        //   });
        //   const res = await resPromise;
        //   resultsObj[file.path] = res;
        // }

        // resolve with the compilation result
        if (!params.watch) {
          resolve({
            files: resultsObj,
            ...duration.end()
          });
        } else {
          emit('files', {
            files: resultsObj,
            ...duration.end()
          });
        }
      })();
    });
  }
}

export default SJsCompiler;
