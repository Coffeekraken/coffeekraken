export default {
    compile: {
        /**
         * @name              input
         * @namespace         config.js.compile
         * @type              String
         * @default           [config.js.compile.inDir]/** / *.js
         *
         * Specify the root folder (or file) to check for .js files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: '[config.js.compile.inDir]/**/*.js',
        /**
         * @name              inDir
         * @namespace         config.js.compile
         * @type              String
         * @default           [config.storage.src.rootDir]/js
         *
         * Specify the destination folder from where to search for js files to compile
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        inDir: '[config.storage.src.rootDir]/js',
        /**
         * @name              outDir
         * @namespace         config.js.compile
         * @type              String
         * @default           [config.storage.dist.rootDir]/js
         *
         * Specify the destination folder where to put the compiled files in.
         * If undefined, the files will be saved alongside the source one.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outDir: '[config.storage.dist.rootDir]/js',
        /**
         * @name            rootDir
         * @namespace       config.js.compile
         * @type            String
         * @default         [config.storage.package.rootDir]
         *
         * Specify the root directory from where the compiler will try to resolve modules
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: '[config.storage.package.rootDir]',
        /**
         * @name        format
         * @namespace     config.js.compile
         * @type          String
         * @values        iife, cjs, esm
         * @default       esm
         *
         * Specify the format you want for your js files
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        format: 'esm',
        /**
         * @name        platform
         * @namespace     config.js.compile
         * @type          String
         * @values        node, browser
         * @default       browser
         *
         * Specify the platform you want for your js files
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        platform: 'browser',
        /**
         * @name              bundle
         * @namespace         config.js.compile
         * @type              Boolean
         * @default           false
         *
         * Specify if you want bundle files into 1 final file
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        bundle: false,
        /**
         * @name              bundleSuffix
         * @namespace         config.js.compile
         * @type              Boolean
         * @default           .bundle
         *
         * Specify if you want as a file prefix when it has been bundled
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        bundleSuffix: '.bundle',
        // /**
        //  * @name          tsconfig
        //  * @namespace     config.js.compile
        //  * @type          String
        //  * @default       shared
        //  *
        //  * Specify which tsconfig file you want to use when compiling ts files.
        //  * Can be either a path to a valid tsconfig file, or a ts stack name like "node", "js" or "shared".
        //  *
        //  * @since       2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // tsconfig: 'shared',
        /**
         * @name              map
         * @namespace         config.js.compile
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
         * @namespace         config.js.compile
         * @type              Boolean
         * @default           false
         *
         * Specify if you want also the <primary>production</primary> versions of the compiled files.
         * The production version are named ```[filename].prod.js```
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        prod: false,
        /**
         * @name              minify
         * @namespace         config.js.compile
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
         * @name              banner
         * @namespace         config.js.compile
         * @type              String
         * @default           /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module * /
         *
         * Specify a banner (usually a comment) that you want to put on top of your generated code
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        banner: '/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */',
        /**
         * @name          save
         * @namespace      config.js.compile
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
         * @name          watch
         * @namespace      config.js.compile
         * @type        Boolean
         * @default     false
         *
         * Specify if you want your compiled file(s) to be watchd by default
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        watch: false,
        /**
         * @name                esbuild
         * @namespace           config.js.compile
         * @type                Object
         * @default             {}
         *
         * Settings that will be passed directly to the esbuild compiler
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        esbuild: {}
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsianMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDYixPQUFPLEVBQUU7UUFDUDs7Ozs7Ozs7Ozs7V0FXRztRQUNILEtBQUssRUFBRSxtQ0FBbUM7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxpQ0FBaUM7UUFFeEM7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxNQUFNLEVBQUUsa0NBQWtDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsa0NBQWtDO1FBRTNDOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFFYjs7Ozs7Ozs7Ozs7V0FXRztRQUNILFFBQVEsRUFBRSxTQUFTO1FBRW5COzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsS0FBSztRQUViOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsU0FBUztRQUV2QixNQUFNO1FBQ04sNkJBQTZCO1FBQzdCLHNDQUFzQztRQUN0QywyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLEtBQUs7UUFDTCwwRUFBMEU7UUFDMUUsc0dBQXNHO1FBQ3RHLEtBQUs7UUFDTCx3QkFBd0I7UUFDeEIsb0dBQW9HO1FBQ3BHLE1BQU07UUFDTixzQkFBc0I7UUFFdEI7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsRUFBRSxJQUFJO1FBRVQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUUsS0FBSztRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsS0FBSztRQUViOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQ0osdUdBQXVHO1FBRXpHOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUVWOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsS0FBSztRQUVaOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsRUFBRTtLQUNaO0NBQ0YsQ0FBQyJ9