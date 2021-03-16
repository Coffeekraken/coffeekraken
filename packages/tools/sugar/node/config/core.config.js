"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../node/path/packageRoot"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvcmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQXFEO0FBRXJELGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLEVBQUU7UUFDVDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLENBQUMscUJBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxxQkFBYSxFQUFFLENBQUM7UUFFakQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxLQUFLO1FBRWQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsYUFBYSxFQUFFLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUV4RTs7Ozs7Ozs7O09BU0c7SUFDSCxTQUFTLEVBQUU7UUFDVDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsT0FBTyxFQUFFLFFBQVE7UUFFakI7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsT0FBTyxFQUFFLHFCQUFhLEVBQUU7S0FDekI7Q0FDRixDQUFDIn0=