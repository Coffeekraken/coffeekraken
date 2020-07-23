const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name              sugarJsonDirs
   * @namespace         config.core
   * @type              String
   * @default           []
   *
   * Set the directories where to search for sugar.json files
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sugarJsonDirs: [__packageRoot(__dirname), __packageRoot()],

  /**
   * @name             ignoreFolders
   * @namespace         config.core
   * @type            Array<String>
   * @default         ['node_modules','__tests__','__wip__','vendor','bin']
   *
   * Set the folders to exclude from searches, processing, etc...
   *
   * @since         2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  ignoreFolders: ['node_modules', '__tests__', '__wip__', 'vendor', 'bin'],

  /**
   * @name            namespace
   * @namespace       config.core
   * @type            Object
   *
   * Store the default settings for the namespace generation using the "node/package/namespace" function
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  namespace: {
    /**
     * @name            pattern
     * @namespace       config.core.namespace
     * @type            String
     * @default         {package.name}.{path}
     *
     * Specify a generation pattern to generate the namespace. Here's the available tokens:
     * - {package.name}: The package name specified in the package.json
     * - {package.version}: The package version specified in the package.json
     * - {path}: The passed path parameter
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    pattern: '{package.name}.{path}',

    /**
     * @name            context
     * @namespace       config.core.namespace
     * @type            String
     * @default         __packageRoot()
     *
     * Specify the context in which to generate the namespace.
     * The context is simply a root folder from which to search for the package.json
     * file to get the name that serve to the namespace generation
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    context: __packageRoot()
  }
};
