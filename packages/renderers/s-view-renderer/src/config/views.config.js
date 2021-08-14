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
        /**
         * @name      engines
         * @namespace   config.views
         * @type      Object
         *
         * Store all the available engines when using the ```STemplate``` class.
         * You can override or add some engines here using the format "{extension}: {path}"
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        engines: {
            /**
             * @name          blade.php
             * @namespace     config.views.engines
             * @type          String
             *
             * Store the path where to find the blade.php template engine
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            'blade.php': __path.resolve(__dirname(), '../node/engines/blade/bladeViewEngine'),
        },
        /**
         * @name      dataHandlers
         * @namespace   config.views
         * @type      Object
         *
         * Store all the available dataHandlers when using the ```STemplate``` class.
         * You can override or add some dataHandlers here using the format "{extension}: {path}"
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        dataHandlers: {
            /**
             * @name          'js,json'
             * @namespace     config.views.dataHandlers
             * @type          String
             *
             * Store the path where to find the data.js|json data handler
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            'js,json': __path.resolve(__dirname(), '../node/dataHandlers/js.js'),
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlld3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1FBRWhEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUseUNBQXlDO1FBRW5EOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7O2VBU0c7WUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSx1Q0FBdUMsQ0FBQztTQUNwRjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUU7WUFDVjs7Ozs7Ozs7O2VBU0c7WUFDSCxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQztTQUN2RTtLQUNKLENBQUM7QUFDTixDQUFDIn0=