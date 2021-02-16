// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __STsFile from '../STsFile';
import __SFile from '../../fs/SFile';
import __SPromise from '../../promise/SPromise';
import __absolute from '../../path/absolute';
import __isGlob from '../../is/glob';
import __glob from 'glob';
import __SCliProcess from '../../process/SCliProcess';
import __md5 from '../../crypt/md5';
import __packageRoot from '../../path/packageRoot';
import __tmpDir from '../../path/tmpDir';
import __stripAnsi from '../../string/stripAnsi';
import __SDuration from '../../time/SDuration';

import __TscInterface from './interface/TscInterface';
import __STsCompilerParamsInterface from './interface/STsCompilerParamsInterface';

export interface ISTsCompilerCtorSettings {}
export interface ISTsCompilerSettings {}

export interface ISTsCompilerParams {
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
  target: string;
  stacks: string[];
  tsconfig: any;
}

export interface ISTsCompiler extends ISCompiler {}

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

  static _serveServer: any;

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
    return (<any>this._settings).tsCompiler;
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
    return new __SPromise(async ({ resolve, reject, pipe, pipeFrom, emit }) => {
      settings = __deepMerge(this.tsCompilerSettings, {}, settings || {});

      let input = Array.isArray(params.input) ? params.input : [params.input];

      let tsconfig = {
        ...params.tsconfig
      };

      if (params.stacks) {
        params.stacks.forEach((stack) => {
          const compilePromise = this.compile({
            ...params,
            stacks: undefined,
            input: stack
          });
          pipeFrom(compilePromise);
        });
        // stop execution here
        return;
      }

      // preparing the temp config file name
      let tmpConfigFileName;

      // prod flag
      if (params.prod) {
        params.minify = true;
        params.stripComments = true;
      }

      // make input absolute
      input = __absolute(input);
      // process inputs
      input.forEach((inputStr) => {
        if (__isGlob(inputStr)) {
          if (params.watch === true) {
            tsconfig.include.push(inputStr);
          } else {
            const globFiles = __glob.sync(inputStr);
            tsconfig.files = [...tsconfig.files, ...globFiles];
          }
        } else if (this.getStack(inputStr)) {
          const stackObj = this.getStack(inputStr);
          // set the temp file name
          tmpConfigFileName = inputSBlessedtr + '.tsconfig.js';
          // const stackPromise = this.compile();
          tsconfig = __deepMerge(tsconfig, stackObj);
        } else {
          tsconfig.files.push(inputStr);
        }
      });

      emit('log', {
        clear: true,
        type: 'time'
      });

      emit('log', {
        value: [
          `<yellow>[start]</yellow> Starting typescript compilation using these settings:`,
          `      <yellow>│</yellow> Watch: ${
            params.watch ? '<green>true</green>' : '<red>false</red>'
          }`,
          `      <yellow>│</yellow> Save: ${
            params.save ? '<green>true</green>' : '<red>false</red>'
          }`,
          `      <yellow>│</yellow> Sourcemap: ${
            params.map
              ? `<green>${params.map === true ? 'true' : params.map}</green>`
              : '<red>false</red>'
          }`,
          `      <yellow>│</yellow> Output directory: <cyan>${
            params.outputDir
              ? params.outputDir.replace(`${__packageRoot()}/`, '')
              : 'undefined'
          }</cyan>`,
          `      <yellow>│</yellow> Root directory: <cyan>${params.rootDir.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>`,
          `      <yellow>│</yellow> Input(s):${tsconfig.files
            .concat(tsconfig.include)
            .map((path) => {
              return `\n      <yellow>│</yellow> - <cyan>${path.replace(
                `${__packageRoot()}/`,
                ''
              )}</cyan>`;
            })}`,
          ''
        ].join('\n')
      });

      tsconfig.files = __absolute(tsconfig.files);
      tsconfig.include = __absolute(tsconfig.include);

      const duration = new __SDuration();

      if (tsconfig.files.length === 0 && tsconfig.include.length === 0) {
        return reject(
          [
            `Sorry but their's nothing to compile.`,
            `In order to specify files/folders to compile, you have these choices:`,
            `1. Specify some "stacks" to compile in your "<yellow>.sugar/ts.config.js</yellow>" file and launch the compilation using the "<cyan>-s {stack}</cyan>" argument.`,
            `2. Specify a "<yellow>project</yellow>" tsconfig.json path using the standard "<cyan>-p|--project</cyan>" argument.`,
            `3. Create a "<yellow>tsconfig.json</yellow>" file at your project root which is "<cyan>${__packageRoot()}</cyan>".`
          ].join('\n')
        );
      }

      // if no filename for the temp config file, generate one
      if (!tmpConfigFileName) {
        tmpConfigFileName = `${__md5.encrypt(
          tsconfig.files.concat(tsconfig.include)
        )}.tsconfig.json`;
      }

      // ensure the tsconfig file is valid
      if (!tsconfig.files.length) delete tsconfig.files;
      if (!tsconfig.include.length) delete tsconfig.include;
      if (!tsconfig.exclude.length) delete tsconfig.exclude;

      // wrinting the temp config file
      const tmpConfigFile = new __SFile(`%tmpDir/ts/${tmpConfigFileName}`, {
        file: {
          checkExistence: false
        }
      });

      // apply target
      const availableTargets = __sugarConfig('ts.targets');
      if (params.target && availableTargets[params.target]) {
        tsconfig.compilerOptions = __deepMerge(
          tsconfig.compilerOptions,
          availableTargets[params.target]
        );
      }

      // write the temp file to compile
      tmpConfigFile.writeSync(JSON.stringify(tsconfig, null, 4));

      // build command line to execute
      let command = `tsc --listEmittedFiles --pretty --noEmitOnError -p ${tmpConfigFile.path}`;
      if (params.watch) command += ' -w';
      if (params.map) {
        if (params.map === 'inline') {
          command += ' --inlineSourceMap';
        } else {
          command += ' --sourceMap';
        }
      }
      if (params.rootDir) command += ` --rootDir ${params.rootDir}`;
      if (params.save && params.outputDir)
        command += ` --outDir ${params.outputDir}`;
      if (params.stripComments) command += ' --removeComments';

      if (!params.save) {
        command += ` --outDir ${__tmpDir()}/ts/unsaved`;
      }

      // create the CLI process
      const pro = new __SCliProcess(command, {
        process: {
          runAsChild: false,
          stdio: false,
          decorators: false
        }
      });

      // keep track of compiled files
      const compiledFiles = [];

      // pipe what comes from the cli process
      pipeFrom(pro, {
        events: 'log',
        filter: (value) => {
          const val = value.value !== undefined ? value.value : value;
          if (val === '\u001bc') return false;
          if (val.match(/Starting\scompilation\sin\swatch\smode/)) return false;
          return true;
        },
        processor: (value, metas) => {
          let strValue = value.value !== undefined ? value.value : value;

          let clear = false,
            type = 'default',
            separator = false,
            event = 'log';

          // removing clear character
          strValue = strValue.replace('\u001bc', '');

          let lines = strValue.split('\n');

          let currentLogType;
          const logsArray: string[] = [];

          lines.forEach((line) => {
            let strToAdd = '';

            if (
              __stripAnsi(line.trim()).match(
                /.*:[0-9]{1,10}:[0-9]{1,10}\s-\serror\s/gm
              )
            ) {
              event = 'error';
              strToAdd = `<red>[error]</red> ${line.trim()}\n`;
              logsArray.push(strToAdd);
            } else if (__stripAnsi(line.trim()).match(/^error\s/)) {
              event = 'error';
              strToAdd = `<red>[error]</red> ${line
                .trim()
                .replace(/^error\s/, '')}\n`;
              logsArray.push(strToAdd);
            } else if (line.trim().match(/File\schange\sdetected/)) {
              clear = true;
              strToAdd = `<yellow>[update]</yellow> File change detected`;
              logsArray.push(strToAdd);
            } else if (line.trim().match(/Found\s[0-9]+\serror(s)?/)) {
              const count = line.match(/.*([0-9]+).*/);
              if (count && count.length === 2 && count[1] === '0') {
                strToAdd = line.replace(
                  /.*Found\s([0-9]+)\serror.*/,
                  `<green>[success]</green> Found <yellow>$1</yellow> error`
                );
              } else {
                strToAdd = line.replace(
                  /.*Found\s([0-9]+)\serror.*/,
                  `<red>[error]</red> Found <yellow>$1</yellow> error(s)`
                );
              }
              logsArray.push(strToAdd);
              if (params.watch) {
                separator = true;
                logsArray.push(`<blue>[watch] </blue>Watching for changes...`);
              }
            } else if (line.trim().match(/TSFILE:\s/)) {
              // Emit file
              let filesArray: string[] = [];
              line.split('TSFILE: ').forEach((fileStr) => {
                if (fileStr.trim() === '') return;

                // add to compiled files array
                const filePath = fileStr.trim();
                if (compiledFiles.indexOf(filePath) === -1)
                  compiledFiles.push(filePath);

                if (params.save) {
                  filesArray.push(
                    `<green>[saved]</green> File "<cyan>${fileStr
                      .trim()
                      .replace(
                        `${__packageRoot()}/`,
                        ''
                      )}</cyan>" saved <green>successfully</green>`
                  );
                }
              });
              strToAdd = filesArray.join('\n');
              logsArray.push(strToAdd);
            }
          });

          if (!logsArray.length) return;

          strValue = logsArray.join('\n');

          if (value.value !== undefined) value.value = strValue;
          else value = strValue;

          if (clear) {
            emit('log', {
              type: 'time'
            });
          }

          if (separator) {
            emit('log', {
              type: 'separator'
            });
          }

          emit(event, {
            type,
            clear,
            value: strValue
          });

          // return [value, metas];
        }
      });
      const result = await pro.run(params);

      // handle error rejection
      if (
        result &&
        typeof result === 'string' &&
        __stripAnsi(result.trim()).match(/^error\s/)
      ) {
        return reject(result);
      }

      // gather all the compiled files
      const resultFiles = {};
      const resultCode = {};
      compiledFiles.forEach((filePath) => {
        const file = new __SFile(filePath);
        resultFiles[file.relPath] = file;
        if (!resultCode.js && !filePath.match(/\.map$/)) {
          resultCode.js = file.content;
        } else if (!resultCode.map && filePath.match(/\.map$/)) {
          resultCode.map = file.content;
        }
      });

      let resultObj = {
        ...duration.end()
      };

      if (params.save) {
        resultObj.files = resultFiles;
      }
      if (compiledFiles.length <= 2) {
        resultObj = {
          ...resultObj,
          ...resultCode
        };
      }

      resolve(resultObj);
    });
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
