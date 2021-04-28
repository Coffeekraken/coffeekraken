// @ts-nocheck

import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SCompiler, {
  ISCompiler,
  ISCompilerSettings
} from '@coffeekraken/s-compiler';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __resolveGlob from '@coffeekraken/sugar/node/glob/resolveGlob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __sugarDir from '@coffeekraken/sugar/node/path/sugarDir';
import __tmpDir from '@coffeekraken/sugar/node/path/tmpDir';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __fs from 'fs';
import __path from 'path';
import __STsCompilerParamsInterface from './interface/STsCompilerInterface';
import __moveFile from 'move-file';
import tsconfig from '../templates/tsconfig';

export interface ISTsCompilerCtorSettings {
  tsCompiler: Partial<ISTsCompilerSettings>;
}
export type ISTsCompilerSettings = ISCompilerSettings;

export interface ISTsCompilerParams {
  input: string | string[];
  outDir: string;
  rootDir: string;
  map: boolean;
  banner: string;
  watch: boolean;
  stack: string;
  config: string;
  compilerOptions: Record<string, any>;
  // transpileOnly: boolean;
  // tsconfig: any;
}

export interface ISTsCompiler extends ISCompiler {
  process(
    params: Partial<ISTsCompilerParams>,
    settings: Partial<ISTsCompilerSettings>
  ): Promise<any>;
}

/**
 * @name                STsCompiler
 * @namespace           sugar.node.typescript
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "typescript" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISTsCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISTsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      support for compiling single file or glob targeted files
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import STsCompiler from '@coffeekraken/sugar/node/scss/compile/STsCompiler';
 * const compiler = new STsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.ts');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompiler extends __SCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __STsCompilerParamsInterface
    }
  };

  /**
   * @name      tsCompilerSettings
   * @type      ISTsCompilerSettings
   * @get
   *
   * Access to the ts compiler settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get tsCompilerSettings(): ISTsCompilerSettings {
    return (<any>this)._settings.tsCompiler;
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
    initialParams?: Partial<ISTsCompilerParams>,
    settings?: ISTsCompilerCtorSettings
  ) {
    super(
      initialParams || {},
      __deepMerge(
        {
          tsCompiler: {}
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
  _currentlyHandledFiles = {};
  _compile(
    params: ISScssCompilerParams,
    settings?: Partial<ISScssCompilerSettings>
  ) {
    return new __SPromise(
      async ({ resolve, reject, pipe, pipeFrom, emit, on }) => {
        settings = __deepMerge(this.tsCompilerSettings, {}, settings || {});

        let input = Array.isArray(params.input) ? params.input : [params.input];
        let config;

        const duration = new __SDuration();

        let stacks: any = undefined;
        if (params.stack) {
          if (!Array.isArray(params.stack)) stacks = [params.stack];
          else stacks = params.stack;
        }

        // override input if needed
        if (stacks) {
          input = [];
          stacks.forEach((stackName) => {
            if (__fs.existsSync(`${__rootDir()}/tsconfig.${stackName}.json`)) {
              input.push(`${__rootDir()}/tsconfig.${stackName}.json`);
            } else if (
              __fs.existsSync(`${__rootDir()}/tsconfig.${stackName}.js`)
            ) {
              input.push(`${__rootDir()}/tsconfig.${stackName}.js`);
            } else if (
              __fs.existsSync(
                `${__sugarConfig(
                  'ts.tsconfigStacksDir'
                )}/tsconfig.${stackName}.js`
              )
            ) {
              input.push(
                `${__sugarConfig(
                  'ts.tsconfigStacksDir'
                )}/tsconfig.${stackName}.js`
              );
            } else {
              throw new Error(
                `Sorry but the tsconfig.{stack}.js(on) "<yellow>${stackName}</yellow>" does not exists...`
              );
            }
          });
        }

        if (params.config && typeof params.config === 'string') {
          let configPath;
          if (
            __fs.existsSync(`${__rootDir()}/tsconfig.${params.config}.json`)
          ) {
            configPath = `${__rootDir()}/tsconfig.${params.config}.json`;
          } else if (
            __fs.existsSync(`${__rootDir()}/tsconfig.${params.config}.js`)
          ) {
            configPath = `${__rootDir()}/tsconfig.${params.config}.js`;
          } else if (
            __fs.existsSync(
              `${__sugarConfig('ts.tsconfigStacksDir')}/tsconfig.${
                params.config
              }.js`
            )
          ) {
            configPath = `${__sugarConfig('ts.tsconfigStacksDir')}/tsconfig.${
              params.config
            }.js`;
          }
          if (!configPath) {
            throw new Error(
              `Sorry but the passed "<yellow>${params.config}</yellow>" config parameter does not resolve to any valid tsconfig file...`
            );
          } else {
            if (configPath.match(/\.js$/)) {
              config = require(configPath);
            } else {
              const jsonFile = new __SFile(configPath);
              config = jsonFile.content;
            }
          }
        } else if (__isPlainObject(params.config)) {
          config = params.config;
        }

        const colors = __availableColors();

        // clear
        if (params.clear && params.outDir) {
          emit('log', {
            value: `Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
          });
          const outDirPath = __path.resolve(
            params.rootDir || process.cwd(),
            params.outDir
          );
          __removeSync(outDirPath);
        }

        // loop on inputs
        input.forEach(async (inputPath, i) => {
          let tsconfigJson = {},
            inputPathToDisplay,
            inputPathHash = __md5.encrypt(inputPath);

          const isTsConfigInput = inputPath.match(
            /.*\/tsconfig(\..*)?\.js(on)?$/
          );

          if (!isTsConfigInput && inputPath.match(/\.tsx?$/)) {
            if (!config) {
              throw new Error(
                `Sorry but to compile the passed "<cyan>${inputPath}</cyan>" input, you MUST specify a valid config to use like "js", "node", "shared", or a full tsconfig file path`
              );
            }
            inputPathToDisplay = __getFilename(inputPath);
            tsconfigJson = config;
          } else if (isTsConfigInput) {
            inputPathToDisplay = __getFilename(inputPath).replace(
              /\.js(on)?$/,
              ''
            );

            if (inputPath.match(/\.js$/)) {
              tsconfigJson = require(inputPath);
            } else {
              const jsonFile = new __SFile(inputPath);
              tsconfigJson = jsonFile.content;
            }
          } else {
            throw new Error(
              'Sorry but the input "<yellow>${input}</yellow> seems to be invalid...'
            );
          }

          // extends
          if (tsconfigJson.extends) {
            const extendsPath = __path.resolve(
              __folderPath(inputPath),
              tsconfigJson.extends
            );
            let extendsJson = {};
            // reading the file
            if (extendsPath.match(/\.json$/)) {
              const extendsFile = new __SFile(extendsPath);
              extendsJson = extendsFile.content;
            } else if (extendsPath.match(/\.js$/)) {
              extendsJson = require(extendsPath);
            } else {
              emit('warn', {
                value: `<bg${__upperFirst(this.metas.color)}><black> ${
                  this.metas.id
                } </black></bg${__upperFirst(
                  this.metas.color
                )}> THe tsconfig file "<cyan>${inputPath}</cyan>" extends property "<yellow>${
                  tsconfigJson.extends
                }</yellow>" seems to be incorrect...`
              });
            }
            delete tsconfigJson.extends;
            // extends the config
            tsconfigJson = __deepMerge(extendsJson, tsconfigJson);
          }

          // include (only for non tsconfig input)
          if (!isTsConfigInput) {
            tsconfigJson.include = [inputPath];
          } else {
            if (!tsconfigJson.include && tsconfigJson._include) {
              tsconfigJson.include = tsconfigJson._include;
            }
          }
          delete tsconfigJson._include;

          // make sure includes are absolute
          if (tsconfigJson.include) {
            tsconfigJson.include = tsconfigJson.include.map((path) => {
              if (__path.isAbsolute(path)) return path;
              if (isTsConfigInput) {
                return __path.resolve(__folderPath(inputPath), path);
              } else {
                return __path.resolve(path);
              }
            });
          }

          // exclude
          if (!tsconfigJson.exclude && tsconfigJson._exclude) {
            tsconfigJson.exclude = tsconfigJson._exclude;
          }
          delete tsconfigJson._exclude;

          // rootDir
          if (params.rootDir) {
            if (!__path.isAbsolute(params.rootDir)) {
              throw new Error(
                `Sorry but the parameter "<yellow>rootDir</yellow>" MUST be an absolute path. You've passed "<cyan>${params.rootDir}</cyan>"`
              );
            }
            tsconfigJson.compilerOptions.rootDir = params.rootDir;
          }

          // outDir
          if (params.outDir) {
            tsconfigJson.compilerOptions.outDir = __path.resolve(
              params.rootDir || process.cwd(),
              params.outDir
            );
            delete tsconfigJson.compilerOptions.rootDir;
          }

          // compilerOptions
          if (!tsconfigJson.compilerOptions) tsconfigJson.compilerOptions = {};

          if (params.compilerOptions) {
            tsconfigJson.compilerOptions = __deepMerge(
              tsconfigJson.compilerOptions || {},
              params.compilerOptions
            );
          }

          // map
          if (params.map === false) {
            delete tsconfigJson.compilerOptions.sourceMap;
            delete tsconfigJson.compilerOptions.inlineSourceMap;
          } else if (params.map === true) {
            tsconfigJson.compilerOptions.sourceMap = true;
            delete tsconfigJson.compilerOptions.inlineSourceMap;
          } else if (params.map === 'inline') {
            delete tsconfigJson.compilerOptions.sourceMap;
            tsconfigJson.compilerOptions.inlineSourceMap = true;
          }

          // save or not
          // if (!params.save) {
          tsconfigJson.compilerOptions.outDir = `${__tmpDir()}/STsCompiler/${Date.now()}-${inputPathHash}`;
          // }

          const tmpConfigPath = `${__tmpDir()}/STsCompiler/${__getFilename(
            inputPath
          )}.${__md5.encrypt(inputPath)}.json`;

          // writing the tsconfig file
          __ensureDirSync(__folderPath(tmpConfigPath));
          __fs.writeFileSync(
            tmpConfigPath,
            JSON.stringify(tsconfigJson, null, 4)
          );

          // build command line
          const commandLineArray: string[] = [];
          commandLineArray.push(`-p ${tmpConfigPath}`);
          if (params.watch) commandLineArray.push('--watch');

          // setup resultObj
          const resultObj = {
            tsconfig: tsconfigJson,
            params
          };

          // spawn new process
          try {
            const pro = __spawn(`tsc ${commandLineArray.join(' ')}`, [], {
              cwd: params.rootDir || process.cwd()
            });

            // listen outDir
            const pool = __fsPool(
              `${tsconfigJson.compilerOptions.outDir}/**/*`,
              {
                watch: true,
                cwd: tsconfigJson.compilerOptions.outDir
              }
            );
            pool.on('file', (file) => {
              this._handleCompiledFile(file, tsconfigJson, pro.emit);
            });

            pipeFrom(pro, {
              processor: (value, metas) => {
                let txtValue;
                if (value.value && typeof value.value === 'string')
                  txtValue = value.value;
                else if (typeof value === 'string') txtValue = value;

                if (txtValue) {
                  txtValue = txtValue.replace(
                    /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\s[AP]M\s-\s/,
                    ''
                  );
                }

                if (
                  txtValue &&
                  txtValue.match(/No inputs were found in config file/g)
                ) {
                  if (value.value) value.value = `No file found...`;
                  else value = 'No file found...';
                } else if (txtValue) {
                  if (value.value) value.value = txtValue;
                  else value = txtValue;
                }
                return [value, metas];
              },
              filter: (value, metas) => {
                // if (
                //   value &&
                //   value.value &&
                //   typeof value.value === 'string' &&
                //   value.value.match(/TSFILE:\s.*/)
                // ) {
                //   if (params.watch) {
                //     const filesPaths = value.value
                //       .split('TSFILE:')
                //       .map((f) => f.trim());
                //     filesPaths.forEach((filePath) => {
                //       this._handleCompiledFile(
                //         filePath,
                //         tsconfigJson,
                //         pro.emit
                //       );
                //     });
                //   }
                //   return false;
                // }
                if (!metas.event.match(/^close/)) return true;
                if (
                  value.stdout &&
                  value.stdout
                    .join(' ')
                    .match(/No inputs were found in config file/g)
                )
                  return false;
                return true;
              },
              stripAnsi: true,
              prefixValue: `<${
                colors[i] || 'yellow'
              }>[${inputPathToDisplay}]</${colors[i] || 'yellow'}> `
            });

            pro.on('close', async (value) => {
              if (value.code === 0) {
                // if (value && value.value && typeof value.value === 'string') {
                //   const filesCount = value.value.match(/TSFILE:\s/gm).length;
                //   pro.emit('log', {
                //     value: `<yellow>${filesCount}</yellow> File${
                //       filesCount > 1 ? 's' : ''
                //     } compiled`
                //   });
                // }

                // if (!params.watch) {
                //   // save or not
                //   const files = await __resolveGlob(
                //     `${tsconfigJson.compilerOptions.outDir}/**/*.js`
                //   );
                //   // .map((file) => {
                //   //   return {
                //   //     path: __path.relative(
                //   //       tsconfigJson.compilerOptions.outDir,
                //   //       file.path
                //   //     ),
                //   //     content: file.content
                //   //   };
                //   // });

                //   pro.emit('log', {
                //     value: `Moving compiled files to final destination`
                //   });

                //   for (let i = 0; i < files.length; i++) {
                //     const file = files[i];
                //     await this._handleCompiledFile(
                //       file,
                //       tsconfigJson,
                //       pro.emit
                //     );
                //   }

                pro.emit('log', {
                  value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                });

                //   // set files in result obj
                //   resultObj.files = files;
                // }

                // resolve the promise
                resolve({
                  ...resultObj,
                  ...duration.end()
                });
              } else {
                // reject the promise
                reject({
                  ...resultObj,
                  error: value.stderr.join('\n'),
                  ...duration.end()
                });
              }

              pool.cancel();

              // delete the temp directory if needed
              __removeSync(tsconfigJson.compilerOptions.outDir);

              // delete the config file
              __removeSync(tmpConfigPath);
            });

            pro.emit('log', {
              value: `Starting compilation process`
            });
          } catch (e) {
            pool.cancel();

            // delete the temp directory if needed
            __removeSync(tsconfigJson.compilerOptions.outDir);

            // delete the config file
            __removeSync(tmpConfigPath);

            reject({
              ...resultObj,
              error: e,
              ...duration.end()
            });
          }
        });
      },
      {
        eventEmitter: {
          bind: this
        },
        metas: this.metas
      }
    );
  }

  async _handleCompiledFile(file, tsconfig, emit) {
    if (!file) return;
    if (typeof file === 'string') {
      file = new __SFile(file, {
        file: tsconfig.compilerOptions.rootDir
      });
    }

    const relPath = __path.relative(tsconfig.compilerOptions.outDir, file.path);

    if (this._currentlyHandledFiles[relPath]) return;
    this._currentlyHandledFiles[relPath] = true;

    const inPath = __path.resolve(tsconfig.compilerOptions.outDir, relPath);
    let outPath = __path.resolve(tsconfig.compilerOptions.rootDir, relPath);

    if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
      outPath = outPath.replace(
        /\.[a-zA-Z0-9]+$/,
        `.${tsconfig.sTsCompiler.outExt}`
      );
    }

    emit('log', {
      temp: true,
      value: `<yellow>[compile]</yellow> Compiling file "<cyan>${__path.relative(
        tsconfig.compilerOptions.outDir,
        file.path
      )}</cyan>"`
    });

    if (outPath.match(/\.ts(x)?$/) && __fs.existsSync(outPath)) {
      emit('log', {
        value: `<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`
      });
    } else {
      try {
        try {
          __fs.unlinkSync(outPath);
        } catch (e) {}
        __fs.renameSync(inPath, outPath);
      } catch (e) {
        console.log(e.message);
        console.log('ERRO', inPath, outPath);
        delete this._currentlyHandledFiles[relPath];
      }
    }

    delete this._currentlyHandledFiles[relPath];

    return true;
  }

  /**
   * @name        getStack
   * @type        Function
   *
   * Check if the passed string is the name of a defined stack or not
   *
   * @param     {String}      stack       The stack to check
   * @return    {Object}                 The stack object defined in the configuration
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getStack(stack) {
    const definedStacks = __sugarConfig('ts.stacks');
    if (!definedStacks) return false;
    if (!definedStacks[stack]) return false;
    return definedStacks[stack];
  }
}

export default STsCompiler;
