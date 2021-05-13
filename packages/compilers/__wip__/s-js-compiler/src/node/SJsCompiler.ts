import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SDuration from '@coffeekraken/s-duration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SCompiler, { ISCompiler } from '@coffeekraken/s-compiler';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
import __dependencyTree from 'dependency-tree';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __SFile from '@coffeekraken/s-file';

import __path from 'path';
import __fs from 'fs';
import __filter from '@coffeekraken/sugar/shared/object/filter';
// import __esbuildAggregateLibsPlugin from '../esbuild/plugins/aggregateLibs';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __dependencyList from '@coffeekraken/sugar/node/fs/dependencyList';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';

import * as __esbuild from 'esbuild';
import __rollup from 'rollup';

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
    initialParams?: Partial<ISJsCompilerParams>,
    settings?: ISJsCompilerCtorSettings
  ) {
    super(
      initialParams ?? {},
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

        emit('log', {
          group: 's-js-compiler',
          value: 'Starting <yellow>JS</yellow> file(s) compilation process...'
        });

        // prod
        if (params.prod) {
          params.minify = true;
        }

        if (params.bundle) {
          emit('log', {
            group: 's-js-compiler',
            value: `<cyan>[bundle]</cyan> Bundling application`
          });

          if (input && input.length > 1) {
            throw new Error(
              `<red>[${this.constructor.name}]</red> When using the <yellow>--bundle</yellow> option, you MUST specify <cyan>1 input</cyan> only...`
            );
          }
          if (!__fs.existsSync(input[0])) {
            throw new Error(
              `<red>[${this.constructor.name}]</red> The file you want to bundle "<cyan>${input[0]}</cyan>" does not exists...`
            );
          }

          const fileToCompile = __SFile.new(input[0]);

          if (params.watch) {
            const dependencyListPromise = __dependencyList(input[0], {
              exclude: ['**/node_modules/**'],
              watch: true,
              ignoreInitial: true
            });
            dependencyListPromise.on('update', async ({ list, path }) => {
              emit('log', {
                group: 's-js-compiler',
                value: `<yellow>[dependency]</yellow> Dependency updated`
              });
              const res = await this._compileInternal(
                [fileToCompile],
                params,
                emit
              );
              if (res instanceof Error) throw res;

              emit('log', {
                group: 's-js-compiler',
                value: `<blue>[watch]</blue> Watching for changes...`
              });
            });
          } else {
            const color = __getColorFor(input[0]);

            const res = await this._compileInternal(
              [fileToCompile],
              params,
              emit
            );
            if (res instanceof Error) throw res;
          }
        } else {
          const pool = __fsPool(input, {
            watch: params.watch
          });
          on('finally', () => {
            pool.cancel();
          });

          pool.on(params.watch ? 'update' : 'files', async (files, m) => {
            pool.cancel();

            files = Array.isArray(files) ? files : [files];

            const res = await this._compileInternal(files, params, emit);
            if (res instanceof Error) throw res;

            if (params.watch) {
              emit('log', {
                group: 's-js-compiler',
                value: `<blue>[watch]</blue> Watching for changes...`
              });
            } else {
              resolve(res);
            }
          });
        }

        if (params.watch) {
          emit('log', {
            group: 's-js-compiler',
            value: `<blue>[watch]</blue> Watching for changes...`
          });
        }
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }

  async _compileInternal(files, params, emit) {
    emit('log', {
      group: 's-js-compiler',
      type: 'verbose',
      value: `<yellow>[compile]</yellow> Start compiling <yellow>${
        files.length
      }</yellow> file${files.length > 1 ? 's' : ''}`
    });

    const duration = new __SDuration();

    const logPlugin = {
      name: 'logPlugin',
      setup(build) {
        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.js$/ }, async (args) => {
          const mtime = __fs.statSync(args.path).mtimeMs;
          const text = __fs.readFileSync(args.path, 'utf8');

          return {
            contents: text
          };
        });
      }
    };

    const rollupInputParams: any = {
      input: files.map((f) => f.path)
    };

    const rollupOutputParams: any = {
      dir: params.bundle ? undefined : params.outDir,
      file: params.bundle
        ? __path.resolve(
            params.outDir,
            `${files[0].nameWithoutExt}${params.bundleSuffix}.js`
          )
        : undefined,
      format: params.format,
      banner: params.banner,
      sourcemap: params.map
    };

    const esbuildParams: any = {
      charset: 'utf8',
      format: params.format,
      logLevel: 'info',
      outdir: params.bundle ? undefined : params.outDir,
      outfile: params.bundle
        ? __path.resolve(
            params.outDir,
            `${files[0].nameWithoutExt}${params.bundleSuffix}.js`
          )
        : undefined,
      platform: params.platform,
      outbase: params.inDir,
      banner: params.banner,
      incremental: true,
      entryPoints: files.map((f) => f.path),
      bundle: params.bundle,
      write: true,
      errorLimit: 100,
      minify: params.minify,
      sourcemap: params.map,
      watch: false,
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
      // console.log(rollupInputParams, rollupOutputParams);

      resultObj = await __esbuild.build(esbuildParams);
      // const rollupPromise = await __rollup.rollup(rollupInputParams);
      // const { output } = await rollupPromise.generate(rollupOutputParams);
      // console.log(output);
      // return;
    } catch (e) {
      console.log('EERER', e);
      return e;
    }

    if (files.length === 1) {
      emit('log', {
        group: 's-js-compiler',
        value: `<green>[save]</green> File "<cyan>${
          files[0].relPath
        }</cyan>" saved under "<magenta>${__path.relative(
          params.rootDir,
          `${params.outDir}/${files[0].path.replace(params.inDir, '')}`
        )}</magenta>"`
      });
    }

    emit('log', {
      group: 's-js-compiler',
      value: `<green>[success]</green> <yellow>${files.length}</yellow> file${
        files.length > 1 ? 's' : ''
      } compiled <green>successfully</green> in <yellow>${
        duration.end().formatedDuration
      }</yellow>`
    });

    return {
      ...resultObj,
      ...duration.end()
    };
  }
}

export default SJsCompiler;
