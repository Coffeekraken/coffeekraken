// @ts-nocheck

import __SCache from '../../cache/SCache';
import __path from 'path';
import __stripCssComments from '../../css/stripCssComments';
import __folderPath from '../../fs/folderPath';
import __deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';
import __md5 from '../../crypt/md5';
import __sass from 'sass';
import __packageRoot from '../../path/packageRoot';
import __getFilename from '../../fs/filename';
import __isPath from '../../is/path';
import __fs from 'fs';
import __getSharedResourcesString from './getSharedResourcesString';
import __putUseStatementsOnTop from './utils/putUseStatementsOnTop';
import __glob from 'glob';
import __createQueryWrapper from 'query-ast';
import __csso from 'csso';
import __isGlob from 'is-glob';
import __unique from '../../array/unique';
import __STsCompileInterface from './interface/STsCompileInterface';
import __transpileAndSave from './transpileAndSave';

import __TscInterface from './interface/TscInterface';
import __SFile from '../../fs/SFile';
import __tmpDir from '../../fs/tmpDir';
import __SCliProcess from '../../process/SCliProcess';

/**
 * @name                STsCompiler
 * @namespace           sugar.node.typescript
 * @type                Class
 * @wip
 *
 * This class wrap the "ts" compiler with some additional features which are:
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 *
 * @setting         {String}        [id=this.constructor.name]          An id for your compiler. Used for cache, etc...
 * @setting         {Object}        [ts={}]        Pass the "sass" (https://www.npmjs.com/package/sass) options here. ! The "file" and "data" properties are overrided by the first parameter of the "compile" method
 * @setting         {Onject}       [optimizers={}]     Pass an object of optimizing settings
 * @setting         {Boolean}       [optimizers.split=true]     Specify if you want to make use of the splitting code technique to compile only what's really changed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import STsCompiler from '@coffeekraken/sugar/node/scss/STsCompiler';
 * const compiler = new STsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class STsCompiler {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the instance settings
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

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
  constructor(settings = {}) {
    this._settings = __deepMerge(
      {
        id: this.constructor.name
      },
      settings
    );
  }

  /**
   * @name              compile
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
  compile(params, settings = {}) {
    params = __deepMerge(
      {
        ...__STsCompileInterface.getDefaultValues()
      },
      params
    );

    settings = __deepMerge(this._settings, settings);

    return new __SPromise(
      async (resolve, reject, trigger, promise) => {
        const startTime = Date.now();

        // engage the cache
        const cache = new __SCache(settings.id, {
          ttl: '10d'
        });
        if (params.clearCache) {
          await cache.clear();
        }
        let cacheId;
        const tmpDir: string = __tmpDir();
        const stacks = {};

        if (params.stacks !== undefined && params.project !== undefined) {
          return reject(
            `Sorry but you cannot specify the "<yellow>project</yellow>" and the "<yellow>stacks</yellow>" parameters at the same time...`
          );
        }

        const filesToCompile = [
          ...(params.tsconfig.include || []),
          ...(params.tsconfig.files || [])
        ];

        if (params.input != undefined) {
          if (!Array.isArray(params.input)) params.input = [params.input];

          trigger('log', {
            value: `<yellow>Input</yellow> file(s) to compile:\n- <cyan>${params.input.join(
              '</cyan>\n- <cyan>'
            )}</cyan>`
          });

          const tsconfigJson = __deepMerge(params.tsconfig, {
            files: [...filesToCompile, ...params.input]
          });

          const filesHash = __md5.encrypt(params.input.join(','));

          stacks[params.input] = {
            tsconfigJson,
            tsconfigPath: `${tmpDir}/ts/tsconfig.${settings.id}.input.${filesHash}.json`
          };
        } else if (params.stacks !== undefined) {
          trigger('log', {
            value: `<yellow>Stack(s)</yellow> to compile: <magenta>${params.stacks.join(
              '</magenta>, <magenta>'
            )}</magenta>`
          });

          params.stacks.forEach(async (stack) => {
            if (params.tsconfig.stacks[stack] === undefined) {
              return reject(`You try to compile the stack "<yellow>${stack}</yellow>" but it is not defined in your "<cyan>ts.config.js</cyan>" file. Here's the available stacks:
          - ${Object.keys(params.tsconfig.stacks).join('\n- ')}`);
            }

            // generate the final config
            const tsconfigJson = __deepMerge(
              params.tsconfig,
              params.tsconfig.stacks[stack],
              {
                files: [
                  ...filesToCompile,
                  ...(tsconfig.stacks[stack].include || []),
                  ...(tsconfig.stacks[stack].files || [])
                ]
              }
            );

            stacks[stack] = {
              tsconfigJson,
              tsconfigPath: `${tmpDir}/ts/tsconfig.${settings.id}.stack.${stack}.json`
            };
          });
        } else if (params.project !== undefined) {
          trigger('log', {
            value: `<yellow>Project(s)</yellow> to compile:\n- <magenta>${params.stacks.join(
              '</magenta>\n- <magenta>'
            )}</magenta>`
          });

          // loop on each configs to generate the final ones
          params.project.forEach(async (configFile) => {
            // read the file
            const configJson = configFile.readSync();
            // extend using the passed "settings"
            const finalConfigJson = __deepMerge(
              params.tsconfig,
              configJson,
              settings
            );
            if (!finalConfigJson.compilerOptions)
              finalConfigJson.compilerOptions = {};
            finalConfigJson.compilerOptions.noEmit = true;

            finalConfigJson.files = [
              ...filesToCompile,
              ...(finalConfigJson.include || []),
              ...(finalConfigJson.files || [])
            ];

            stacks[configFile.path] = {
              tsconfigJson: finalConfigJson,
              tsconfigPath: `${tmpDir}/ts/tsconfig.${__md5.encrypt(
                configFile.path
              )}.json`
            };
          });
        } else {
          trigger('log', {
            value: `Compiling default project: <cyan>${__packageRoot()}/tsconfig.json</cyan>`
          });

          // try to load the default file at the project root
          const tsconfigPath = `${__packageRoot()}/tsconfig.${
            settings.id
          }.json`;
          if (__fs.existsSync(tsconfigPath) === true) {
            const tsconfigJson = require(tsconfigPath);
            stacks['tsconfig.json'] = {
              tsconfigJson,
              tsconfigPath
            };
          }
        }

        if (Object.keys(stacks).length === 0) {
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

        // generated files
        const generatedFiles = [];

        // loop on each "stacks" to compile
        let stacksStates = {};
        for (let i = 0; i < Object.keys(stacks).length; i++) {
          const stack = Object.keys(stacks)[i];
          const stackObj = stacks[stack];
          delete stackObj.tsconfigJson.extends;
          delete stackObj.tsconfigJson.stacks;
          stacksStates[stack] = {
            ready: false
          };

          if (
            !stackObj.tsconfigJson.files ||
            !stackObj.tsconfigJson.files.length
          ) {
            return reject(
              `Sorry but you have to specify some files to compile using either the "<yellow>input</yellow>" argument, by specifying the "<yellow>stack</yellow>" argument either by specifying the "<yellow>include</yellow>" property in your "<cyan>ts.config.js</cyan>" or in your "<cyan>tsconfig.json</cyan>" default file...`
            );
          }

          // generate temp files pathes
          const tmpConfigFile: __SFile = new __SFile(stackObj.tsconfigPath, {
            checkExistence: false
          });

          // process the include pathes to make them absolute
          if (stackObj.tsconfigJson.files) {
            let filesPaths = [];
            stackObj.tsconfigJson.files.forEach((path) => {
              if (__path.isAbsolute(path)) {
                if (__isGlob(path)) {
                  filesPaths = [...filesPaths, ...__glob.sync(path)];
                  return;
                }
                if (!__fs.existsSync(path)) {
                  filesPaths.push(`${__packageRoot()}${path}`);
                  return;
                }
              }
              if (__isGlob(path)) {
                filesPaths = [
                  ...filesPaths,
                  ...__glob
                    .sync(path, {
                      cwd: __packageRoot()
                    })
                    .map((p) => {
                      return `${__packageRoot()}/${p}`;
                    })
                ];
                return;
              }
              filesPaths.push(__path.resolve(__packageRoot(), path));
            });
            stackObj.tsconfigJson.files = filesPaths;
          }

          // write the temp config file
          tmpConfigFile.writeSync(
            JSON.stringify(stackObj.tsconfigJson, null, 4)
          );

          // duration stacks
          const durationStack = {};

          // clean params
          delete params.stacks;

          // specify the config file to use
          params.project = stackObj.tsconfigPath;

          if (
            params.transpileOnly === undefined ||
            params.transpileOnly === false
          ) {
            trigger('log', {
              value: `<magenta>[${stack}]</magenta> Starting a full <yellow>tsc</yellow> process`
            });
            // instanciate a new process
            const def = __STsCompileInterface.definition;
            Object.keys(def).forEach((prop) => {
              if (__TscInterface.definition[prop] === undefined)
                delete def[prop];
            });

            const pro = new __SCliProcess('tsc [arguments]', {
              definition: def,
              metas: false,
              stdio: false
            });
            promise.pipe(pro);
            await pro.run(params);
          } else if (params.transpileOnly === true) {
            trigger('log', {
              value: `<magenta>[${stack}]</magenta> Transpile only mode <green>enabled</green>`
            });

            for (let i = 0; i < stackObj.tsconfigJson.files.length; i++) {
              const filePath = stackObj.tsconfigJson.files[i];
              // transpiling the file
              await __transpileAndSave(
                filePath,
                stackObj.tsconfigJson.compilerOptions
              );
            }
          }

          for (let j = 0; j < stackObj.tsconfigJson.files.length; j++) {
            const path = stackObj.tsconfigJson.files[j];
            stackObj.tsconfigJson.files.forEach((filePath) => {
              generatedFiles.push(
                new __SFile(filePath.replace(/\.ts$/, '.js'))
              );
            });
          }
        }

        // resolve with the compilation result
        resolve({
          files: generatedFiles,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      },
      {
        id: this._settings.id
      }
    );
  }
};
