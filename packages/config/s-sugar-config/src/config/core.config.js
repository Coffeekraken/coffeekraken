import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env) {
    if (env.platform !== 'node')
        return {};
    return {
        /**
         * @name              sugarJson
         * @namespace         config.core
         * @type              String
         * @default           []
         *
         * Configure the ```sugar.json``` feature that have some cool features like:
         * - Import automatically dependencies like javascript files and css once
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        sugarJson: {
            /**
             * @name              dirs
             * @namespace         config.core.sugarJson
             * @type              String|Array<String>
             * @default           []
             *
             * Set the directories where to search for sugar.json files
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            dirs: [__packageRoot(__dirname()), __packageRoot()],
            /**
             * @name              imports
             * @namespace         config.core.sugarJson
             * @type              String|Array<String>
             * @default           all
             *
             * Specify what you want to import. Can be "all" or an Array of NPM packages names
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            imports: 'all',
            /**
             * @name              exclude
             * @namespace         config.core.sugarJson
             * @type              String|Array<String>
             * @default           []
             *
             * Specify some NPM packages you want to exclude by adding his name into this array
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            exclude: [],
        },
        /**
         * @name             ignoreFolders
         * @namespace         config.core
         * @type            Array<String>
         * @default         ['node_modules','__tests__','__wip__','vendor','bin']
         *
         * Set the folders to exclude from searches, processing, etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ignoreFolders: ['node_modules', '__tests__', '__wip__', 'vendor', 'bin'],
        /**
         * @name            namespace
         * @namespace       config.core
         * @type            Object
         *
         * Store the default settings for the namespace generation using the "node/package/namespace" function
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        namespace: {
            /**
             * @name            pattern
             * @namespace       config.core.namespace
             * @type            String
             * @default         {path}
             *
             * Specify a generation pattern to generate the namespace. Here's the available tokens:
             * - {package.name}: The package name specified in the package.json
             * - {package.version}: The package version specified in the package.json
             * - {path}: The passed path parameter
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            pattern: '{path}',
            /**
             * @name            context
             * @namespace       config.core.namespace
             * @type            String
             * @default         __packageRoot()
             *
             * Specify the context in which to generate the namespace.
             * The context is simply a root folder from which to search for the package.json
             * file to get the name that serve to the namespace generation
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            context: __packageRoot(),
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUV2QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxTQUFTLEVBQUU7WUFDUDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFFbkQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxLQUFLO1lBRWQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztRQUV4RTs7Ozs7Ozs7O1dBU0c7UUFDSCxTQUFTLEVBQUU7WUFDUDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsT0FBTyxFQUFFLFFBQVE7WUFFakI7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0gsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUMzQjtLQUNKLENBQUM7QUFDTixDQUFDIn0=