import __SBench from '@coffeekraken/s-bench';
import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import { __unique } from '@coffeekraken/sugar/array';
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineBladeSettingsInterface';

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
        sharedDataFilePath: string,
        viewRendererSettings: ISViewRendererSettings,
    ) {
        return new Promise((resolve) => {
            const bench = new __SBench(
                `SViewRendererEngineBlade.render.${viewPath.replace(
                    __packageRootDir(),
                    '',
                )}`,
            );

            bench.step(`beforeRender`);

            if (!__fs.existsSync(`${viewRendererSettings.cacheDir}/blade`)) {
                __fs.mkdirSync(`${viewRendererSettings.cacheDir}/blade`, {
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
                    __packageRootDir(__dirname()),
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

            resPro.then(
                (res) => {
                    resolve({
                        value: res,
                    });

                    // if (res.match(//))

                    bench.end();
                },
                (e) => {
                    // @TODO            make the 'log' event displayed on the terminal
                    console.error(e);

                    resolve({
                        error: e,
                    });

                    bench.end();
                },
            );
        });
    }
}
