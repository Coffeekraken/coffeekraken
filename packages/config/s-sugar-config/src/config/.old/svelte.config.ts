export default {
  compile: {
    /**
     * @name              input
     * @namespace         config.svelte.compile
     * @type              String
     * @default           [config.svelte.compile.inDir]/** *.svelte
     *
     * Specify the root folder (or file) to check for .scss|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: '[config.svelte.compile.inDir]/**/*.svelte',

    /**
     * @name              inDir
     * @namespace         config.svelte.compile
     * @type              String
     * @default           [config.storage.src.rootDir]/js
     *
     * Specify the destination folder from where to search for svelte files to compile
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    inDir: '[config.storage.src.rootDir]/js',

    /**
     * @name              outDir
     * @namespace         config.svelte.compile
     * @type              String
     * @default           '[config.storage.dist.rootDir]/js'
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
     * @namespace       config.svelte.compile
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
    banner:
      '/* Compiled using Coffeekraken Sugar SSvelteCompiler class which stand over the AMAZING svelte module */',

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
     * @name             tsconfig
     * @namespace       config.svelte.compile
     * @type            Object | String
     * @default         [config.ts.tsconfigStacksDir]/tsconfig.svelte.js
     *
     * Specify a tsconfig file to use for compiler options, targets, etc...
     * The settings like outDir will not be used cause the result will be put directly inside
     * the output .js file
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    tsconfig: '[config.ts.tsconfigStacksDir]/tsconfig.svelte.js',

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
