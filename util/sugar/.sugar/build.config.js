const __packageRoot = require('../node/path/packageRoot');
const __isInPackage = require('../node/path/isInPackage');

function isInSugarPackage() {
  return __isInPackage('@coffeekraken/sugar');
}

module.exports = {
  scss: {
    /**
     * @name              input
     * @namespace         sugar.config.build.scss
     * @type              String
     * @default           <appRoot>/src/scss/[^_]*.scss
     *
     * Specify the root folder (or file) to check for .scss|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: isInSugarPackage()
      ? `${__packageRoot()}/tests/src/scss/[^_]*.scss`
      : `${__packageRoot()}/src/scss/[^_]*.scss`,

    /**
     * @name              output
     * @namespace         sugar.config.build.scss
     * @type              String
     * @default           <appRoot>/dist/css
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    output: isInSugarPackage()
      ? `${__packageRoot()}/tests/dist/css`
      : `${__packageRoot()}/dist/css`,

    /**
     * @name              watch
     * @namespace         sugar.config.build.scss
     * @type              String
     * @default           src/scss\/**\/*.scss
     *
     * SSet the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: isInSugarPackage()
      ? `${__packageRoot()}/tests/src/scss/**/*.scss`
      : `${__packageRoot()}/src/scss/**/*.scss`,

    /**
     * @name              style
     * @namespace         sugar.config.build.scss
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
     * @namespace         sugar.config.build.scss
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
     * @namespace         sugar.config.build.scss
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

    include: {
      /**
       * @name                sugar
       * @namespace           sugar.config.build.scss.include
       * @type                Boolean
       * @default             true
       *
       * This options tells the sugar scss compiler process if you want to include the sugar toolkit or not
       *
       * @since             2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      sugar: true
    },

    vendor: {
      /**
       * @name                sass
       * @namespace           sugar.config.build.scss.vendor
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
  }
};
