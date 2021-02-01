module.exports = {
  compile: {
    /**
     * @name              input
     * @namespace         config.js.compile
     * @type              String
     * @default           [config.storage.srcDir]/js/** *.js
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
    banner:
      '/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */',

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
