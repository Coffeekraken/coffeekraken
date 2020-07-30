const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name            rootDir
   * @namespace       config.views
   * @type            String
   * @default          ${__packageRoot(process.cwd())}/dist/views
   *
   * Specify the root views directory
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot()}/dist/views`,

  /**
   * @name            cacheDir
   * @namespace       config.views
   * @type            String
   * @default          ${__packageRoot(process.cwd())}/dist/views/.cache
   *
   * Specify the views template rendering cache directory
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cacheDir: `${__packageRoot()}/dist/views/.cache`
};
