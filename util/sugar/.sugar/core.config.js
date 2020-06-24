module.exports = {
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
    pattern: '{package.name}.{path}'
  }
};
