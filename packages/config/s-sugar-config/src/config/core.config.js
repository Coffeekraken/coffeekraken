"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
exports.default = {
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
        dirs: [packageRoot_1.default(__dirname), packageRoot_1.default()],
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
        exclude: []
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
        context: packageRoot_1.default()
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRGQUFzRTtBQUV0RSxrQkFBZTtJQUNiOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUyxFQUFFO1FBQ1Q7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxDQUFDLHFCQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUscUJBQWEsRUFBRSxDQUFDO1FBRWpEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUVkOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsRUFBRTtLQUNaO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGFBQWEsRUFBRSxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7SUFFeEU7Ozs7Ozs7OztPQVNHO0lBQ0gsU0FBUyxFQUFFO1FBQ1Q7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE9BQU8sRUFBRSxRQUFRO1FBRWpCOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE9BQU8sRUFBRSxxQkFBYSxFQUFFO0tBQ3pCO0NBQ0YsQ0FBQyJ9