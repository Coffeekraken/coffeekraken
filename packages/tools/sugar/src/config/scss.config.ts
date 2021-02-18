import __ipAddress from '../node/network/ipAddress';

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
     * @default           [config.storage.srcDir]/scss/[^_]*.scss
     *
     * Specify the root folder (or file) to check for .scss|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: '[config.storage.srcDir]/{css,scss}/[^_]*.scss',

    /**
     * @name              outputDir
     * @namespace         config.scss.compile
     * @type              String
     * @default           [config.storage.distDir]/css
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.storage.distDir]/css`,

    /**
     * @name            rootDir
     * @namespace       config.scss.compile
     * @type            String
     * @default         [config.storage.srcDir]/css
     *
     * Specify the root directory from where the compiler will try to resolve modules
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: '[config.storage.srcDir]/css',

    /**
     * @name              includePaths
     * @namespace         config.scss.compile
     * @type              Array<String>
     * @default         [`[config.storage.rootDir]`, `[config.storage.rootDir]/node_modules`]
     *
     * Specify the folders you want to use as resolve imports and uses sources
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    includePaths: [
      '[config.storage.rootDir]',
      '[config.storage.rootDir]/node_modules'
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
    banner:
      '/* Compiled using Coffeekraken Sugar SScssCompiler class which stand over the AMAZING sass module */',

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
   * @name          settingsMode
   * @namespace     config.scss
   * @type          String
   * @values        inline, variables
   * @default       variables
   *
   * Set the settings mode to use.
   * - inline: The values will be put directly in the css
   * - variables: The values will be passed using the var(...) css function
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  settingsMode: 'variables',

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
