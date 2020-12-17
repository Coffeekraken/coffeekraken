// @ts-nocheck
import __findUp from '../../fs/findUp';
import __SFile from '../../fs/SFile';
import __path from 'path';
import __fs from 'fs';
import __tmpDir from '../../fs/tmpDir';
import __md5 from '../../crypt/md5';
import __packageRoot from '../../path/packageRoot';
import __SCliProcess from '../../process/SCliProcess';
import __deepMerge from '../../object/deepMerge';
import __sugarConfig from '../../config/sugar';
import __folderPath from '../../fs/folderPath';
import __wait from '../../time/wait';
import ICompileTs, {
  ICompileTsParams,
  ICompileTsSettings
} from './interface/ICompileTs';
import __glob from 'glob';
import __compileTsInterface from './interface/compileTsInterface';
import __SPromise from '../../promise/SPromise';
import __copy from '../../clipboard/copy';
import __TscInterface from './interface/TscInterface';
import __watch from '../../fs/watch';
import __convert from '../../time/convert';
import __transpileAndSave from './transpileAndSave';

/**
 * @name                compileTs
 * @namespace           sugar.node.typescript.compile
 * @type                Function
 * @async
 *
 * This function allows you to compile some typescript using the native tsc compiler
 *
 * @param       {ICompileTsParams}          params          A parameters object to configure your compilation
 * @return      {SPromise}                                  A promise that will be resolved once the compilation is finished
 *
 * @example             js
 * import compileTs from '@coffeekraken/sugar/node/typescript/compile/compileTs';
 * await compileTs({
 *
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn: ICompileTs = function compileTs(
  params: ICompileTsParams,
  settings: ICompileTsSettings
): Promise<any> {
  const promise = new __SPromise();

  (async (resolve, reject, trigger, cancel) => {
    const tmpDir: string = __tmpDir();

    const stacks = {};

    // load the typescript config
    const tsConfig = __sugarConfig('ts');

    if (params.stacks !== undefined && params.project !== undefined) {
      throw `Sorry but you cannot specify the "<yellow>project</yellow>" and the "<yellow>stacks</yellow>" parameters at the same time...`;
    }

    if (params.stacks !== undefined) {
      params.stacks.forEach(async (stack) => {
        if (tsConfig.stacks[stack] === undefined) {
          throw `You try to compile the stack "<yellow>${stack}</yellow>" but it is not defined in your "<cyan>ts.config.js</cyan>" file. Here's the available stacks:
          - ${Object.keys(tsConfig.stacks).join('\n- ')}`;
        }

        // generate the final config
        const tsconfigJson = __deepMerge(tsConfig, tsConfig.stacks[stack]);
        delete tsconfigJson.stacks;

        stacks[stack] = {
          tsconfigJson,
          tsconfigPath: `${tmpDir}/ts/tsconfig.${stack}.json`,
          include:
            params.input !== undefined ? [params.input] : tsconfigJson.include
        };
      });
    } else if (params.project !== undefined) {
      // loop on each configs to generate the final ones
      params.project.forEach(async (configFile) => {
        // read the file
        const configJson = configFile.readSync();
        // extend using the passed "settings"
        const finalConfigJson = __deepMerge(tsConfig, configJson, settings);
        if (!finalConfigJson.compilerOptions)
          finalConfigJson.compilerOptions = {};
        finalConfigJson.compilerOptions.noEmit = true;

        stacks[configFile.path] = {
          tsconfigJson: finalConfigJson,
          tsconfigPath: `${tmpDir}/ts/tsconfig.${__md5.encrypt(
            configFile.path
          )}.json`,
          include:
            params.input !== undefined ? [params.input] : configJson.include
        };
      });
    } else {
      // try to load the default file at the project root
      const tsconfigPath = `${__packageRoot()}/tsconfig.json`;
      if (__fs.existsSync(tsconfigPath) === true) {
        const tsconfigJson = require(tsconfigPath);
        stacks['tsconfig.json'] = {
          tsconfigJson,
          tsconfigPath,
          include:
            params.input !== undefined ? [params.input] : tsconfigJson.include
        };
      }
    }

    if (Object.keys(stacks).length === 0) {
      promise.trigger(
        'error',
        [
          `Sorry but their's nothing to compile.`,
          `In order to specify files/folders to compile, you have these choices:`,
          `1. Specify some "stacks" to compile in your "<yellow>.sugar/ts.config.js</yellow>" file and launch the compilation using the "<cyan>-s {stack}</cyan>" argument.`,
          `2. Specify a "<yellow>project</yellow>" tsconfig.json path using the standard "<cyan>-p|--project</cyan>" argument.`,
          `3. Create a "<yellow>tsconfig.json</yellow>" file at your project root which is "<cyan>${__packageRoot()}</cyan>".`
        ].join('\n')
      );
    }

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

      if (!Array.isArray(stackObj.include)) {
        throw `Sorry but you have to specify some files to compile using either the "<yellow>input</yellow>" argument, either by specifying the "<yellow>include</yellow>" property in your "<cyan>ts.config.js</cyan>" or in your "<cyan>tsconfig.json</cyan>" default file...`;
      }

      // generate temp files pathes
      const tmpConfigFile: __SFile = new __SFile(stackObj.tsconfigPath, {
        checkExistence: false
      });

      // process the include pathes to make them absolute
      stackObj.include = stackObj.include.map((path) => {
        if (__path.isAbsolute(path)) return path;
        return __path.resolve(__packageRoot(), path);
      });
      stackObj.tsconfigJson.include = stackObj.include;

      // write the temp config file
      tmpConfigFile.writeSync(JSON.stringify(stackObj.tsconfigJson, null, 4));

      // duration stacks
      const durationStack = {};

      // check if watch or not
      if (params.watch === true) {
        promise.trigger('log', {
          value: `<magenta>[${stack}]</magenta> Watch mode <green>enabled</green>`
        });
      }

      // init the stack to watch
      let toWatch = stackObj.include;
      toWatch = toWatch.map((t) => {
        return t.replace(/\.tsx?$/, '.{js,ts}');
      });

      await new Promise(async (resolveWatch) => {
        __watch(toWatch, {
          // cwd: __folderPath(stackObj.tsconfigPath)
        })
          .on('ready', () => {
            if (stacksStates[stack].ready) return;
            stacksStates[stack].ready = true;
            promise.trigger('log', {
              value: `<magenta>[${stack}]</magenta> Watching files process <green>ready</green>`
            });
            resolveWatch();
          })
          .on('change', async (file) => {
            if (file.extension === 'ts' && params.watch) {
              file.update();
              durationStack[file.path] = Date.now();
              setTimeout(() => {
                delete durationStack[file.path];
              }, 60000);

              promise.trigger('log', {
                value: `<magenta>[${stack}]</magenta> <yellow>updated</yellow> <green>${file.path.replace(
                  `${__packageRoot()}/`,
                  ''
                )}</green> <yellow>${file.sizeInKBytes}kb</yellow>`
              });

              if (params.transpileOnly === true) {
                const typescriptResult = await __transpileAndSave(
                  file.path,
                  stackObj.tsconfigJson.compilerOptions
                );
              }
            }

            if (file.extension === 'js') {
              let duration = ' ';
              if (
                durationStack[file.path.replace(/\.js$/, '.ts')] !== undefined
              ) {
                duration = ` in ${__convert(
                  Date.now() - durationStack[file.path.replace(/\.js$/, '.ts')],
                  's'
                )}s`;
              }
              promise.trigger('log', {
                value: `<magenta>[${stack}]</magenta> <cyan>compiled</cyan> <green>${file.path.replace(
                  `${__packageRoot()}/`,
                  ''
                )}</green> <yellow>${file.sizeInKBytes}kb</yellow>${duration}`
              });
            }
          });
      });

      // clean params
      delete params.stacks;

      // specify the config file to use
      params.project = stackObj.tsconfigPath;

      if (
        params.transpileOnly === undefined ||
        params.transpileOnly === false
      ) {
        promise.trigger('log', {
          value: `<magenta>[${stack}]</magenta> Starting a full <yellow>tsc</yellow> process`
        });
        // instanciate a new process
        const pro = new __SCliProcess('tsc [arguments]', {
          definition: __compileTsInterface.definition,
          metas: false,
          stdio: false
        });
        __SPromise.pipe(pro, promise);
        pro.run(params);
      } else if (params.transpileOnly === true) {
        promise.trigger('log', {
          value: `<magenta>[${stack}]</magenta> Transpile only mode <green>enabled</green>`
        });

        if (params.watch === undefined || params.watch === false) {
          promise.trigger('log', {
            value: `<magenta>[${stack}]</magenta> Starting the compilation in <yellow>transpileOnly</yellow> mode`
          });
          promise.trigger('log', {
            value: `<magenta>[${stack}]</magenta> Listing all the files to transpile depending on:\n- ${stackObj.include
              .map(
                (t) => `<green>${t.replace(`${__packageRoot()}/`, '')}</green>`
              )
              .join('\n- ')}`
          });
          let files = [];
          for (let i = 0; i < stackObj.include.length; i++) {
            const filesFounded = __glob.sync(stackObj.include[i], {
              absolute: true
            });
            files = [...files, ...filesFounded];
          }
          promise.trigger('log', {
            value: `<magenta>[${stack}]</magenta> Found <yellow>${files.length}</yellow> file(s) to compile`
          });

          await __wait(10);

          for (let i = 0; i < files.length; i++) {
            const filePath = files[i];
            // transpiling the file
            await __transpileAndSave(
              filePath,
              stackObj.tsconfigJson.compilerOptions
            );
          }
        }
      }
    }
  })();

  return promise;
};

export = fn;
