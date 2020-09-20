const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name            fs
   * @namespace       config.cache
   * @type            Object
   *
   * Define the filesystem cache settings
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  fs: {
    /**
     * @name            rootDir
     * @namespace       config.cache.fs
     * @type            String
     *
     * Specify the directory where to store the cached files
     *
     * @since           2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `${__packageRoot()}/.cache`
  }
};
