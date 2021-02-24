"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipAddress_1 = __importDefault(require("../node/network/ipAddress"));
exports.default = {
    compile: {
        /**
         * @name              input
         * @namespace         config.js.compile
         * @type              String
         * @default           [config.storage.srcDir]/js/** / *.js
         *
         * Specify the root folder (or file) to check for .js files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: '[config.storage.srcDir]/js/**/*.js',
        /**
         * @name              outputDir
         * @namespace         config.js.compile
         * @type              String
         * @default           [config.storage.distDir]/js
         *
         * Specify the destination folder where to put the compiled files in.
         * If undefined, the files will be saved alongside the source one.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outputDir: '[config.storage.distDir]/js',
        /**
         * @name            rootDir
         * @namespace       config.js.compile
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
         * @name              stripComments
         * @namespace         config.js.compile
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
         * @name          serve
         * @namespace      config.js.compile
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
         * @namespace      config.js.compile
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
         * @namespace      config.js.compile
         * @type        Integer
         * @default     8888
         *
         * Specify the port you want in case of a local server
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        port: 8888,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsianMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQW9EO0FBRXBELGtCQUFlO0lBQ2IsT0FBTyxFQUFFO1FBQ1A7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxLQUFLLEVBQUUsb0NBQW9DO1FBRTNDOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsU0FBUyxFQUFFLDZCQUE2QjtRQUV4Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLDRCQUE0QjtRQUVyQzs7Ozs7Ozs7Ozs7V0FXRztRQUNILE1BQU0sRUFBRSxLQUFLO1FBRWI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxLQUFLO1FBRWI7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsRUFBRSxJQUFJO1FBRVQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUUsS0FBSztRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUVuQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFFYjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUNKLHVHQUF1RztRQUV6Rzs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLEtBQUs7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLEtBQUs7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLG1CQUFXLEVBQUU7UUFFbkI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxFQUFFO0tBQ1o7Q0FDRixDQUFDIn0=