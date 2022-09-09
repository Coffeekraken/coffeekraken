import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import { __dirname } from '@coffeekraken/sugar/fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererTwigEngineSettingsInterface from './interface/SViewRendererEngineTwigSettingsInterface';

/**
 * @name            SViewRendererEngineTwig
 * @namespace       node
 * @type            Class
 *
 * This class is the blade.php view engine that allows you
 * to render .twig views.
 *
 * @see             https://github.com/jenssegers/blade
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISViewRendererEngineTwigSettings {}

export default class SViewRendererEngineTwig {
    static id = 'twig';
    static extensions = ['twig'];
    static settingsInterface = __SViewRendererTwigEngineSettingsInterface;
    settings: ISViewRendererEngineTwigSettings = {};

    constructor(settings?: Partial<ISViewRendererEngineTwigSettings>) {
        this.settings = settings ?? {};
    }

    render(
        viewPath: string,
        data: any = {},
        sharedDataFilePath: string,
        viewRendererSettings: ISViewRendererSettings,
    ) {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                if (!__fs.existsSync(viewPath)) {
                    return reject(
                        `It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`,
                    );
                }

                if (!__fs.existsSync(viewRendererSettings.cacheDir)) {
                    __fs.mkdirSync(viewRendererSettings.cacheDir, {
                        recursive: true,
                    });
                }

                let viewDotPath = viewPath;
                __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
                    viewDotPath = viewDotPath.replace(`${path}/`, '');
                });
                viewDotPath = viewDotPath
                    .split('/')
                    .join('.')
                    .replace('.blade.php', '');

                // pass the shared data file path through the data
                data._sharedDataFilePath = sharedDataFilePath;

                const resPro = __execPhp(
                    __path.resolve(
                        __packageRoot(__dirname()),
                        'src/php/compile.php',
                    ),
                    {
                        rootDirs: __unique([...viewRendererSettings.rootDirs]),
                        viewDotPath,
                        data,
                        cacheDir: viewRendererSettings.cacheDir,
                    },
                    {
                        paramsThroughFile: true,
                    },
                );

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: 'ehheineij',
                });

                resPro.catch((e) => {
                    // @TODO            make the 'log' event displayed on the terminal
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: e,
                    });
                    resolve({
                        error: e,
                    });
                });
                const res = await resPro;
                resolve({
                    value: res,
                });
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
