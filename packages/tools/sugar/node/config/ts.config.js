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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy90cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsS0FBSyxFQUFFLG9DQUFvQztRQUUzQzs7Ozs7Ozs7Ozs7V0FXRztRQUNILFNBQVMsRUFBRSxTQUFTO1FBRXBCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsNEJBQTRCO1FBRXJDOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILEdBQUcsRUFBRSxJQUFJO1FBRVQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUUsS0FBSztRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUUsS0FBSztRQUVwQjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFFYjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsTUFBTSxFQUNKLDBHQUEwRztRQUU1Rzs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLEtBQUs7UUFFWjs7Ozs7Ozs7Ozs7V0FXRztRQUNILE1BQU0sRUFBRSxTQUFTO1FBRWpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsU0FBUztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsZUFBZSxFQUFFO1lBQ2YsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGdDQUFnQyxFQUFFLEtBQUs7WUFDdkMsYUFBYSxFQUFFLEtBQUs7WUFDcEIscUJBQXFCLEVBQUUsS0FBSztZQUM1Qiw0QkFBNEIsRUFBRSxJQUFJO1lBQ2xDLHFCQUFxQjtZQUNyQiw4REFBOEQ7WUFDOUQsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2YsZ0JBQWdCLEVBQUUsTUFBTTtTQUN6QjtLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsUUFBUTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLFVBQVU7U0FDbkI7S0FDRjtJQUVELFlBQVk7SUFDWixlQUFlO0lBQ2YsbUNBQW1DO0lBQ25DLHFEQUFxRDtJQUNyRCxPQUFPO0lBQ1AsWUFBWTtJQUNaLHdEQUF3RDtJQUN4RCxrREFBa0Q7SUFDbEQsTUFBTTtJQUNOLElBQUk7Q0FDTCxDQUFDIn0=