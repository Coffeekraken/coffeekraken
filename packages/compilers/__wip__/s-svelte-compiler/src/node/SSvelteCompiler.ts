// @ts-nocheck

import __SCompiler, { ISCompiler } from '@coffeekraken/s-compiler';
import __SDuration from '@coffeekraken/s-duration';
import __SPostcssCompiler from '@coffeekraken/s-postcss-compiler';
import __SPromise from '@coffeekraken/s-promise';
import __STsCompiler from '@coffeekraken/s-ts-compiler';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packagepackageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __cleanCss from 'clean-css';
import __path from 'path';
import __uglify from 'uglify-js';
import __SSvelteCompilerInterface from './interface/SSvelteCompilerInterface';

// @ts-ignore
const __svelte = require('svelte/compiler'); // eslint-disable-line

export interface ISSvelteCompilerCtorSettings {
  svelteCompiler?: Partial<ISSvelteCompilerSettings>;
}
export interface ISSvelteCompilerSettings {}

export interface ISSvelteCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  map: boolean;
  prod: boolean;
  stripComments: boolean;
  minify: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  svelte: any;
}

export type ISSvelteCompiler = ISCompiler;

/**
 * @name                SSvelteCompiler
 * @namespace           sugar.node.svelte
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "svelte" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISSvelteCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISSvelteCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSvelteCompiler from '@coffeekraken/sugar/node/scss/compile/SSvelteCompiler';
 * const compiler = new SSvelteCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.svelte');
 *
 * @see             https://svelte.dev/docs#Compile_time
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompiler extends __SCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SSvelteCompilerInterface
    }
  };

  /**
   * @name      svelteCompilerSettings
   * @type      ISSvelteCompilerSettings
   * @get
   *
   * Access to the svelte compiler settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteCompilerSettings(): ISSvelteCompilerSettings {
    return (<any>this)._settings.svelteCompiler;
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
    initialParams?: Partial<ISSvelteCompilerParams>,
    settings?: ISSvelteCompilerCtorSettings
  ) {
    super(
      initialParams ?? {},
      __deepMerge(
        {
          metas: {
            color: 'red'
          },
          svelteCompiler: {}
        },
        settings ?? {}
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
  _filesColor: Record<string, string> = {};
  _compile(
    params: ISSvelteCompilerParams,
    settings: Partial<ISSvelteCompilerSettings> = {}
  ) {
    return new __SPromise(
      async ({ resolve, reject, pipe, emit, on }) => {
        settings = __deepMerge(this.svelteCompilerSettings, {}, settings);

        let result;

        const input = Array.isArray(params.input)
          ? params.input
          : [params.input];

        emit('log', {
          group: 's-svelte-compiler',
          value: 'Starting <red>Svelte</red> file(s) compilation process...'
        });

        // if (params.watch) {
        //   emit('log', {
        //     value: `<blue>[watch]</blue> Watching for changes...`
        //   });
        // }

        // prod
        if (params.prod) {
          params.minify = true;
        }

        const pool = __fsPool(input, {
          watch: params.watch
        });

        on('finally', () => {
          pool.cancel();
        });

        pool.on('files,update', async (files) => {
          const compiledFiles = [];

          const duration = new __SDuration();

          files = Array.isArray(files) ? files : [files];

          for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const color =
              this._filesColor[file.path] ?? __pickRandom(__availableColors());
            this._filesColor[file.path] = color;

            emit('log', {
              group: 's-svelte-compiler',
              value: `<${color}>[${__getFilename(
                file.path
              )}]</${color}> Starting compilation`
            });

            // preprocess
            try {
              const preprocessResult = await __svelte.preprocess(
                file.content,
                {
                  style: async (input) => {
                    // write a temp file to compile
                    const tmpCssFilePath = `${__packagepackageTmpDir()}/SSvelteCompiler/${Date.now()}.css`;
                    __writeFileSync(`${tmpCssFilePath}`, input.content);

                    const compiler = new __SPostcssCompiler(
                      {},
                      {
                        postcssCompiler: {
                          pluginsSettings: {
                            sugar: {
                              target: 'component'
                            }
                          }
                        }
                      }
                    );

                    const res = await compiler.compile({
                      input: [tmpCssFilePath],
                      save: false
                    });

                    if (!res || !res.files || !res.files.length) {
                      return {
                        code: input.content
                      };
                    }

                    // remove temp file
                    __removeSync(tmpCssFilePath);

                    return {
                      code: res.files[0].css
                    };
                  },
                  script: async (input) => {
                    if (
                      !input.attributes ||
                      !input.attributes.type ||
                      input.attributes.type !== 'text/ts'
                    ) {
                      return {
                        code: input.content
                      };
                    }

                    // write a temp file to compile
                    const tmpTsFilePath = `${__packagepackageTmpDir()}/SSvelteCompiler/${Date.now()}.ts`;
                    __writeFileSync(`${tmpTsFilePath}`, input.content);

                    const compiler = new __STsCompiler();

                    const res = await compiler.compile({
                      input: [tmpTsFilePath],
                      rootDir: `${__packagepackageTmpDir()}/SSvelteCompiler`,
                      config: 'js',
                      save: false
                    });

                    if (!res || !res.files || !res.files.length) {
                      return {
                        code: input.content
                      };
                    }

                    // remove temp file
                    __removeSync(tmpTsFilePath);

                    return {
                      code: res.files[0].js
                    };
                  }
                },
                {}
              );

              // render svelte
              result = __svelte.compile(preprocessResult.code, {
                filename: file.name,
                dev: !params.prod,
                customElement: true,
                preserveComments: !params.stripComments,
                preserveWhitespace: !params.prod,
                outputFilename: file.name,
                cssOutputFilename: file.name,
                ...(params.svelte || {})
              });
            } catch (e) {
              emit('error', {
                group: 's-svelte-compiler',
                value: [
                  e.message,
                  `<yellow>${e.filename}</yellow>`,
                  e.frame
                ].join('\n')
              });
            }

            if (result && result.warnings) {
              result.warnings.forEach((warning) => {
                emit('warn', {
                  value: warning.toString()
                });
              });
            }

            if (!result) return;

            let outputPath = file.path;
            if (params.outDir) {
              const relPath = __path.relative(params.inDir, file.path);
              outputPath = `${__path.resolve(params.outDir, relPath)}`;
            }
            outputPath = outputPath.replace(/\.svelte$/, '.js');

            emit('log', {
              group: 's-svelte-compiler',
              value: `<${color}>[${__getFilename(
                file.path
              )}]</${color}> Compilation <green>successfull</green>`
            });

            // check if need to save file
            if (params.save) {
              if (result.js.code) {
                if (params.minify) {
                  result.js.code = __uglify.minify(result.js.code).code;
                }
                emit('log', {
                  group: 's-svelte-compiler',
                  value: `<${color}>[${__getFilename(
                    file.path
                  )}]</${color}> Saving <cyan>js</cyan> file under "<cyan>${__path.relative(
                    params.rootDir,
                    outputPath
                  )}</cyan>"`
                });
                __writeFileSync(outputPath, result.js.code);
                if (params.map && result.js.map) {
                  emit('log', {
                    group: 's-svelte-compiler',
                    value: `<${color}>[${__getFilename(
                      file.path
                    )}]</${color}> Saving <yellow>map</yellow> file under "<cyan>${__path.relative(
                      params.rootDir,
                      outputPath
                    )}.map</cyan>"`
                  });
                  __writeFileSync(
                    outputPath + '.map',
                    JSON.stringify(result.js.map, null, 4)
                  );
                }
              }
              if (result.css.code) {
                if (params.minify) {
                  result.css.code = new __cleanCss({}).minify(result.css.code);
                }
                emit('log', {
                  group: 's-svelte-compiler',
                  value: `<${color}>[${__getFilename(
                    file.path
                  )}]</${color}> Saving <yellow>css</yellow> file under "<cyan>${__path.relative(
                    params.rootDir,
                    outputPath.replace(/\.js$/, '.css')
                  )}</cyan>"`
                });
                __writeFileSync(
                  outputPath.replace(/\.js$/, '.css'),
                  result.css.code
                );
                if (params.map && result.css.map) {
                  emit('log', {
                    group: 's-svelte-compiler',
                    value: `<${color}>[${__getFilename(
                      file.path
                    )}]</${color}> Saving <yellow>map</yellow> file under "<cyan>${__path.relative(
                      params.rootDir,
                      outputPath.replace(/\.js$/, '.css')
                    )}.map</cyan>"`
                  });
                  __writeFileSync(
                    outputPath.replace(/\.js$/, '.css') + '.map',
                    JSON.stringify(result.css.map, null, 4)
                  );
                }
              }
            }

            compiledFiles.push({
              path: outputPath,
              js: result.js.code,
              css: result.css.code,
              warnings: result.warnings
            });
          }

          if (params.watch) {
            emit('log', {
              group: 's-svelte-compiler',
              value: `<blue>[watch]</blue> Watching for changes...`
            });
          } else {
            resolve({
              files: compiledFiles,
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

export default SSvelteCompiler;
