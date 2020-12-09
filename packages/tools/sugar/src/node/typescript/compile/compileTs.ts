// @ts-nocheck
import __findUp from '../../fs/findUp';
import __SFile from '../../fs/SFile';
import __path from 'path';
import __tmpDir from '../../fs/tmpDir';
import __md5 from '../../crypt/md5';
import __packageRoot from '../../path/packageRoot';
import __SCliProcess from '../../process/SCliProcess';
import __deepMerge from '../../object/deepMerge';
import ICompileTs, {
  ICompileTsParams,
  ICompileTsSettings
} from './interface/ICompileTs';
import __compileTsInterface from './interface/compileTsInterface';
import __SPromise from '../../promise/SPromise';
import __copy from '../../clipboard/copy';
import __TscInterface from './interface/TscInterface';
import __watch from '../../fs/watch';

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
  return new __SPromise(async (resolve, reject, trigger, cancel) => {
    const tmpDir: string = __tmpDir();

    // check if we have a config passed
    if (params.project !== undefined) {
      // loop on each configs to generate the final ones
      params.project.forEach(async (configFile) => {
        // generate temp files pathes
        const tmpConfigFile: __SFile = new __SFile(
          `${tmpDir}/tsconfig.${__md5.encrypt(configFile.path)}.json`,
          {
            checkExistence: false
          }
        );
        // read the file
        const configJson = configFile.readSync();
        // // check if the config has an "extends" prop
        // if (configJson.extends !== undefined) {
        //   // read this file
        //   const baseFilePath = __path.resolve(
        //     configFile.dirPath,
        //     configJson.extends
        //   );
        //   const baseConfigFile: __SFile = new __SFile(baseFilePath);
        //   const baseConfigJson = baseConfigFile.readSync();
        // }
        // extend using the passed "settings"
        const finalConfigJson = __deepMerge(configJson, settings);
        // write the temp config file
        tmpConfigFile.writeSync(finalConfigJson);

        console.log('f');

        if (finalConfigJson && finalConfigJson.include) {
          await new Promise((resolve, reject) => {
            __watch(
              finalConfigJson.include.map((path) =>
                path.replace(/\.ts$/, '.js')
              ),
              {
                // ignored: finalConfigJson.exclude,
                cwd: configFile.dirPath
              }
            )
              .on('ready', () => {
                trigger('log', {
                  value: 'Watching compiled files process <green>ready</green>'
                });
                resolve();
              })
              .on('add', (file) => {
                trigger('log', {
                  value: `[<cyan>added</cyan>]: <green>${file.path.replace(
                    `${__packageRoot()}/`,
                    ''
                  )}</green> (${file.sizeInKBytes}kb)`
                });
              })
              .on('change', (file) => {
                trigger('log', {
                  value: `[<yellow>updated</yellow>]: <green>${file.path.replace(
                    `${__packageRoot()}/`,
                    ''
                  )}</green> (${file.sizeInKBytes}kb)`
                });
              });
          });
        }

        // delete params that are not compatible with the tsc command
        delete params.input;

        // check if watch or not
        if (params.watch === true) {
        } else {
          trigger('log', {
            value: 'Start file(s) compilation...'
          });
        }

        // instanciate a new process
        const pro = new __SCliProcess('tsc [arguments]', {
          definition: __compileTsInterface.definition,
          metas: false
        });
        pro.run(params);
      });
    }

    // const files = await __findUp('tsconfig.json', {
    //   stopWhenFound: true
    // });
    // console.log('CC', files[0].readSync());
  });
};

export = fn;
