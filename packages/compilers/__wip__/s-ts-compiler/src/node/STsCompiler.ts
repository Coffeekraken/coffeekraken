// @ts-nocheck

import __SCompiler, {
  ISCompiler,
  ISCompilerSettings
} from '@coffeekraken/s-compiler';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __childProcess from 'child_process';
import __fs from 'fs';
import __path from 'path';
import __typescript from 'typescript';
import __STsCompilerParamsInterface from './interface/STsCompilerInterface';

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
        let tsconfigFromConfigParam = {};

        const duration = new __SDuration();

        if (params.config && params.stack) {
          throw new Error(
            `<red>[${this.constructor.name}]</red> Sorry but you cannot use both "<yellow>config</yellow>" and "<yellow>stack</yellow>" parameters together. <yellow>stack</yellow> is to compile some preset input with preset settings, <yellow>config</yellow> is to simply specify which config you want to use to compile some custom input(s)`
          );
        }

        let stacks: any = undefined;
        if (params.stack) {
          if (!Array.isArray(params.stack)) stacks = [params.stack];
          else stacks = params.stack;
        }

        // override input if needed
        if (stacks) {
          input = [];
          stacks.forEach((stackName) => {
            if (__fs.existsSync(`${__packageRootDir()}/tsconfig.${stackName}.json`)) {
              input.push(`${__packageRootDir()}/tsconfig.${stackName}.json`);
            } else if (
              __fs.existsSync(`${__packageRootDir()}/tsconfig.${stackName}.js`)
            ) {
              input.push(`${__packageRootDir()}/tsconfig.${stackName}.js`);
            } else if (
              __fs.existsSync(
                `${__SugarConfig.get(
                  'ts.tsconfigStacksDir'
                )}/tsconfig.${stackName}.js`
              )
            ) {
              input.push(
                `${__SugarConfig.get(
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
            __fs.existsSync(`${__packageRootDir()}/tsconfig.${params.config}.json`)
          ) {
            configPath = `${__packageRootDir()}/tsconfig.${params.config}.json`;
          } else if (
            __fs.existsSync(`${__packageRootDir()}/tsconfig.${params.config}.js`)
          ) {
            configPath = `${__packageRootDir()}/tsconfig.${params.config}.js`;
          } else if (
            __fs.existsSync(
              `${__SugarConfig.get('ts.tsconfigStacksDir')}/tsconfig.${
                params.config
              }.js`
            )
          ) {
            configPath = `${__SugarConfig.get('ts.tsconfigStacksDir')}/tsconfig.${
              params.config
            }.js`;
          }
          if (!configPath) {
            throw new Error(
              `Sorry but the passed "<yellow>${params.config}</yellow>" config parameter does not resolve to any valid tsconfig file...`
            );
          } else {
            if (configPath.match(/\.js$/)) {
              tsconfigFromConfigParam = require(configPath);
            } else {
              const jsonFile = new __SFile(configPath);
              tsconfigFromConfigParam = jsonFile.content;
            }
          }
        } else if (__isPlainObject(params.config)) {
          tsconfigFromConfigParam = params.config;
        }
        delete tsconfigFromConfigParam.include;

        const colors = __availableColors();

        let areAllTsconfigInput = true;
        for (let i = 0; i < input.length; i++) {
          if (!input[i].match(/tsconfig\.[a-zA-Z0-9]+\.js(on)?$/)) {
            areAllTsconfigInput = false;
          }
        }

        // clear
        if (params.clear && params.outDir) {
          emit('log', {
            group: 's-ts-compiler',
            value: `Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
          });
          const outDirPath = __path.resolve(
            params.rootDir || process.cwd(),
            params.outDir
          );
          __removeSync(outDirPath);
        }

        const poolStacks = {};

        if (!areAllTsconfigInput) {
          let tsconfig = {};

          // search for config
          const potentialRootPath = `${__packageRootDir())}/tsconfig.json`;
          if (__fs.existsSync(potentialRootPath)) {
            tsconfig = require(potentialRootPath);
          } else {
            tsconfig = require(`${__dirname}/../templates/tsconfig.js`);
          }

          poolStacks.default = __deepMerge(
            {
              ...tsconfig,
              include: [...(tsconfig.include ?? []), ...input]
            },
            tsconfigFromConfigParam
          );
        } else {
          input.forEach((tsConfigPath) => {
            const configJson = require(tsConfigPath);
            const stackNameMatch = tsConfigPath.match(
              /tsconfig\.([a-zA-Z0-9]+)\.js(on)?$/
            );
            const stackName = stackNameMatch ? stackNameMatch[1] : 'default';
            poolStacks[stackName] = configJson;
          });
        }

        Object.keys(poolStacks).forEach((stackName) => {
          const tsconfig = poolStacks[stackName];
          const pool = __fsPool(tsconfig.include, {
            watch: true
          });

          // map
          if (params.map === false) {
            delete tsconfig.compilerOptions.sourceMap;
            delete tsconfig.compilerOptions.inlineSourceMap;
          } else if (params.map === true) {
            tsconfig.compilerOptions.sourceMap = true;
            delete tsconfig.compilerOptions.inlineSourceMap;
          } else if (params.map === 'inline') {
            delete tsconfig.compilerOptions.sourceMap;
            tsconfig.compilerOptions.inlineSourceMap = true;
          }

          pool.on(params.watch ? 'update' : 'files', async (files, m) => {
            if (!Array.isArray(files)) files = [files];

            const duration = new __SDuration();
            const resultFiles = [];

            files.forEach((file) => {
              emit('log', {
                group: 's-ts-compiler',
                value: `<yellow>[compile]</yellow> File "<cyan>${file.relPath}</cyan>"`
              });

              let result = __typescript.transpileModule(file.content, tsconfig);

              if (!params.watch) {
                resultFiles.push({
                  path: file.path,
                  relPath: file.relPath,
                  js: result.outputText,
                  map: result.sourceMapText
                });
              }

              if (params.save) {
                let outPath;
                if (params.outDir) {
                  outPath = __path
                    .resolve(
                      `${params.outDir}`,
                      __path.relative(params.inDir, file.path)
                    )
                    .replace(/\.ts(x)?$/, '.js');
                } else {
                  outPath = file.path.replace(/\.ts(x)?$/, '.js');
                }

                emit('log', {
                  group: 's-ts-compiler',
                  value: `<green>[save]</green> File "<cyan>${
                    file.relPath
                  }</cyan>" under "<magenta>${__path.relative(
                    __packageRootDir()),
                    outPath
                  )}</magenta>"`
                });
                __writeFileSync(outPath, result.outputText);

                if (result.sourceMapText) {
                  emit('log', {
                    group: 's-ts-compiler',
                    value: `<green>[save]</green> Map "<cyan>${
                      file.relPath
                    }</cyan>" under "<magenta>${__path.relative(
                      __packageRootDir()),
                      outPath
                    )}.map</magenta>"`
                  });
                  __writeFileSync(`${outPath}.map`, result.sourceMapText);
                }
              }
            });

            if (!params.watch) {
              emit('log', {
                group: 's-ts-compiler',
                value: `<yellow>${files.length}</yellow> File${
                  files.length > 1 ? 's' : ''
                } compiled`
              });

              emit('log', {
                group: 's-ts-compiler',
                value: `Compilation <green>successfull</green> in <yellow>${
                  duration.end().formatedDuration
                }</yellow>`
              });

              resolve({
                files: resultFiles,
                ...duration.end()
              });
            }
          });
        });

        emit('log', {
          group: 's-ts-compiler',
          value: 'Starting <cyan>TS</cyan> file(s) compilation process...'
        });

        if (params.watch) {
          emit('log', {
            group: 's-ts-compiler',
            value: `<blue>[watch]</blue> Watching for changes...`
          });
        }
      },
      {
        eventEmitter: {
          bind: this
        },
        metas: this.metas
      }
    );
  }

  _handleCompiledFile(file, tsconfig, params, emit) {
    if (!file) return;
    if (typeof file === 'string') {
      file = new __SFile(file, {
        file: tsconfig.compilerOptions.rootDir
      });
    }

    const relPath = __path.relative(tsconfig.compilerOptions.outDir, file.path);

    const inPath = __path.resolve(tsconfig.compilerOptions.outDir, relPath);
    let outPath = __path.resolve(tsconfig.compilerOptions.rootDir, relPath);

    if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
      outPath = outPath.replace(
        /\.[a-zA-Z0-9]+$/,
        `.${tsconfig.sTsCompiler.outExt}`
      );
    }

    if (emit) {
      emit('log', {
        group: 's-ts-compiler',
        // temp: true,
        value: `<yellow>[compile]</yellow> Compiling file "<cyan>${__path.relative(
          tsconfig.compilerOptions.outDir,
          file.path
        )}</cyan>"`
      });
    }

    let finalFile;

    if (outPath.match(/\.ts(x)?$/) && __fs.existsSync(outPath)) {
      if (emit) {
        emit('log', {
          group: 's-ts-compiler',
          value: `<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`
        });
      }
      return;
    } else {
      try {
        if (params.save) {
          __fs.renameSync(inPath, outPath);
          if (outPath.match(/\.cli\.js$/) && emit) {
            emit('log', {
              group: 's-ts-compiler',
              temp: true,
              value: `<yellow>[compile]</yellow> Adding execution permission to file "<cyan>${__path.relative(
                tsconfig.compilerOptions.outDir,
                file.path
              )}</cyan>"`
            });
            __childProcess.execSync(`chmod +x ${outPath}`);
          }
          finalFile = __SFile.new(outPath);
        } else {
          finalFile = __SFile.new(inPath);
        }
      } catch (e) {
        return;
      }
    }

    return finalFile.toObject();
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
    const definedStacks = __SugarConfig.get('ts.stacks');
    if (!definedStacks) return false;
    if (!definedStacks[stack]) return false;
    return definedStacks[stack];
  }
}

export default STsCompiler;
