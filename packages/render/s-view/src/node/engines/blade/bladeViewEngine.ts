import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __execPhp from 'exec-php';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __childProcess from 'child_process';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import { ISViewSettings } from '../../SView';

/**
 * @name            bladeViewEngine
 * @namespace       s-render.engines
 * @type            ISViewEngine
 *
 * This is the blade.php view engine that allows you
 * to render .blade.php views.
 *
 * @see             https://github.com/jenssegers/blade
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  settings: {},
  render(viewPath: string, data: any = {}, settings: ISViewSettings) {
    return new __SPromise(
      ({ resolve, reject }) => {
        if (!__fs.existsSync(viewPath)) {
          return reject(
            `It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`
          );
        }

        // preparing the php execution
        __execPhp(
          __dirname + '/compile.php',
          // __path.resolve(__dirname, '../../../bin/php'),
          (error, php, outprint) => {
            console.log(settings);

            if (error) {
              return reject(error + ' ---- ' + outprint);
            }

            const viewFilename = __getFilename(viewPath);

            // execute the php engine and get back the result
            php.compile(
              __unique([...settings.rootDirs]),
              viewFilename.replace('.blade.php', '').split('/').join('.'),
              data,
              settings.cacheDir,
              async (error, result, output, printed) => {
                if (error) {
                  const cmd = error
                    .toString()
                    .replace('Error: Command failed: ', '');
                  const res = __childProcess.spawnSync(cmd, [], {
                    shell: true
                  });
                  if (res && res.stdout) {
                    return resolve(res.stdout.toString());
                  }
                }
                // get the best result possible
                const ret = result || printed || output || error;
                // resolve the promise with the best result possible
                resolve(ret);
              }
            );
          }
        );
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
};
