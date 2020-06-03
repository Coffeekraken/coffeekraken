const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  server: {
    /**
     * @name              port
     * @namespace         sugar.config.blade.server
     * @type              Number
     * @default           8888
     *
     * Specify the port to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    port: 8888,

    /**
     * @name              hostname
     * @namespace         sugar.config.blade.server
     * @type              String
     * @default           127.0.0.1
     *
     * Specify the hostname to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hostname: '127.0.0.1',

    /**
     * @name              rootDir
     * @namespace         sugar.config.blade.server
     * @type              String
     * @default           ${__packageRoot(process.cwd())}
     *
     * Specify the root directory to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `${__packageRoot(process.cwd())}`
  },

  /**
   * @name            viewsDir
   * @namespace       sugar.config.blade
   * @type            String
   * @default          ${__packageRoot(process.cwd())}/views
   *
   * Specify the root views directory relative to the server root directory
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  viewsDir: `views`,

  /**
   * @name            cacheDir
   * @namespace       sugar.config.blade
   * @type            String
   * @default          ${__packageRoot(process.cwd())}/views/.cache
   *
   * Specify the views template rendering cache directory relative to the server root directory
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cacheDir: `views/.cache`
};
