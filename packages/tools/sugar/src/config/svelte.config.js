"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    compile: {
        /**
         * @name              input
         * @namespace         config.svelte.compile
         * @type              String
         * @default           [config.storage.srcDir]/js/** *.svelte
         *
         * Specify the root folder (or file) to check for .scss|sass files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: '[config.storage.srcDir]/js/**/*.svelte',
        /**
         * @name              outputDir
         * @namespace         config.svelte.compile
         * @type              String
         * @default           undefined
         *
         * Specify the destination folder where to put the compiled files in.
         * If undefined, the files will be saved alongside the source one.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outputDir: undefined,
        /**
         * @name            rootDir
         * @namespace       config.svelte.compile
         * @type            String
         * @default         [config.storage.srcDir]/js
         *
         * Specify the root directory from where the compiler will try to resolve modules
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: '[config.storage.srcDir]/js',
        /**
         * @name              map
         * @namespace         config.svelte.compile
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
         * @namespace         config.svelte.compile
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
         * @namespace         config.svelte.compile
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
         * @name              minify
         * @namespace         config.svelte.compile
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
         * @namespace         config.svelte.compile
         * @type              String
         * @default           /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module * /
         *
         * Specify a banner (usually a comment) that you want to put on top of your generated code
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        banner: '/* Compiled using Coffeekraken Sugar SSvelteCompiler class which stand over the AMAZING svelte module */',
        /**
         * @name          save
         * @namespace      config.svelte.compile
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
         * @namespace      config.svelte.compile
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
         * @name                svelte
         * @namespace           config.svelte.compile
         * @type                Object
         * @default             {}
         *
         * Settings that will be passed directly to the svelte compiler
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        svelte: {}
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN2ZWx0ZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsS0FBSyxFQUFFLHdDQUF3QztRQUUvQzs7Ozs7Ozs7Ozs7V0FXRztRQUNILFNBQVMsRUFBRSxTQUFTO1FBRXBCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsNEJBQTRCO1FBRXJDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxHQUFHLEVBQUUsSUFBSTtRQUVUOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFLEtBQUs7UUFFWDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFLElBQUk7UUFFbkI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxLQUFLO1FBRWI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFDSiwwR0FBMEc7UUFFNUc7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxFQUFFO0tBQ1g7Q0FDRixDQUFDIn0=