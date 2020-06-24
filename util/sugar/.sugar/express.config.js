const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name              port
   * @namespace         config.express
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
   * @name              hostname
   * @namespace         config.express
   * @type              String
   * @default           127.0.0.1
   *
   * Specify the hostname to use for the express server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hostname: '127.0.0.1',

  /**
   * @name              rootDir
   * @namespace         config.express
   * @type              String
   * @default           ${__packageRoot(process.cwd())}
   *
   * Specify the root directory to use for the express server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot(process.cwd())}`,

  /**
   * @name              staticDir
   * @namespace         config.express
   * @type              String
   * @default           ${__packageRoot(process.cwd())}/dist
   *
   * Specify a directory that will be served as static files
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  staticDir: `${__packageRoot(process.cwd())}/dist`,

  /**
   * @name            viewsDir
   * @namespace       config.express
   * @type            String
   * @default         views
   *
   * Specify the views directory path relative to the server root directory
   *
   * @since         2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  viewsDir: `views`,

  /**
   * @name           viewEngine
   * @namespace       config.express
   * @type           String
   * @default        bladePhp
   *
   * Specify the view engine you want to use.
   * By default it is set to "bladePhp" which need to have the "SBladePhpServer" up and running
   *
   * @see         https://github.com/expressjs/express/wiki#template-engines
   * @since         2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  viewEngine: 'bladePhp'
};
