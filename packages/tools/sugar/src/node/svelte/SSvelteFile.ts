import __SFile from '../fs/SFile';
import __md5 from '../crypt/md5';
import __SDuration from '../time/SDuration';
import __path from 'path';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __SFileCache from '../cache/SFileCache';
import __toString from '../string/toString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';
import __SScssFile from '../scss/SScssFile';
import __STsCompiler from '../typescript/compile/STsCompiler';

const __svelte = require('svelte/compiler');

import __SInterface from '../interface/SInterface';
import { ISSvelteCompilerParams } from './compile/SSvelteCompiler';
import __SSvelteCompilerParamsInterface from './compile/interface/SSvelteCompilerParamsInterface';

/**
 * @name          SSvelteFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the svelteFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SSvelteFileSettingsInterface extends __SInterface {
  static definition: {};
}

/**
 * @name          SSvelteFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the svelteFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SSvelteFileCtorSettingsInterface extends __SInterface {
  static definition: {
    svelteFile: {
      interface: SSvelteFileSettingsInterface;
      type: 'Object';
      required: true;
    };
  };
}

interface ISSvelteFileCompileSettings {
  _updatedFile: any;
}

interface ISSvelteFileSettings {
  compile: Partial<ISSvelteFileCompileSettings>;
}
interface ISSvelteFileCtorSettings {
  svelteFile?: Partial<ISSvelteFileSettings>;
}

interface ISSvelteFile {
  compile(
    params: ISSvelteCompilerParams,
    settings: Partial<ISSvelteFileCompileSettings>
  );
}

/**
 * @name            SSvelteFile
 * @namespace       sugar.node.svelte
 * @type            Class
 * @extends         SFile
 * @status              beta
 *
 * This represent a svelte file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISSvelteFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SSvelteFile from '@coffeekraken/sugar/node/svelte/SSvelteFile';
 * const file = new SSvelteFile('/my/cool/file.svelte');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SSvelteFile extends __SFile implements ISSvelteFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __SSvelteCompilerParamsInterface
    },
    settings: {
      apply: true,
      on: '_settings',
      class: SSvelteFileCtorSettingsInterface
    }
  };

  /**
   * @name      svelteFileSettings
   * @type      ISSvelteFileSettings
   * @get
   *
   * Access the svelteFile settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteFileSettings(): ISSvelteFileSettings {
    return (<any>this._settings).svelteFile;
  }

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(path: string, settings: ISSvelteFileCtorSettings = {}) {
    super(
      path,
      __deepMerge(
        {
          id: __getFilename(path),
          svelteFile: {}
        },
        settings
      )
    );
  }

  /**
   * @name        _startWatch
   * @type        Function
   * @private
   *
   * Start to watch the file. Does this only once
   * to avoid multiple compilation and logs
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _startWatch() {
    // listen for change event
    this.on('update', async (file, metas) => {
      if (this._currentCompilationParams.watch) {
        const promise = this.compile(
          <ISSvelteCompilerParams>this._currentCompilationParams,
          {
            _updatedFile: file
          }
        );
      }
    });
  }

  /**
   * @name              compile
   * @type              Function
   *
   * Simply compile the file using the settings that you can pass as argument
   *
   * @param         {ISSvelteFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
   *
   * @setting       {Boolean}           [minify=false]          Specify if you want to minify the output
   * @setting       {Boolean}           [stripComments=false]       Specify if you want to remove all the comments from the output
   * @setting       {Boolean}              [cache=true]             Specify if you want to make use of the cache or not
   * @setting       {Boolean}           [clearCache=false]          Specify if you want to clear the cache before compilation
   * @setting       {String}            [sharedResources=null]      Specify some scss code that you want to be present in every compiled files
   * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isCompiling = false;
  _currentCompilationParams: Partial<ISSvelteCompilerParams> = {};
  compile(
    params: ISSvelteCompilerParams,
    settings: Partial<ISSvelteFileCompileSettings> = {}
  ) {
    settings = __deepMerge(this.svelteFileSettings.compile, settings);
    this._currentCompilationParams = Object.assign({}, params);

    params = this.applyInterface('compilerParams', params);

    if (params.watch) {
      this.startWatch();
    }

    // init the promise
    return new __SPromise(
      async ({ resolve, reject, emit, pipe, pipeTo, on }) => {
        // listen for the end
        on('finally', () => {
          this._isCompiling = false;
        });

        pipeTo(this);

        if (this._isCompiling) {
          emit('warn', {
            value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
          });
          return;
        }
        this._isCompiling = true;

        emit('log', {
          clear: true,
          type: 'time'
        });

        if (settings._updatedFile) {
          emit('log', {
            clear: true,
            type: 'file',
            action: 'update',
            file: this
          });
        }

        // notify start
        emit('log', {
          value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
        });

        const duration = new __SDuration();

        await __wait(0);

        let toCompile = this.content;

        try {
          emit('log', {
            value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
          });

          // preprocess
          const preprocessResult = await __svelte.preprocess(
            toCompile,
            {
              style: async (input) => {
                // if (
                //   !input.attributes ||
                //   !input.attributes.type ||
                //   input.attributes.type !== 'text/scss'
                // ) {
                //   emit('log', {
                //     value: 'No scss'
                //   });
                //   return {
                //     code: input.content
                //   };
                // }

                // create a temp file
                const tmpSScssFile = new __SScssFile(
                  '%tmpDir/svelte/compile.scss',
                  {
                    file: {
                      checkExistence: false
                    }
                  }
                );
                tmpSScssFile.writeSync(input.content);

                emit('log', {
                  value: `<yellow>[scss]</yellow> Processing scss`
                });

                const compileRes = await tmpSScssFile.compile({
                  save: false,
                  map: false
                });

                if (compileRes.css) {
                  emit('log', {
                    value: `<green>[scss]</green> Scss processed <green>successfully</green>`
                  });

                  return {
                    code: compileRes.css
                  };
                } else {
                  return compileRes;
                }
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

                // create a temp file
                const tmpTsFile = new __SFile('%tmpDir/ts/compile.ts', {
                  file: {
                    checkExistence: false
                  }
                });
                tmpTsFile.writeSync(input.content);

                emit('log', {
                  value: `<yellow>[ts]</yellow> Processing typescript`
                });

                const compiler = new __STsCompiler();
                const compilePromise = compiler.compile({
                  input: [tmpTsFile.path],
                  rootDir: tmpTsFile.dirPath,
                  save: false,
                  target: 'browser',
                  map: false
                });
                pipe(compilePromise, {
                  events: 'error'
                });
                const compileRes = await compilePromise;

                if (compileRes.js) {
                  emit('log', {
                    value: `<green>[ts]</green> Typescript processed <green>successfully</green>`
                  });

                  return {
                    code: compileRes.js
                  };
                } else {
                  console.log(compileRes);
                  return compileRes;
                }
              }
            },
            {}
          );

          // render svelte
          const result = __svelte.compile(preprocessResult.code, {
            filename: this.name,
            dev: !params.prod,
            customElement: true,
            preserveComments: !params.stripComments,
            preserveWhitespace: !params.prod,
            outputFilename: this.name,
            cssOutputFilename: this.name,
            ...(params.svelte || {})
          });

          result.warnings.forEach((warning) => {
            emit('warn', {
              value: warning.toString()
            });
          });

          // nativeConsole.log(result.js.map.toString());

          // check if need to save
          if (params.save) {
            // build the save path
            let savePath;
            if (params.outputDir === undefined) {
              savePath = this.path.replace(/\.svelte$/, '.js');
            } else {
              savePath = __path.resolve(
                params.outputDir,
                this.path
                  .replace(`${params.rootDir}/`, '')
                  .replace(/\.svelte$/, '.js')
              );
            }
            emit('log', {
              type: 'file',
              file: this,
              to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
              action: 'save'
            });
            this.writeSync(result.js.code, {
              path: savePath
            });
            if (params.map) {
              this.writeSync(result.js.map.toString(), {
                path: savePath.replace(/\.js$/, '.js.map')
              });
              emit('log', {
                type: 'file',
                action: 'saved',
                to: savePath
                  .replace(/\.js$/, '.js.map')
                  .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                file: this
              });
            }

            // notify end
            const time = duration.end();

            emit('log', {
              type: 'file',
              action: 'saved',
              to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
              file: this
            });
          }

          emit('log', {
            type: 'separator'
          });

          if (params.watch) {
            emit('log', {
              value: `<blue>[watch] </blue>Watching for changes...`
            });
          }

          return resolve(result);
        } catch (e) {
          return reject(e.toString());
        }

        return true;
      }
    );
  }
}

export default SSvelteFile;
