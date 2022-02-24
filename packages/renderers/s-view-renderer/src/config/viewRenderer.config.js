import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: __path.resolve(__dirname(), '../node/engines/blade/bladeViewEngine'),
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: __path.resolve(__dirname(), '../node/dataHandlers/js.js'),
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1JlbmRlcmVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXdSZW5kZXJlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLENBQUMsb0NBQW9DLENBQUM7UUFFaEQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSx5Q0FBeUM7UUFFbkQsT0FBTyxFQUFFO1lBQ0wsUUFBUSxFQUFFO2dCQUNOOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFFekI7Ozs7Ozs7OzttQkFTRztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUFFLEVBQ1gsdUNBQXVDLENBQzFDO2FBQ0o7U0FDSjtRQUVELFlBQVksRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2dCQUMxQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQzthQUNsRTtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==