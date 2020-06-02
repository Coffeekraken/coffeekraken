const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  php: {
    /**
     * @name              port
     * @namespace         sugar.config.server.php
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
     * @namespace         sugar.config.server.php
     * @type              String
     * @default           localhost
     *
     * Specify the hostname to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hostname: 'localhost',

    /**
     * @name              rootDir
     * @namespace         sugar.config.server.php
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

  hapi: {
    /**
     * @name              port
     * @namespace         sugar.config.server.hapi
     * @type              Number
     * @default           3000
     *
     * Specify the port to use for the hapi server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    port: 3000,

    /**
     * @name              host
     * @namespace         sugar.config.server.hapi
     * @type              String
     * @default           localhost
     *
     * Specify the host to use for the hapi server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    host: 'localhost',

    /**
     * @name              rootDir
     * @namespace         sugar.config.server.hapi
     * @type              String
     * @default           ${__packageRoot(process.cwd())}
     *
     * Specify the root directory to use for the hapi server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `${__packageRoot(process.cwd())}`
  }
};
