const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
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
     * @name                imports
     * @namespace           config.build.scss
     * @type                Boolean
     * @default             ['sugar']
     *
     * This options tells the sugar scss compiler which "frameworks" or "toolkit" you want to imports automatically.
     * For now you can specify these:
     * - sugar: Import the coffeekraken sugar scss toolkit in your scss
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    imports: ['sugar'],

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
    prod: false
  },

  node: {
    /**
     * @name              input
     * @namespace         config.build.node
     * @type              String
     * @default           <appRoot>/src/js/*.js
     *
     * Specify the root folder (or file) to check for .js files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/src/node/**/!(__wip__|__tests__)/*.{js,tsx,ts}`,

    /**
     * @name              outputDir
     * @namespace         config.build.node
     * @type              String
     * @default           <appRoot>/dist/node
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `${__packageRoot()}/dist/node`,

    /**
     * @name              watch
     * @namespace         config.build.node
     * @type              String
     * @default           src/js\/**\/*.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot()}/src/node/**/*.(js|ts|tsx)`,
    /**
     * @name              map
     * @namespace         config.build.node
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
     * @namespace         config.build.node
     * @type              Boolean
     * @default           false
     *
     * Specify if you want also the <primary>production</primary> versions of the compiled files.
     * The production version are named ```[filename].prod.js```
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prod: false
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

  // doc: {
  //   /**
  //    * @name              input
  //    * @namespace         config.build.doc
  //    * @type              String
  //    * @default           <appRoot>/src/**\/*
  //    *
  //    * Specify the root folder (or file) to check for documentation build from docblocks
  //    *
  //    * @since             2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   input: isInSugarPackage()
  //     ? `${__packageRoot()}/src/**/*.*`
  //     : `${__packageRoot()}/src/**/*.*`,

  //   /**
  //    * @name              outputDir
  //    * @namespace         config.build.doc
  //    * @type              String
  //    * @default           <appRoot>/dist/doc
  //    *
  //    * Specify the destination folder where to put the compiled files in
  //    *
  //    * @since             2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   outputDir: isInSugarPackage()
  //     ? `${__packageRoot()}/public/dist/doc`
  //     : `${__packageRoot()}/dist/doc`,

  //   /**
  //    * @name              watch
  //    * @namespace         config.build.doc
  //    * @type              String
  //    * @default           src/**\/*
  //    *
  //    * Set the watch files that you want to check
  //    *
  //    * @since             2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   watch: false
  // },

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
    input: `${__packageRoot()}/src/**/*:@namespace`,

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
    output: `${__packageRoot()}/docMap.json`
  },

  // docNav: {
  //   /**
  //    * @name              input
  //    * @namespace         config.build.docNav
  //    * @type              String|Array<String>
  //    * @default           <appRoot>/**\/*
  //    *
  //    * Specify the root folder (or file) to check for docNav.json generation from docblocks
  //    *
  //    * @since             2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   input: [`${__packageRoot()}/src/**:@namespace`, '**/README.md'],

  //   /**
  //    * @name              outputDir
  //    * @namespace         config.build.docNav
  //    * @type              String
  //    * @default           <appRoot>
  //    *
  //    * Specify the destination folder where to put the compiled files in
  //    *
  //    * @since             2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   outputDir: isInSugarPackage() ? `${__packageRoot()}` : `${__packageRoot()}`,

  //   /**
  //    * @name              watch
  //    * @namespace         config.build.docNav
  //    * @type              String
  //    * @default           <appRoot>**\/*
  //    *
  //    * Set the watch files that you want to check
  //    *
  //    * @since             2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   watch: isInSugarPackage()
  //     ? `${__packageRoot()}/**/*.*`
  //     : `${__packageRoot()}/**/*.*`,

  //   /**
  //    * @name             ignoreFolders
  //    * @namespace         config.build.docNav
  //    * @type            Array<String>
  //    * @default         @config.core.ignoreFolders
  //    *
  //    * Set the folders to exclude from searches, processing, etc...
  //    *
  //    * @since         2.0.0
  //    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   ignoreFolders: '@config.core.ignoreFolders'
  // },

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
  }
};
