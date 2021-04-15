"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    compile: {
        /**
         * @name              input
         * @namespace         config.css.compile
         * @type              String
         * @default           [config.css.compile.inDir]/** / *.css
         *
         * Specify the root folder (or file) to check for .css files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: '[config.css.compile.inDir]/**/*.css',
        /**
         * @name              inDir
         * @namespace         config.css.compile
         * @type              String
         * @default           [config.storage.srcDir]/css
         *
         * Specify the destination folder from where to search for css files to compile
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        inDir: '[config.storage.srcDir]/css',
        /**
         * @name              outDir
         * @namespace         config.css.compile
         * @type              String
         * @default           [config.storage.distDir]/css
         *
         * Specify the destination folder where to put the compiled files in.
         * If undefined, the files will be saved alongside the source one.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outDir: '[config.storage.distDir]/css',
        /**
         * @name            rootDir
         * @namespace       config.css.compile
         * @type            String
         * @default         [config.storage.rootDir]
         *
         * Specify the root directory from where the compiler will try to resolve modules
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: '[config.storage.rootDir]',
        /**
         * @name              bundle
         * @namespace         config.css.compile
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
         * @namespace         config.css.compile
         * @type              Boolean
         * @default           .bundle
         *
         * Specify if you want as a file prefix when it has been bundled
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        bundleSuffix: '.bundle',
        /**
         * @name              map
         * @namespace         config.css.compile
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
         * @namespace         config.css.compile
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
         * @name              minify
         * @namespace         config.css.compile
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
         * @namespace         config.css.compile
         * @type              String
         * @default           /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module * /
         *
         * Specify a banner (usually a comment) that you want to put on top of your generated code
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        banner: '/* Compiled using Coffeekraken Sugar SPostcssCompiler class which stand over the AMAZING PostCSS module */',
        /**
         * @name          save
         * @namespace      config.css.compile
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
         * @namespace      config.css.compile
         * @type        Boolean
         * @default     false
         *
         * Specify if you want your source file(s) to be watchd by default
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        watch: false,
        /**
         * @name                postcss
         * @namespace           config.css.compile
         * @type                Object
         * @default             {}
         *
         * Settings that will be passed directly to the postcss compiler
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        postcss: {},
        plugins: {
            postcssImportExtGlob: {
                import: 'postcss-import-ext-glob',
                settings: {}
            },
            postcssImport: {
                import: 'postcss-import',
                settings: {}
            },
            // stylelint: {
            //   import: 'stylelint',
            //   settings: {
            //     extends: 'stylelint-config-standard'
            //   }
            // },
            sugar: {
                import: '@coffeekraken/s-postcss-sugar-plugin',
                settings: {}
            },
            precss: {
                import: 'precss',
                settings: {}
            },
            presetEnv: {
                import: 'postcss-preset-env',
                settings: {}
            },
            autoprefixer: {
                import: 'autoprefixer',
                settings: {}
            },
            postcssReporter: {
                import: 'postcss-reporter',
                settings: {
                    clearReportedMessages: true
                }
            },
            cssnano: {
                import: 'cssnano',
                settings: {
                    preset: 'default'
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNzcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsS0FBSyxFQUFFLHFDQUFxQztRQUU1Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLDZCQUE2QjtRQUVwQzs7Ozs7Ozs7Ozs7V0FXRztRQUNILE1BQU0sRUFBRSw4QkFBOEI7UUFFdEM7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSwwQkFBMEI7UUFFbkM7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxLQUFLO1FBRWI7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxTQUFTO1FBRXZCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxHQUFHLEVBQUUsSUFBSTtRQUVUOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFLEtBQUs7UUFFWDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFFYjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUNKLDRHQUE0RztRQUU5Rzs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLEtBQUs7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLEVBQUU7UUFFWCxPQUFPLEVBQUU7WUFDUCxvQkFBb0IsRUFBRTtnQkFDcEIsTUFBTSxFQUFFLHlCQUF5QjtnQkFDakMsUUFBUSxFQUFFLEVBQUU7YUFDYjtZQUNELGFBQWEsRUFBRTtnQkFDYixNQUFNLEVBQUUsZ0JBQWdCO2dCQUN4QixRQUFRLEVBQUUsRUFBRTthQUNiO1lBQ0QsZUFBZTtZQUNmLHlCQUF5QjtZQUN6QixnQkFBZ0I7WUFDaEIsMkNBQTJDO1lBQzNDLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxzQ0FBc0M7Z0JBQzlDLFFBQVEsRUFBRSxFQUFFO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLG9CQUFvQjtnQkFDNUIsUUFBUSxFQUFFLEVBQUU7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDWixNQUFNLEVBQUUsY0FBYztnQkFDdEIsUUFBUSxFQUFFLEVBQUU7YUFDYjtZQUNELGVBQWUsRUFBRTtnQkFDZixNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixRQUFRLEVBQUU7b0JBQ1IscUJBQXFCLEVBQUUsSUFBSTtpQkFDNUI7YUFDRjtZQUNELE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsU0FBUztnQkFDakIsUUFBUSxFQUFFO29CQUNSLE1BQU0sRUFBRSxTQUFTO2lCQUNsQjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==