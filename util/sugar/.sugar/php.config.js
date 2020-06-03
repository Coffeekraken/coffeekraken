const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name              port
   * @namespace         sugar.config.php
   * @type              Number
   * @default           8080
   *
   * Specify the port to use for the PHP built-in server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  port: 8080,

  /**
   * @name              hostname
   * @namespace         sugar.config.php
   * @type              String
   * @default           localhost
   *
   * Specify the hostname to use for the PHP built-in server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hostname: '127.0.0.1',

  /**
   * @name              rootDir
   * @namespace         sugar.config.php
   * @type              String
   * @default           ${__packageRoot(process.cwd())}
   *
   * Specify the root directory to use for the PHP built-in server
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot(process.cwd())}`
};
