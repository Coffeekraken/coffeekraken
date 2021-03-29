import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SDuration from '@coffeekraken/sugar/shared/time/SDuration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SFile from '@coffeekraken/sugar/node/fs/SFile';
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
  outputDir: string;
  rootDir: string;
  bundle: boolean;
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

        emit('log', {
          value: 'Starting <yellow>JS</yellow> file(s) compilation...'
        });

        if (params.watch) {
          emit('log', {
            value: `<blue>[watch]</blue> Watching for changes...`
          });
        }

        // prod
        if (params.prod) {
          params.minify = true;
        }

        // let updatedFilesPool;
        // if (params.outDir) {
        //   updatedFilesPool = __fsPool(`${params.outDir}/**/*.js`, {
        //     watch: true
        //   }).on('update', (files) => {
        //     console.log('files', files);
        //   });
        // }

        const pool = __fsPool(input, {
          watch: false
        });

        // handle cancel
        on('finally', () => {
          // updatedFilesPool?.cancel();
          pool.cancel();
        });

        const updateTimestamps = {};

        const interceptPlugin = {
          name: 'interceptPlugin',
          setup(build) {
            // Load ".txt" files and return an array of words
            build.onLoad({ filter: /\.js$/ }, async (args) => {
              const mtime = __fs.statSync(args.path).mtimeMs;
              const text = __fs.readFileSync(args.path, 'utf8');

              if (
                !updateTimestamps[args.path] ||
                updateTimestamps[args.path] !== mtime
              ) {
                emit('log', {
                  value: `<yellow>[update]</yellow> File "<cyan>${__path.relative(
                    params.rootDir,
                    args.path
                  )}</cyan>"`
                });
              }
              updateTimestamps[args.path] = mtime;

              return {
                contents: text,
                loader: 'js'
              };
            });
          }
        };

        pool.on('files', async (files) => {
          const duration = new __SDuration();

          files = Array.isArray(files) ? files : [files];

          // for (let i = 0; i < files.length; i++) {
          // const file = files[i];

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

          // let outFile;
          // if (params.save && params.outDir) {
          //   const relSrcPath = __path.relative(params.inDir, file.path);
          //   const outFilePath = __path.resolve(params.outDir, relSrcPath);
          //   outFile = outFilePath;
          // }

          const esbuildParams: any = {
            charset: 'utf8',
            format: params.format,
            logLevel: 'silent',
            outdir: params.outDir,
            outbase: params.inDir,
            banner: params.banner,
            // incremental: true,
            ...__filter(params, (key, value) => {
              if (Array.isArray(value) && !value.length) return false;
              return SJsCompiler._esbuildAcceptedSettings.indexOf(key) !== -1;
            }),
            entryPoints: files.map((f) => f.path),
            bundle: params.bundle,
            write: true,
            watch: params.watch
              ? {
                  onRebuild(error, result) {
                    if (error) {
                      emit('error', {
                        value: error
                      });
                      return;
                    }

                    // if (resultObj.outputFiles) {
                    //   resultObj.outputFiles.forEach((fileObj) => {
                    //     let filePath = fileObj.path;
                    //     let content = fileObj.text;
                    //     if (params.bundle && params.bundleSuffix) {
                    //       if (filePath.match(/\.js\.map$/)) {
                    //         filePath = filePath.replace(
                    //           /\.js\.map$/,
                    //           `${params.bundleSuffix}.js.map`
                    //         );
                    //       } else {
                    //         filePath = filePath.replace(
                    //           /\.js$/,
                    //           `${params.bundleSuffix}.js`
                    //         );
                    //       }
                    //       content = content.replace(
                    //         `//# sourceMappingURL=${__getFilename(
                    //           fileObj.path
                    //         )}`,
                    //         `//# sourceMappingURL=${__getFilename(filePath)}`
                    //       );
                    //     }
                    //     console.log('WRINTING', filePath, content);
                    //     __fs.writeFileSync(filePath, content);
                    //     const file = __SFile.new(filePath);
                    //     emit('log', {
                    //       type: 'file',
                    //       file,
                    //       action: 'save'
                    //     });
                    //   });
                    // }
                    emit('log', {
                      value: `<blue>[watch]</blue> Watching for changes...`
                    });
                  }
                }
              : false,
            errorLimit: 100,
            minify: params.minify,
            sourcemap: params.map,
            plugins: [
              interceptPlugin
              // __esbuildAggregateLibsPlugin({
              //   outputDir: params.outputDir,
              //   rootDir: params.rootDir
              // })
            ],
            ...params.esbuild
          };

          let resultObj;
          try {
            resultObj = await __esbuild.build(esbuildParams);
          } catch (e) {
            // return reject(e);
          }

          // if (resultObj.outputFiles) {
          //   resultObj.outputFiles.forEach((fileObj) => {
          //     let filePath = fileObj.path;
          //     let content = fileObj.text;
          //     if (params.bundle && params.bundleSuffix) {
          //       if (filePath.match(/\.js\.map$/)) {
          //         filePath = filePath.replace(
          //           /\.js\.map$/,
          //           `${params.bundleSuffix}.js.map`
          //         );
          //       } else {
          //         filePath = filePath.replace(
          //           /\.js$/,
          //           `${params.bundleSuffix}.js`
          //         );
          //       }
          //       content = content.replace(
          //         `//# sourceMappingURL=${__getFilename(fileObj.path)}`,
          //         `//# sourceMappingURL=${__getFilename(filePath)}`
          //       );
          //     }
          //     __fs.writeFileSync(filePath, content);
          //     const file = __SFile.new(filePath);
          //     emit('log', {
          //       type: 'file',
          //       file,
          //       action: 'save'
          //     });
          //   });
          // }

          // if (outFile) {
          //   const file = __SFile.new(outFile);
          //   emit('log', {
          //     type: 'file',
          //     file,
          //     action: 'save'
          //   });
          // }

          // if (resultObj.warnings.length) {
          //   resultObj.warnings.forEach((warningObj) => {
          //     emit('warn', {
          //       value: warningObj.text
          //     });
          //   });
          // }

          // compiledFiles.push({
          //   path: outputPath,
          //   js: result.js.code,
          //   css: result.css.code,
          //   warnings: result.warnings
          // });
          // }

          if (params.watch) {
            emit('log', {
              value: `<blue>[watch]</blue> Watching for changes...`
            });
          } else {
            resolve({
              // files: compiledFiles,
              files: {},
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
