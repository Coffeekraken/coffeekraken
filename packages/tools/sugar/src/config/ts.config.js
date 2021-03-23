"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * @name               tsconfigTemplatesDir
     * @namespace         config.ts
     * @type              String
     * @default           [config.storage.sugarDir]/src/templates/tsconfig
     *
     * Specify where we can find the tsconfig templates files
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    tsconfigTemplatesDir: '[config.storage.sugarDir]/src/templates/tsconfig',
    compile: {
        /**
         * @name              input
         * @namespace         config.ts.compile
         * @type              String
         * @default           ['[config.ts.tsconfigTemplatesDir]/tsconfig.js.js','[config.ts.tsconfigTemplatesDir]/tsconfig.node.js','[config.ts.tsconfigTemplatesDir]/tsconfig.shared.js']
         *
         * Specify the root folder (or file) to check for .scss|sass files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: [
            '[config.ts.tsconfigTemplatesDir]/tsconfig.js.js',
            '[config.ts.tsconfigTemplatesDir]/tsconfig.node.js',
            '[config.ts.tsconfigTemplatesDir]/tsconfig.shared.js'
        ],
        /**
         * @name              outDir
         * @namespace         config.ts.compile
         * @type              String
         * @default           undefined
         *
         * Specify the destination folder where to put the compiled files in.
         * If undefined, the files will be saved alongside the source one.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outDir: undefined,
        /**
         * @name            rootDir
         * @namespace       config.ts.compile
         * @type            String
         * @default         process.cwd()
         *
         * Specify the root directory from where the compiler will try to resolve modules
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: process.cwd(),
        /**
         * @name              map
         * @namespace         config.ts.compile
         * @type              Boolean|String
         * @values            true, false, 'inline'
         * @default           true
         *
         * Specify if you want sourcemap files to be generated.
         * Can be also 'inline' if you want inline sourcemaps
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        map: 'inline',
        /**
         * @name              stack
         * @namespace         config.ts.compile
         * @type              Array<String>
         * @default           undefined
         *
         * Specify which stack you want to compile.
         * A stack is a single name that will target the file "tsconfig.{stack}.json"
         * at the root of your project or by using the tsconfig template files from
         * the sugar package.
         * If specified, will override the "input" parameter using the founded tsconfig files...
         * Available stacks in the sugar package are:
         * - js : Compile files for the browser
         * - node : Compile files for node runtime
         * - shared : Compile files for node and the browser
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        stack: undefined,
        /**
         * @name              config
         * @namespace         config.ts.compile
         * @type              Array<String>
         * @default           shared
         *
         * Specify which config you want to compile the passed none tsconfig... input with.
         * A config is a single name that will target the file "tsconfig.{config}.json"
         * at the root of your project or by using the tsconfig template files from
         * the sugar package.
         * If specified, the tsconfig file that match with the config will be used as
         * configuration to compile your passed input. This mean that the properties
         * like "include" and "files" from the tsconfig file will not bein used at all.
         * If you want to use these fields, check the "stack" parameter.
         * Available configs in the sugar package are:
         * - js : Compile files for the browser
         * - node : Compile files for node runtime
         * - shared : Compile files for node and the browser
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        config: 'shared',
        /**
         * @name              banner
         * @namespace         config.ts.compile
         * @type              String
         * @default           /* Compiled using Coffeekraken Sugar STsCompiler class which stand over the AMAZING typescript module * /
         * @wip
         *
         * Specify a banner (usually a comment) that you want to put on top of your generated code
         *
         * @todo      check for integration of this feature
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        banner: '/* Compiled using Coffeekraken Sugar STsCompiler class which stand over the AMAZING typescript module */',
        /**
         * @name          save
         * @namespace      config.ts.compile
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
         * @namespace      config.ts.compile
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
         * @name                compilerOptions
         * @namespace           config.ts.compile
         * @type                Object
         * @default             {}
         *
         * Settings that will be passed directly to the typescript compiler
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        compilerOptions: {}
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYjs7Ozs7Ozs7OztPQVVHO0lBQ0gsb0JBQW9CLEVBQUUsa0RBQWtEO0lBRXhFLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsaURBQWlEO1lBQ2pELG1EQUFtRDtZQUNuRCxxREFBcUQ7U0FDdEQ7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE1BQU0sRUFBRSxTQUFTO1FBRWpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUV0Qjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxHQUFHLEVBQUUsUUFBUTtRQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FrQkc7UUFDSCxLQUFLLEVBQUUsU0FBUztRQUVoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUJHO1FBQ0gsTUFBTSxFQUFFLFFBQVE7UUFFaEI7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE1BQU0sRUFDSiwwR0FBMEc7UUFFNUc7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILGVBQWUsRUFBRSxFQUFFO0tBQ3BCO0NBQ0YsQ0FBQyJ9