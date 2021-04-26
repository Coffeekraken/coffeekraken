import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __execPhp from 'exec-php';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __childProcess from 'child_process';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import { ISViewRendererSettings } from '../../SViewRenderer';

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
  render(viewPath: string, data: any = {}, settings: ISViewRendererSettings) {
    return new __SPromise(
      ({ resolve, reject }) => {
        if (!__fs.existsSync(viewPath)) {
          return reject(
            `It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`
          );
        }

        if (!__fs.existsSync(settings.cacheDir)) {
          __fs.mkdirSync(settings.cacheDir, { recursive: true });
        }
        // preparing the php execution
        __execPhp(
          __dirname + '/compile.php',
          // __path.resolve(__dirname, '../../../bin/php'),
          (error, php, outprint) => {
            if (error) {
              return reject(error + ' ---- ' + outprint);
            }

            let viewDotPath = viewPath;
            __unique([...settings.rootDirs]).forEach((path) => {
              viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath
              .split('/')
              .join('.')
              .replace('.blade.php', '');

            // execute the php engine and get back the result
            php.compile(
              __unique([...settings.rootDirs]),
              viewDotPath,
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
