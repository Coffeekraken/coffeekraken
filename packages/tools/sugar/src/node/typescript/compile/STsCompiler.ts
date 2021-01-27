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

import __TscInterface from './interface/TscInterface';
import __STsCompilerParamsInterface from './interface/STsCompilerParamsInterface';

export interface ISTsCompilerCtorSettings {}
export interface ISTsCompilerOptionalSettings {}
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
  stacks: string[];
  tsconfig: any;
}
export interface ISTsCompilerOptionalParams {
  input?: string | string[];
  outputDir?: string;
  rootDir?: string;
  map?: boolean;
  prod?: boolean;
  stripComments?: boolean;
  minify?: boolean;
  banner?: string;
  save?: boolean;
  watch?: boolean;
  stacks?: string[];
  tsconfig?: any;
}

export interface ISTsCompiler extends ISCompiler {}

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
    initialParams: ISTsCompilerOptionalParams,
    settings: ISTsCompilerCtorSettings
  ) {
    super(
      initialParams,
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
    settings: ISScssCompilerOptionalSettings = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, pipeFrom, emit }) => {
      settings = __deepMerge(this.tsCompilerSettings, {}, settings);

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
          // pipeFrom(compilePromise);
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
          tmpConfigFileName = inputStr + '.tsconfig.js';
          // const stackPromise = this.compile();
          tsconfig = __deepMerge(tsconfig, stackObj);
        } else {
          tsconfig.files.push(inputStr);
        }
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
          `      <yellow>│</yellow> Output directory: <cyan>${params.outputDir.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>`,
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

      const startTime = Date.now();

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

      // handle params

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
      tmpConfigFile.writeSync(JSON.stringify(tsconfig, null, 4));

      // instanciate a new process
      // const def = {};
      // Object.keys(def).forEach((prop) => {
      //   if (__TscInterface.definition[prop] !== undefined) {
      //     def[prop] = __STsCompilerParamsInterface.definition[prop];
      //   }
      // });

      let command = `tsc --listEmittedFiles --pretty -p ${tmpConfigFile.path}`;
      if (params.watch) command += ' -w';
      if (!params.save) command += ' --noEmit';
      if (params.map) {
        if (params.map === 'inline') {
          command += ' --inlineSourceMap';
        } else {
          command += ' --sourceMap';
        }
      }
      if (params.rootDir) command += ` --rootDir ${params.rootDir}`;
      if (params.outputDir) command += ` --outDir ${params.outputDir}`;
      if (params.stripComments) command += ' --removeComments';

      const pro = new __SCliProcess(command, {
        process: {
          stdio: false,
          decorators: false
        }
      });
      pipeFrom(pro, {
        events: 'log',
        filter: (value) => {
          const val = value.value || value;
          if (val === '\u001bc') return false;
          if (val.match(/Starting\scompilation\sin\swatch\smode/)) return false;
          if (val.trim().match(/TSFILE:\s.*\/undefined\/.*/)) {
            return false;
          }
          return true;
        },
        processor: (value, metas) => {
          let strValue = value.value || value;

          let endSpace = false;

          strValue = strValue.replace('\u001bc', '');

          if (strValue.trim().match(/File\schange\sdetected/)) {
            strValue = `<yellow>[update]</yellow> File change detected`;
          } else if (strValue.trim().match(/Found\s[0-9]+\serror(s)?/)) {
            const count = strValue.match(/.*([0-9]+).*/);
            if (count && count.length === 2 && count[1] === '0') {
              strValue = strValue.replace(
                /.*Found\s([0-9]+)\serror.*/,
                `<green>[ended]</green> Found <yellow>$1</yellow> error`
              );
            } else {
              strValue = strValue.replace(
                /.*Found\s([0-9]+)\serror.*/,
                `<magenta>[ended]</magenta> Found <yellow>$1</yellow> error(s)`
              );
            }
          } else if (strValue.trim().match(/.*:.*[0-9]+.*:.*[0-9]+.*\s/)) {
            strValue = strValue
              .split('\n')
              .filter((line) => {
                return !Array.isArray(line.trim().match(/^TSFILE:\s.*/));
              })
              .map((line) => {
                return `      <red>│</red> ${line}`;
              })
              .filter((line) => {
                return line.trim() !== '<red>│</red>';
              });
            strValue = strValue.join('\n');
            strValue = `<red>[error]</red> ${strValue.trim().slice(13)}`;
            endSpace = true;
          } else if (strValue.trim().match(/TSFILE:\s/)) {
            // error
            if (strValue.trim().match(/TSFILE:\s.*\/undefined\/.*/)) {
              strValue = '';
              // strValue = strValue
              //   .split('\n')
              //   .filter((line) => {
              //     return !Array.isArray(line.trim().match(/^TSFILE:\s.*/));
              //   })
              //   .map((line) => {
              //     return `      <red>│</red> ${line}`;
              //   })
              //   .join('\n');
              // strValue = `<red>[error]</red> Something went wrong\n${strValue}`;
            } else {
              // Emit file
              strValue = `<green>[saved]</green> File "<cyan>${strValue
                .replace('TSFILE: ', '')
                .trim()
                .replace(
                  `${__packageRoot()}/`,
                  ''
                )}</cyan>" saved <green>successfully</green>`;
            }
          }

          strValue = strValue.trim();
          // if (endSpace) strValue = `${strValue} \n`;

          if (value.value) value.value = strValue;
          else value = strValue;

          return [value, metas];
        }
      });
      // pro.on('log', (value, metas) => {
      //   console.log('LFLFLF', value);
      // });
      await pro.run(params);

      resolve();

      //   for (let i = 0; i < filesPaths.length; i++) {
      //     let filePath = filesPaths[i];
      //     let file = new __STsFile(filePath, {
      //       tsFile: {
      //         compile: settings
      //       }
      //     });
      //     pipe(file);

      //     const resPromise = file.compile(params, {
      //       ...settings
      //     });
      //     const res = await resPromise;
      //     resultsObj[file.path] = res;
      //   }

      //   // resolve with the compilation result
      //   if (!params.watch) {
      //     resolve({
      //       files: resultsObj,
      //       startTime: startTime,
      //       endTime: Date.now(),
      //       duration: Date.now() - startTime
      //     });
      //   } else {
      //     emit('files', {
      //       files: resultsObj,
      //       startTime: startTime,
      //       endTime: Date.now(),
      //       duration: Date.now() - startTime
      //     });
      //   }
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
