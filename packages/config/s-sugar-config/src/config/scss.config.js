import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
export default {
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
         * @default           [config.storage.src.rootDir]/scss/** /*.scss
         *
         * Specify the root folder (or file) to check for .scss|sass files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: '[config.storage.src.rootDir]/{css,scss}/**/*.scss',
        /**
         * @name              outputDir
         * @namespace         config.scss.compile
         * @type              String
         * @default           [config.storage.dist.rootDir]/css
         *
         * Specify the destination folder where to put the compiled files in
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outputDir: `[config.storage.dist.rootDir]/css`,
        /**
         * @name            rootDir
         * @namespace       config.scss.compile
         * @type            String
         * @default         [config.storage.src.rootDir]/css
         *
         * Specify the root directory from where the compiler will try to resolve modules
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: '[config.storage.src.rootDir]/css',
        /**
         * @name              includePaths
         * @namespace         config.scss.compile
         * @type              Array<String>
         * @default         [`[config.storage.package.rootDir]`, `[config.storage.package.rootDir]/node_modules`]
         *
         * Specify the folders you want to use as resolve imports and uses sources
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        includePaths: [
            '[config.storage.package.rootDir]',
            '[config.storage.package.rootDir]/node_modules'
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
        host: __ipAddress(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3NzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUUzRSxlQUFlO0lBQ2IsdUJBQXVCO0lBQ3ZCLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsT0FBTyxFQUFFLGtCQUFrQjtJQUMzQixVQUFVLEVBQUUscUJBQXFCO0lBQ2pDLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLGVBQWUsRUFBRSx3QkFBd0I7SUFDekMsT0FBTyxFQUFFLGtCQUFrQjtJQUMzQixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsTUFBTSxFQUFFLGlCQUFpQjtJQUN6QixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLDZCQUE2QjtJQUM3QixXQUFXLEVBQUUsc0JBQXNCO0lBQ25DLFVBQVUsRUFBRSxxQkFBcUI7SUFFakMsT0FBTyxFQUFFO1FBQ1A7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxLQUFLLEVBQUUsbURBQW1EO1FBRTFEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTLEVBQUUsbUNBQW1DO1FBRTlDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsa0NBQWtDO1FBRTNDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUU7WUFDWixrQ0FBa0M7WUFDbEMsK0NBQStDO1NBQ2hEO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxLQUFLLEVBQUUsVUFBVTtRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsR0FBRyxFQUFFLElBQUk7UUFFVDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRSxLQUFLO1FBRVg7Ozs7Ozs7Ozs7V0FVRztRQUNILGFBQWEsRUFBRSxJQUFJO1FBRW5COzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsSUFBSTtRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFVLEVBQUUsS0FBSztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFFYjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLEtBQUs7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxTQUFTLEVBQUUsU0FBUztRQUVwQjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxlQUFlLEVBQUUsK0JBQStCO1FBRWhEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQ0osc0dBQXNHO1FBRXhHOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsS0FBSztRQUVaOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsV0FBVyxFQUFFO1FBRW5COzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUVWOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNILElBQUksRUFBRSxFQUFFO0tBQ1Q7SUFFRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLEVBQUU7U0FDaEI7S0FDRjtJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGVBQWUsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUUxQjs7Ozs7Ozs7Ozs7T0FXRztJQUNILGVBQWUsRUFBRSxJQUFJO0lBRXJCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsS0FBSztJQUVYOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLEVBQUUsSUFBSTtJQUVYOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLEVBQUUsSUFBSTtDQUNuQixDQUFDIn0=