// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __path from 'path';
import __deepMerge from '../../../shared/object/deepMerge';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __sugarConfig from '../../config/sugar';
import __ensureDirSync from '../../fs/ensureDirSync';
import __getFilename from '../../fs/filename';
import __folderPath from '../../fs/folderPath';
import __SFile from '../../fs/SFile';
import __packageRoot from '../../path/packageRoot';
import __rootDir from '../../path/rootDir';
import __sugarDir from '../../path/sugarDir';
import __tmpDir from '../../path/tmpDir';
import __spawn from '../../process/spawn';
import __STsCompilerParamsInterface from './interface/STsCompilerParamsInterface';

export interface ISTsCompilerCtorSettings {}
export interface ISTsCompilerSettings {}

export interface ISTsCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  map: boolean;
  banner: string;
  watch: boolean;
  stack: string;
  compilerOptions: Record<string, any>;
  // transpileOnly: boolean;
  // stacks: string[];
  // tsconfig: any;
}

export type ISTsCompiler = ISCompiler;

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
 * @param           {ISTsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
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
 * @see             https://svelte.dev/docs#Compile_time
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
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(
    params: ISScssCompilerParams,
    settings?: Partial<ISScssCompilerSettings>
  ) {
    return new __SPromise(
      async ({ resolve, reject, pipe, pipeFrom, emit, on }) => {
        settings = __deepMerge(this.tsCompilerSettings, {}, settings || {});

        let input = Array.isArray(params.input) ? params.input : [params.input];

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
                  'ts.tsconfigTemplatesDir'
                )}/tsconfig.${stackName}.js`
              )
            ) {
              input.push(
                `${__sugarConfig(
                  'ts.tsconfigTemplatesDir'
                )}/tsconfig.${stackName}.js`
              );
            } else {
              throw new Error(
                `Sorry but the tsconfig.{stack}.js(on) "<yellow>${stackName}</yellow>" does not exists...`
              );
            }
          });
        }

        const colors = ['yellow', 'cyan', 'magenta', 'green', 'red'];

        // loop on inputs
        input.forEach((inputPath, i) => {
          if (inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/)) {
            const inputPathToDisplay = inputPath
              .replace(`${__sugarDir()}/src/templates/tsconfig/`, '@sugar/')
              .replace(`${__packageRoot()}/`, '')
              .replace(/\.js$/, '.json');

            let tsconfigJson = {};
            if (inputPath.match(/\.js$/)) {
              tsconfigJson = require(inputPath);
            } else {
              const jsonFile = new __SFile(inputPath);
              tsconfigJson = jsonFile.content;
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
                  value: `THe tsconfig file "<cyan>${inputPath}</cyan>" extends property "<yellow>${tsconfigJson.extends}</yellow>" seems to be incorrect...`
                });
              }
              delete tsconfigJson.extends;
              // extends the config
              tsconfigJson = __deepMerge(extendsJson, tsconfigJson);
            }

            // include
            if (!tsconfigJson.include && tsconfigJson._include) {
              tsconfigJson.include = tsconfigJson._include;
            }
            delete tsconfigJson._include;
            if (tsconfigJson.include) {
              tsconfigJson.include = tsconfigJson.include.map((path) => {
                if (__path.isAbsolute(path)) return path;
                return __path.resolve(__folderPath(inputPath), path);
              });
            }

            // exclude
            if (!tsconfigJson.exclude && tsconfigJson._exclude) {
              tsconfigJson.exclude = tsconfigJson._exclude;
            }
            delete tsconfigJson._exclude;

            // outputDir
            if (params.outputDir) {
              tsconfigJson.outDir = __path.resolve(
                __folderPath(inputPath),
                params.outputDir
              );
            }

            // rootDir
            if (params.rootDir) {
              tsconfigJson.rootDir = __path.resolve(
                __folderPath(inputPath),
                params.rootDir
              );
            }

            // compilerOptions
            if (!tsconfigJson.compilerOptions)
              tsconfigJson.compilerOptions = {};

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

            // writing the tsconfig file
            const tmpFilePath =
              `${__tmpDir()}/STsCompiler/${__getFilename(inputPath)}`
                .split('.')
                .slice(0, -1)
                .join('.') + '.json';
            __ensureDirSync(__folderPath(tmpFilePath));
            __fs.writeFileSync(
              tmpFilePath,
              JSON.stringify(tsconfigJson, null, 4)
            );

            // build command line
            const commandLineArray: string[] = [];
            commandLineArray.push(`-p ${tmpFilePath}`);
            if (params.watch) commandLineArray.push('--watch');

            // spawn new process
            try {
              const pro = __spawn(`tsc ${commandLineArray.join(' ')}`, [], {
                cwd: params.rootDir || process.cwd()
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

              pro.on('close', (value) => {
                if (value.code === 0) {
                  pro.emit('log', {
                    value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                  });
                }
              });

              pro.emit('log', {
                value: `Starting compilation process`
              });
            } catch (e) {
              console.log(e);
            }
          } else {
            throw new Error(
              'Sorry but the functionality to compile single file or files is not implemented yet. Please pass as input a "tsconfig.json" file...'
            );
          }
        });

        // const pool = __fsPool(input, {
        //   watch: params.watch
        // });

        // on('cancel', () => {
        //   pool.cancel();
        // });

        // if (params.watch) {
        //   emit('log', {
        //     value: `<blue>[watch]</blue> Watching for changes...`
        //   });
        // }

        // pool.on(params.watch ? 'update' : 'files', async (files) => {
        //   files = Array.isArray(files) ? files : [files];

        //   for (let i = 0; i < files.length; i++) {
        //     const file = files[i];

        //     const compilePromise = file.compile(
        //       {
        //         ...params
        //       },
        //       settings
        //     );

        //     try {
        //       pipe(compilePromise);
        //       const compileRes = await compilePromise;
        //       resultsObj[file.path] = compileRes;
        //       aggregateStrArray.push(compileRes.js);
        //       emit('file', compileRes);
        //     } catch (e) {
        //       emit('warn', {
        //         value: e.toString()
        //       });
        //     }
        //   }

        //   if (params.watch) {
        //     emit('log', {
        //       value: `<blue>[watch]</blue> Watching for changes...`
        //     });
        //   } else {
        //     resolve({
        //       files: resultsObj,
        //       js: aggregateStrArray.join('\n'),
        //       ...duration.end()
        //     });
        //   }
        // });
      }
    );
  }

  /**
   * @name        getStack
   * @type        Function
   *
   * Check if the passed string is the name of a defined stack or not
   *
   * @param     {String}      stack       The stack to check
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
