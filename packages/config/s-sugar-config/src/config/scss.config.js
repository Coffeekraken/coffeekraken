"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipAddress_1 = __importDefault(require("../node/network/utils/ipAddress"));
exports.default = {
    // import some settings
    borders: '[config.borders]',
    classes: '[config.classes]',
    components: '[config.components]',
    colors: '[config.colors]',
    fonts: '[config.fonts]',
    filters: '[config.filters]',
    'look-and-feel': '[config.look-and-feel]',
    margins: '[config.margins]',
    media: '[config.media]',
    paddings: '[config.paddings]',
    ratios: '[config.ratios]',
    sizes: '[config.sizes]',
    // spaces: '[config.spaces]',
    transitions: '[config.transitions]',
    typography: '[config.typography]',
    compile: {
        /**
         * @name              input
         * @namespace         config.scss.compile
         * @type              String
         * @default           [config.storage.srcDir]/scss/** /*.scss
         *
         * Specify the root folder (or file) to check for .scss|sass files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: '[config.storage.srcDir]/{css,scss}/**/*.scss',
        /**
         * @name              outputDir
         * @namespace         config.scss.compile
         * @type              String
         * @default           [config.storage.distDir]/css
         *
         * Specify the destination folder where to put the compiled files in
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outputDir: `[config.storage.distDir]/css`,
        /**
         * @name            rootDir
         * @namespace       config.scss.compile
         * @type            String
         * @default         [config.storage.srcDir]/css
         *
         * Specify the root directory from where the compiler will try to resolve modules
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: '[config.storage.srcDir]/css',
        /**
         * @name              includePaths
         * @namespace         config.scss.compile
         * @type              Array<String>
         * @default         [`[config.storage.rootDir]`, `[config.storage.rootDir]/node_modules`]
         *
         * Specify the folders you want to use as resolve imports and uses sources
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        includePaths: [
            '[config.storage.rootDir]',
            '[config.storage.rootDir]/node_modules'
        ],
        /**
         * @name              style
         * @namespace         config.scss.compile
         * @type              String
         * @default           expanded
         * @values            nested,expanded,compact,compressed
         *
         * Specify the output style that you want
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        style: 'expanded',
        /**
         * @name              map
         * @namespace         config.scss.compile
         * @type              Boolean
         * @default           true
         *
         * Specify if you want sourcemap files to be generated
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        map: true,
        /**
         * @name              prod
         * @namespace         config.scss.compile
         * @type              Boolean
         * @default           false
         *
         * Specify if you want also the <primary>production</primary> versions of the compiled files.
         * The production version are named ```[filename].prod.css```
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        prod: false,
        /**
         * @name              stripComments
         * @namespace         config.scss.compile
         * @type              Boolean
         * @default           true
         *
         * Specify if you want to stripComments the generated css or not
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        stripComments: true,
        /**
         * @name              cache
         * @namespace         config.scss.compile
         * @type              Boolean
         * @default           true
         *
         * Specify if you want to use the cache system to optimize your compilation time
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        cache: true,
        /**
         * @name              clearCache
         * @namespace         config.scss.compile
         * @type              Boolean
         * @default           false
         *
         * Specify if you want to clear the cache before processing to the compilation
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        clearCache: false,
        /**
         * @name              minify
         * @namespace         config.scss.compile
         * @type              Boolean
         * @default           false
         *
         * Specify if you want to minify the generated css or not
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        minify: false,
        /**
         * @name          watch
         * @namespace      config.scss.compile
         * @type        Boolean
         * @default     true
         *
         * Specify if you want your compiled file(s) to be watchd by default
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        watch: false,
        /**
         * @name          save
         * @namespace      config.scss.compile
         * @type        Boolean
         * @default     true
         *
         * Specify if you want your compiled file(s) to be saved by default
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        save: true,
        /**
         * @name                frontspec
         * @namespace           config.scss.compile
         * @type                Boolean
         * @default             undefined
         *
         * Specify if you want to use the frontspec features (auto import code front frontspec.json files, etc...)
         * for your scss build process.
         * If setted to undefined, the config.build.frontspec config will be used
         *
         * @since               2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        frontspec: undefined,
        /**
         * @name                sharedResources
         * @namespace           config.scss.compile
         * @type                Boolean
         * @default             ['sugar']
         *
         * This options tells the sugar scss compiler which "frameworks" or "toolkit" you want to sharedResources automatically.
         * For now you can specify these:
         * - sugar: Import the coffeekraken sugar scss toolkit in your scss
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        sharedResources: '[config.scss.sharedResources]',
        /**
         * @name              banner
         * @namespace         config.scss.compile
         * @type              String
         * @default           /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module * /
         *
         * Specify a banner (usually a comment) that you want to put on top of your generated code
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        banner: '/* Compiled using Coffeekraken Sugar SScssCompiler class which stand over the AMAZING sass module */',
        /**
         * @name          serve
         * @namespace      config.scss.compile
         * @type        Boolean
         * @default     false
         *
         * Specify if you want to start a server that serve the compiled files or not
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        serve: false,
        /**
         * @name          host
         * @namespace      config.scss.compile
         * @type        String
         * @default     ipAddress
         *
         * Specify the host you want in case of a local server
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        host: ipAddress_1.default(),
        /**
         * @name          port
         * @namespace      config.scss.compile
         * @type        Integer
         * @default     3333
         *
         * Specify the port you want in case of a local server
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        port: 3333,
        /**
         * @name                sass
         * @namespace           config.scss.compile
         * @type                Object
         * @default             {}
         *
         * Store the <primary>Sass compiler</primary>(https://www.npmjs.com/package/sass) configuration if you want to override some default ones.
         * Here's the sass compiler settings setted by the ```sugar build.scss``` process:
         * - data (...) {String}: The actual scss data to compile
         * - includePaths ([<inputFolder>, <appRoot>/node_modules]): Specify which folders you want the compiler to inspect for resolving the @imports, etc statements
         * - sourceMap (true) {Boolean}: Specify if you want a sourcemap file to be generated
         * - outFile (<outputFile>) {String}: Specify the output file path for sourcemap generation
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        sass: {}
    },
    helpers: {
        flex: {
            /**
             * @name        ordersCount
             * @namespace   config.scss.helpers.flex
             * @type        Number
             * @default     20
             *
             * Specify how many flex order ```.s-flex-order-{i}``` you want to be generated
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            ordersCount: 20
        }
    },
    /**
     * @name                sharedResources
     * @namespace           config.scss
     * @type                Boolean
     * @default             ['sugar']
     *
     * This options tells the sugar scss compiler which "frameworks" or "toolkit" you want to sharedResources automatically.
     * For now you can specify these:
     * - sugar: Import the coffeekraken sugar scss toolkit in your scss
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sharedResources: ['sugar'],
    /**
     * @name          allowSettingVar
     * @namespace     config.scss
     * @type          Boolean
     * @default       true
     *
     * Specify if you allow the use of the "setting-var" function to get
     * settings in variables string like so: "var(--something)"
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    allowSettingVar: true,
    /**
     * @name          unit
     * @namespace     config.scss
     * @type          String
     * @default       rem
     *
     * Set the base unit to use across the system
     *
     * @since         1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    unit: 'rem',
    /**
     * @name          reset
     * @namspace      config.scss
     * @type          Boolean
     * @default       true
     *
     * Specify if you want a reset to be applied or not
     *
     * @since       1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    reset: true,
    /**
     * @name            border-box
     * @namespace       config.scss
     * @type            Boolean
     * @default         true
     *
     * Set if need to set all as border box model
     *
     * @since           1.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'border-box': true
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3NzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdGQUEwRDtBQUUxRCxrQkFBZTtJQUNiLHVCQUF1QjtJQUN2QixPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsVUFBVSxFQUFFLHFCQUFxQjtJQUNqQyxNQUFNLEVBQUUsaUJBQWlCO0lBQ3pCLEtBQUssRUFBRSxnQkFBZ0I7SUFDdkIsT0FBTyxFQUFFLGtCQUFrQjtJQUMzQixlQUFlLEVBQUUsd0JBQXdCO0lBQ3pDLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixRQUFRLEVBQUUsbUJBQW1CO0lBQzdCLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2Qiw2QkFBNkI7SUFDN0IsV0FBVyxFQUFFLHNCQUFzQjtJQUNuQyxVQUFVLEVBQUUscUJBQXFCO0lBRWpDLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsS0FBSyxFQUFFLDhDQUE4QztRQUVyRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFLDhCQUE4QjtRQUV6Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLDZCQUE2QjtRQUV0Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1osMEJBQTBCO1lBQzFCLHVDQUF1QztTQUN4QztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsS0FBSyxFQUFFLFVBQVU7UUFFakI7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsRUFBRSxJQUFJO1FBRVQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUUsS0FBSztRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUVuQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLElBQUk7UUFFWDs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFLEtBQUs7UUFFakI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxLQUFLO1FBRWI7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsU0FBUyxFQUFFLFNBQVM7UUFFcEI7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsZUFBZSxFQUFFLCtCQUErQjtRQUVoRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUNKLHNHQUFzRztRQUV4Rzs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLEtBQUs7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLG1CQUFXLEVBQUU7UUFFbkI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsSUFBSSxFQUFFLEVBQUU7S0FDVDtJQUVELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQUUsRUFBRTtTQUNoQjtLQUNGO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsZUFBZSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBRTFCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsZUFBZSxFQUFFLElBQUk7SUFFckI7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksRUFBRSxLQUFLO0lBRVg7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssRUFBRSxJQUFJO0lBRVg7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksRUFBRSxJQUFJO0NBQ25CLENBQUMifQ==