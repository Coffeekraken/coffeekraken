"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    compile: {
        /**
         * @name              input
         * @namespace         config.ts.compile
         * @type              String
         * @default           [config.storage.srcDir]/js/** *.ts
         *
         * Specify the root folder (or file) to check for .scss|sass files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: `[config.storage.srcDir]/js/**/*.ts`,
        /**
         * @name              outputDir
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
        outputDir: undefined,
        /**
         * @name            rootDir
         * @namespace       config.ts.compile
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
        map: true,
        /**
         * @name              prod
         * @namespace         config.ts.compile
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
         * @namespace         config.ts.compile
         * @type              Boolean
         * @default           true
         *
         * Specify if you want to stripComments the generated css or not
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        stripComments: false,
        /**
         * @name              minify
         * @namespace         config.ts.compile
         * @type              Boolean
         * @default           false
         * @wip
         *
         * Specify if you want to minify the generated css or not
         *
         * @todo        check for integration of this feature
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        minify: false,
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
         * @name          target
         * @namespace     config.ts.compile
         * @type          String
         * @default       browser
         *
         * Specify which target you want to apply. By default, the browser target is applied.
         * Targets are defines under ```config.ts.targets``` and are just some "compilerOptions" presets
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        target: 'browser',
        /**
         * @name          stacks
         * @namespace     config.ts.compile
         * @type          Array<String>
         * @default       undefined
         *
         * Specify which stacks (defined at the root of this config file) you want to compile
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        stacks: undefined,
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
        compilerOptions: {
            allowJs: false,
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: false,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: true,
            // incremental: true,
            // tsBuildInfoFile: '[config.storage.tmpDir]/ts/.tsbuildinfo',
            types: ['node'],
            moduleResolution: 'node'
        }
    },
    targets: {
        browser: {
            target: 'es6',
            module: 'ESNext'
        },
        node: {
            target: 'es6',
            module: 'commonjs'
        }
    }
    // stacks: {
    //   browser: {
    //     include: ['src/js/**/*.ts'],
    //     compilerOptions: '[config.ts.targets.browser]'
    //   },
    //   node: {
    //     include: ['src/cli/**/*.ts', 'src/node/**/*.ts'],
    //     compilerOptions: '[config.ts.targets.node]'
    //   }
    // }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUDs7Ozs7Ozs7Ozs7V0FXRztRQUNILEtBQUssRUFBRSxvQ0FBb0M7UUFFM0M7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxTQUFTLEVBQUUsU0FBUztRQUVwQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLDRCQUE0QjtRQUVyQzs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxHQUFHLEVBQUUsSUFBSTtRQUVUOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFLEtBQUs7UUFFWDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFLEtBQUs7UUFFcEI7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE1BQU0sRUFBRSxLQUFLO1FBRWI7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE1BQU0sRUFDSiwwR0FBMEc7UUFFNUc7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVo7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxNQUFNLEVBQUUsU0FBUztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLFNBQVM7UUFFakI7Ozs7Ozs7Ozs7V0FVRztRQUNILGVBQWUsRUFBRTtZQUNmLE9BQU8sRUFBRSxLQUFLO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixlQUFlLEVBQUUsSUFBSTtZQUNyQixZQUFZLEVBQUUsSUFBSTtZQUNsQixnQ0FBZ0MsRUFBRSxLQUFLO1lBQ3ZDLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLHFCQUFxQixFQUFFLEtBQUs7WUFDNUIsNEJBQTRCLEVBQUUsSUFBSTtZQUNsQyxxQkFBcUI7WUFDckIsOERBQThEO1lBQzlELEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNmLGdCQUFnQixFQUFFLE1BQU07U0FDekI7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLFFBQVE7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxVQUFVO1NBQ25CO0tBQ0Y7SUFFRCxZQUFZO0lBQ1osZUFBZTtJQUNmLG1DQUFtQztJQUNuQyxxREFBcUQ7SUFDckQsT0FBTztJQUNQLFlBQVk7SUFDWix3REFBd0Q7SUFDeEQsa0RBQWtEO0lBQ2xELE1BQU07SUFDTixJQUFJO0NBQ0wsQ0FBQyJ9