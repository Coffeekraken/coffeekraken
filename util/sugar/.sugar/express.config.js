const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name              port
   * @namespace         sugar.config.server.express
   * @type              Number
   * @default           3000
   *
   * Specify the port to use for the express server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  port: 3000,

  /**
   * @name              host
   * @namespace         sugar.config.server.express
   * @type              String
   * @default           localhost
   *
   * Specify the host to use for the express server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  host: 'localhost',

  /**
   * @name              rootDir
   * @namespace         sugar.config.server.express
   * @type              String
   * @default           ${__packageRoot(process.cwd())}
   *
   * Specify the root directory to use for the express server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot(process.cwd())}`,

  views: `${__packageRoot(process.cwd())}/views`,

  viewEngine: 'jade'
};
