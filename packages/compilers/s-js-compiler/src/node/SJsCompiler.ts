import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SDuration from '@coffeekraken/s-duration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SCompiler, {
  ISCompiler
} from '@coffeekraken/sugar/node/compiler/SCompiler';
import __availableColors from '@coffeekraken/sugar/shared/dev/colors/availableColors';
import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';

import * as __esbuild from 'esbuild';
import __path from 'path';
import __fs from 'fs';
import __filter from '@coffeekraken/sugar/shared/object/filter';
// import __esbuildAggregateLibsPlugin from '../esbuild/plugins/aggregateLibs';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';

import __SJsCompilerInterface from './interface/SJsCompilerInterface';

export interface ISJsCompilerParams {
  input: string | string[];
  outDir: string;
  inDir: string;
  rootDir: string;
  bundle: boolean;
  bundleSuffix: string;
  format: 'iife' | 'cjs' | 'esm';
  map: boolean;
  prod: boolean;
  stripComments: boolean;
  minify: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  esbuild: any;
}

export interface ISJsCompilerCtorSettings {
  jsCompiler?: Partial<ISJsCompilerSettings>;
}
export interface ISJsCompilerSettings {}

export interface ISJsCompilerCtor {
  new (initialParams: any, settings?: ISJsCompilerCtorSettings): ISJsCompiler;
}

export type ISJsCompiler = ISCompiler;

/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "js" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param           {Partial<ISJsCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/js/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends __SCompiler implements ISCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SJsCompilerInterface
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
   * @name          jsCompilerSettings
   * @type          ISJsCompilerSettings
   * @get
   *
   * Access the js compiler settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get jsCompilerSettings(): ISJsCompilerSettings {
    return (<any>this)._settings.jsCompiler;
  }

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
  constructor(
    initialParams: Partial<ISJsCompilerParams>,
    settings: ISJsCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          jsCompiler: {}
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
  _filesColor: Record<string, any> = {};
  _compile(
    params: ISJsCompilerParams,
    settings: Partial<ISJsCompilerSettings> = {}
  ) {
    return new __SPromise(
      async ({ resolve, reject, pipe, emit, on }) => {
        const set = __deepMerge(this.jsCompilerSettings, {}, settings);

        const input = Array.isArray(params.input)
          ? params.input
          : [params.input];

        let isFirstCompilation = true,
          lastCompiledFilePath;

        emit('log', {
          value: 'Starting <yellow>JS</yellow> file(s) compilation...'
        });

        // prod
        if (params.prod) {
          params.minify = true;
        }

        const pool = __fsPool(input, {
          watch: false
        });
        on('finally', () => {
          pool.cancel();
        });

        const updateTimestamps = {};
        const logPlugin = {
          name: 'logPlugin',
          setup(build) {
            // Load ".txt" files and return an array of words
            build.onLoad({ filter: /\.(j|t)s$/ }, async (args) => {
              const mtime = __fs.statSync(args.path).mtimeMs;
              const text = __fs.readFileSync(args.path, 'utf8');

              if (
                !updateTimestamps[args.path] ||
                updateTimestamps[args.path] !== mtime
              ) {
                lastCompiledFilePath = args.path;

                emit('log', {
                  value: `<yellow>[${
                    isFirstCompilation ? 'compile' : 'update'
                  }]</yellow> File "<cyan>${__path.relative(
                    params.rootDir,
                    args.path
                  )}</cyan>"`
                });
              }
              updateTimestamps[args.path] = mtime;

              return {
                contents: text
              };
            });
          }
        };

        pool.on('files', async (files) => {
          const duration = new __SDuration();

          files = Array.isArray(files) ? files : [files];

          const color =
            this._filesColor[
              files.length === 1
                ? __getFilename(files[0].path)
                : files.length + ' files'
            ] ?? __pickRandom(__availableColors());
          this._filesColor[
            files.length === 1
              ? __getFilename(files[0].path)
              : files.length + ' files'
          ] = color;

          emit('log', {
            value: `<${color}>[${
              files.length === 1
                ? __getFilename(files[0].path)
                : files.length + ' files'
            }]</${color}> Starting compilation`
          });

          const esbuildParams: any = {
            charset: 'utf8',
            format: params.format,
            logLevel: 'error',
            outdir: params.outDir,
            outbase: params.inDir,
            banner: params.banner,
            incremental: true,
            entryPoints: files.map((f) => f.path),
            bundle: params.bundle,
            write: true,
            errorLimit: 100,
            minify: params.minify,
            sourcemap: params.map,
            watch: params.watch
              ? {
                  onRebuild(error, result) {
                    if (error) {
                      emit('error', {
                        value: error
                      });
                      return;
                    }

                    isFirstCompilation = false;

                    let logValue = `<green>[success]</green> <${color}>${
                      files.length === 1
                        ? __getFilename(files[0].path)
                        : files.length + ' files'
                    }</${color}> compiled`;
                    if (!isFirstCompilation && lastCompiledFilePath) {
                      logValue = `<green>[success]</green> File "<cyan>${__path.relative(
                        params.rootDir,
                        lastCompiledFilePath
                      )}</cyan>" compiled`;
                    }

                    emit('log', {
                      value: logValue
                    });
                    emit('log', {
                      value: `<blue>[watch]</blue> Watching for changes...`
                    });
                  }
                }
              : false,

            ...params.esbuild,
            plugins: [
              logPlugin,
              ...(params.esbuild.plugins ?? [])
              // __esbuildAggregateLibsPlugin({
              //   outputDir: params.outputDir,
              //   rootDir: params.rootDir
              // })
            ]
          };

          let resultObj;
          try {
            resultObj = await __esbuild.build(esbuildParams);
          } catch (e) {
            return reject(e);
          }

          emit('log', {
            value: `<green>[success]</green> <${color}>${
              files.length === 1
                ? __getFilename(files[0].path)
                : files.length + ' files'
            }</${color}> compiled`
          });

          if (params.watch) {
            emit('log', {
              value: `<blue>[watch]</blue> Watching for changes...`
            });
          } else {
            resolve({
              // files: compiledFiles,
              ...resultObj,
              ...duration.end()
            });
          }
        });
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
}

export default SJsCompiler;
