import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import { __unique } from '@coffeekraken/sugar/array';
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
        return new Promise(async (resolve) => {
            if (!__fs.existsSync(viewRendererSettings.cacheDir)) {
                __fs.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }

            if (!viewPath.includes('/')) {
                viewPath = viewPath.replace(/\.(?!md|twig)/gm, '/');
            }
            if (!viewPath.match(/\.twig$/)) {
                viewPath += '.twig';
            }

            __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewPath = viewPath.replace(`${path}/`, '');
            });

            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;

            const resPro = __execPhp(
                __path.resolve(
                    __packageRootDir(__dirname()),
                    'src/php/compile.php',
                ),
                {
                    rootDirs: __unique([...viewRendererSettings.rootDirs]),
                    viewPath,
                    data,
                    cacheDir: viewRendererSettings.cacheDir,
                },
                {
                    paramsThroughFile: true,
                },
            );

            resPro.catch((e) => {
                console.error(e);

                resolve({
                    error: e,
                });
            });
            const res = await resPro;

            if (res.match(/^Twig\\Error\\[a-zA-Z]+Error/)) {
                resolve({
                    error: res,
                });
            } else {
                resolve({
                    value: res,
                });
            }
        });
    }
}
