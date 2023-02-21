import __SPromise from '@coffeekraken/s-promise';
import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import { __unique } from '@coffeekraken/sugar/array';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import __fs from 'fs';
import { Readable } from 'stream';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineLitSettingsInterface';

/**
 * @name            SViewRendererEngineLit
 * @namespace       node
 * @type            Class
 * @platform        node
 * @status          wip
 *
 * This class is the blade.php view engine that allows you
 * to render .blade.php views.
 *
 * @see             https://github.com/jenssegers/blade
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISViewRendererEngineLitSettings {}

export default class SViewRendererEngineLit {
    static id = 'lit';
    static extensions = ['js'];
    static settingsInterface = __SViewRendererBladeEngineSettingsInterface;
    settings: ISViewRendererEngineLitSettings = {};

    constructor(settings?: Partial<ISViewRendererEngineLitSettings>) {
        this.settings = settings ?? {};
    }

    render(
        viewPath: string,
        data: any = {},
        viewRendererSettings: ISViewRendererSettings,
    ) {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
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
                    .replace('.js', '');

                const component = (await import(viewPath)).default;

                async function readableToString2(readable) {
                    let result = '';
                    for await (const chunk of readable) {
                        result += chunk;
                    }
                    return result;
                }

                const ssrResult = render(component(data));

                console.log('SSR', ssrResult);

                const resultStr = Readable.from(ssrResult);

                resultStr.on('finish', (...args) => {
                    console.log('END', args);
                });

                // console.log('res', resultStr);

                setTimeout(async () => {
                    const str = await readableToString2(resultStr);
                    resolve(str);
                }, 5000);
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
