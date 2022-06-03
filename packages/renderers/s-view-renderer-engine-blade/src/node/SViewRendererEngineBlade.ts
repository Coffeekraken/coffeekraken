import __SPromise from '@coffeekraken/s-promise';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __path from 'path';
import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineBladeSettingsInterface';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __SBench from '@coffeekraken/s-bench';

/**
 * @name            SViewRendererEngineBlade
 * @namespace       node
 * @type            Class
 *
 * This class is the blade.php view engine that allows you
 * to render .blade.php views.
 *
 * @see             https://github.com/jenssegers/blade
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISViewRendererEngineBladeSettings {}

export default class SViewRendererEngineBlade {
    static id = 'blade';
    static extensions = ['blade.php'];
    static settingsInterface = __SViewRendererBladeEngineSettingsInterface;
    settings: ISViewRendererEngineBladeSettings = {};

    constructor(settings?: Partial<ISViewRendererEngineBladeSettings>) {
        this.settings = settings ?? {};
    }

    render(
        viewPath: string,
        data: any = {},
        viewRendererSettings: ISViewRendererSettings,
    ) {
        return new __SPromise(
            ({ resolve, reject, emit }) => {
                if (!__fs.existsSync(viewPath)) {
                    return reject(
                        `It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`,
                    );
                }

                __SBench.start('SViewRendererEngineBlade.render');

                __SBench.step(
                    'SViewRendererEngineBlade.render',
                    `beforeRender.${viewPath}`,
                );

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

                resolve(
                    __execPhp(
                        __path.resolve(
                            __packageRoot(__dirname()),
                            'src/php/compile.php',
                        ),
                        {
                            rootDirs: __unique([
                                ...viewRendererSettings.rootDirs,
                            ]),
                            viewDotPath,
                            data,
                            cacheDir: viewRendererSettings.cacheDir,
                        },
                        {
                            paramsThroughFile: true,
                        },
                    ),
                );

                __SBench.step(
                    'SViewRendererEngineBlade.render',
                    `afterRender.${viewPath}`,
                );

                __SBench.end('SViewRendererEngineBlade.render').log();
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
