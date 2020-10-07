const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name                frontspec
   * @namespace           config.build
   * @type                Boolean
   * @default             false
   *
   * Specify if you want to use the frontspec features (auto import code front frontspec.json files, etc...)
   * for your build process that support it.
   * If the "frontspec" config is setted in a particular build process, it will override this one.
   *
   * @since               2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  frontspec: false,

  scss: {
    /**
     * @name              input
     * @namespace         config.build.scss
     * @type              String
     * @default           <appRoot>/src/scss/[^_]*.scss
     *
     * Specify the root folder (or file) to check for .scss|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/src/scss/[^_]*.scss`,

    /**
     * @name              outputDir
     * @namespace         config.build.scss
     * @type              String
     * @default           <appRoot>/dist/css
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `${__packageRoot()}/dist/css`,

    /**
     * @name              watch
     * @namespace         config.build.scss
     * @type              String
     * @default           src/scss\/**\/*.scss
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot()}/src/scss/**/*.scss`,

    /**
     * @name              style
     * @namespace         config.build.scss
     * @type              String
     * @default           expanded
     * @values            nested,expanded,compact,compressed
     *
     * Specify the output style that you want
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    style: 'expanded',

    /**
     * @name              map
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           true
     *
     * Specify if you want sourcemap files to be generated
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    map: true,

    /**
     * @name              prod
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           false
     *
     * Specify if you want also the <primary>production</primary> versions of the compiled files.
     * The production version are named ```[filename].prod.css```
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prod: false,

    /**
     * @name                frontspec
     * @namespace           config.build.scss
     * @type                Boolean
     * @default             undefined
     *
     * Specify if you want to use the frontspec features (auto import code front frontspec.json files, etc...)
     * for your scss build process.
     * If setted to undefined, the config.build.frontspec config will be used
     *
     * @since               2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    frontspec: undefined,

    /**
     * @name                sharedResources
     * @namespace           config.build.scss
     * @type                Boolean
     * @default             ['sugar']
     *
     * This options tells the sugar scss compiler which "frameworks" or "toolkit" you want to sharedResources automatically.
     * For now you can specify these:
     * - sugar: Import the coffeekraken sugar scss toolkit in your scss
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sharedResources: ['sugar'],

    vendors: {
      /**
       * @name                sass
       * @namespace           config.build.scss.vendors
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
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      sass: {}
    }
  },

  js: {
    /**
     * @name              input
     * @namespace         config.build.js
     * @type              String
     * @default           <appRoot>/src/js/*.js
     *
     * Specify the root folder (or file) to check for .js files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get input() {
      return `${__packageRoot()}/src/js/${
        this.pack === true ? '*' : '**/*'
      }.js`;
    },

    /**
     * @name              outputDir
     * @namespace         config.build.js
     * @type              String
     * @default           <appRoot>/dist/js
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `${__packageRoot()}/dist/js`,

    /**
     * @name              watch
     * @namespace         config.build.js
     * @type              String
     * @default           src/js\/**\/*.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot()}/src/js/**/*.js`,
    /**
     * @name              map
     * @namespace         config.build.js
     * @type              Boolean
     * @default           true
     *
     * Specify if you want sourcemap files to be generated
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    map: true,

    /**
     * @name              pack
     * @namespace         config.build.js
     * @type              Boolean
     * @default           true
     *
     * Specify if you want to pack the files together using webpack or if you just want to
     * compile the js files using babel
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    pack: true,

    /**
     * @name              prod
     * @namespace         config.build.js
     * @type              Boolean
     * @default           false
     *
     * Specify if you want also the <primary>production</primary> versions of the compiled files.
     * The production version are named ```[filename].prod.js```
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prod: false,

    /**
     * @name                frontspec
     * @namespace           config.build.scss
     * @type                Boolean
     * @default             undefined
     *
     * Specify if you want to use the frontspec features (auto import code front frontspec.json files, etc...)
     * for your js build process.
     * If setted to undefined, the config.build.frontspec config will be used
     *
     * @since               2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    frontspec: undefined
  },

  config: {
    /**
     * @name              input
     * @namespace         config.build.config
     * @type              String
     * @default           <appRoot>/src/config/*.js
     *
     * Specify the root folder (or file) to check for .config|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/src/config/*.config.js`,

    /**
     * @name              outputDir
     * @namespace         config.build.config
     * @type              String
     * @default           <appRoot>/dist/config
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `${__packageRoot()}/dist/config`,

    /**
     * @name              watch
     * @namespace         config.build.config
     * @type              String
     * @default           src/config\/**\/*.config.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot()}/src/config/**/*.config.js`
  },

  docMap: {
    /**
     * @name         input
     * @namespace     config.build.docMap
     * @type          String
     * @default       ${__packageRoot()/src/*\*\/\*}
     *
     * Specify the rootDir where to start for the docMap generation
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: [
      // `${__packageRoot()}/src/**/*:@namespace`,
      `${__packageRoot()}/README.md`
    ],

    /**
     * @name          externalDocMaps
     * @namespace     config.build.docMap
     * @type          String|Array<String>
     * @default       ['node_modules/*\/docMap.json', 'node_modules\/*\/*\/this.docMap.json']
     *
     * Specify some glob patterns where to search for some docMap.json files to integrate into our docMap
     *
     * @since         2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    externalDocMaps: [
      `${__packageRoot()}/node_modules/*/docMap.json`,
      `${__packageRoot()}/node_modules/*/*/docMap.json`
    ],

    /**
     * @name          output
     * @namespace     config.build.docMap
     * @type          String
     * @default       ${__packageRoot()}/docMap.json
     *
     * Specify where you want to save the docMap data
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    output: `${__packageRoot()}/docMap.json`,

    /**
     * @name              watch
     * @namespace         config.build.docMap
     * @type              String
     * @default           src/config\/**\/*.config.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot()}/src/**/*.{js,css}`
  },

  views: {
    /**
     * @name              input
     * @namespace         views.build.views
     * @type              String
     * @default           <appRoot>/src/views/*.*
     *
     * Specify the root folder (or file) to check for .views|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/src/views/**/*.*`,

    /**
     * @name              outputDir
     * @namespace         views.build.views
     * @type              String
     * @default           <appRoot>/dist/views
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `${__packageRoot()}/dist/views`,

    /**
     * @name              watch
     * @namespace         views.build.views
     * @type              String
     * @default           src/views\/**\/*.*
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot()}/src/views/**/*.*`
  },

  frontspecJson: {
    /**
     * @name              outputDir
     * @namespace         config.build.frontspec
     * @type              String
     * @default           <appRoot>
     *
     * Specify the destination folder where to put the frontspec.json file in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `${__packageRoot()}`,

    /**
     * @name            filename
     * @namespace       config.build.frontspec
     * @type            String
     * @default         frontspec.json
     *
     * Specify the filename that the frontspec output file must have
     *
     * @since           2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    filename: 'frontspec.json',

    /**
     * @name            dirDepth
     * @namespace       config.build.frontspec
     * @type            String
     * @default         3
     *
     * Specify the number of folders the scanning process will go down
     *
     * @since           2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dirDepth: 3,

    /**
     * @name            cache
     * @namespace       config.build.frontspec
     * @type            String
     * @default         false
     *
     * Specify if the build frontspec file process will take advantage of some cache or not
     *
     * @since           2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cache: false
  }
};
