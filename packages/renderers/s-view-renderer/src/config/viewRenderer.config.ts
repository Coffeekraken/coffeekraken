import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        /**
         * @name            rootDirs
         * @namespace       config.viewRenderer
         * @type            string[]
         * @default          ['[config.storage.src.rootDir]/views']
         *
         * Specify the roots views directories
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDirs: [`[config.storage.src.rootDir]/views`],

        /**
         * @name            cacheDir
         * @namespace       config.viewRenderer
         * @type            String
         * @default          [config.storage.package.cacheDir]
         *
         * Specify the views template rendering cache directory
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        cacheDir: `[config.storage.package.cacheDir]/views`,

        engines: {
            bladePhp: {
                /**
                 * @name          extensions
                 * @namespace     config.viewRenderer.engines.bladePhp
                 * @type          String
                 * @default         ['blade.php']
                 *
                 * Store which extensions match this engine
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                extensions: ['blade.php'],

                /**
                 * @name          path
                 * @namespace     config.viewRenderer.engines.bladePhp
                 * @type          String
                 *
                 * Store the path where to find the blade.php template engine
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: __path.resolve(
                    __dirname(),
                    '../node/engines/blade/bladeViewEngine',
                ),
            },
        },

        dataHandlers: {
            jsJson: {
                /**
                 * @name          extensions
                 * @namespace     config.viewRenderer.dataHandlers.jsJson
                 * @type          String
                 * @default         ['js','json']
                 *
                 * Store which extensions match this handler
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                extensions: ['js', 'json'],
                /**
                 * @name          path
                 * @namespace     config.viewRenderer.dataHandlers.jsJson
                 * @type          String
                 * @default         __path.resolve(__dirname(), '../node/dataHandlers/js.js')
                 *
                 * Store the path to the jsJson handler
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: __path.resolve(__dirname(), '../node/dataHandlers/js.js'),
            },
        },
    };
}
