import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name            rootDirs
         * @namespace       config.views
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
         * @namespace       config.views
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
                 * @namespace     config.views.engines.bladePhp
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
                 * @namespace     config.views.engines.bladePhp
                 * @type          String
                 *
                 * Store the path where to find the blade.php template engine
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: __path.resolve(__dirname(), '../node/engines/blade/bladeViewEngine'),
            },
        },
        dataHandlers: {
            jsJson: {
                /**
                 * @name          extensions
                 * @namespace     config.views.dataHandlers.jsJson
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
                 * @namespace     config.views.dataHandlers.jsJson
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlld3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1FBRWhEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUseUNBQXlDO1FBRW5ELE9BQU8sRUFBRTtZQUNMLFFBQVEsRUFBRTtnQkFDTjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBRXpCOzs7Ozs7Ozs7bUJBU0c7Z0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2hCLFNBQVMsRUFBRSxFQUNYLHVDQUF1QyxDQUMxQzthQUNKO1NBQ0o7UUFFRCxZQUFZLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ0o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztnQkFDMUI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsNEJBQTRCLENBQUM7YUFDbEU7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=