import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __path from 'path';
// import __execPhp from 'exec-php';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __childProcess from 'child_process';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import { ISViewRendererSettings } from '../../SViewRenderer';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';

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
    id: 'blade',
    settings: {},
    render(viewPath: string, data: any = {}, settings: ISViewRendererSettings) {
        return new __SPromise(
            ({ resolve, reject, emit }) => {
                if (!__fs.existsSync(viewPath)) {
                    return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
                }

                if (!__fs.existsSync(settings.cacheDir)) {
                    __fs.mkdirSync(settings.cacheDir, { recursive: true });
                }

                let viewDotPath = viewPath;
                __unique([...settings.rootDirs]).forEach((path) => {
                    viewDotPath = viewDotPath.replace(`${path}/`, '');
                });
                viewDotPath = viewDotPath.split('/').join('.').replace('.blade.php', '');

                resolve(
                    __execPhp(
                        __dirname() + '/compile.php',
                        {
                            rootDirs: __unique([...settings.rootDirs]),
                            viewDotPath,
                            data,
                            cacheDir: settings.cacheDir,
                        },
                        {
                            paramsThroughFile: true,
                        },
                    ),
                );
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    },
};
