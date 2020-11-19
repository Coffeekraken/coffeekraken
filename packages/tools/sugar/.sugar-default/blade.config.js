const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  server: {
    /**
     * @name              port
     * @namespace         config.blade.server
     * @type              Number
     * @default           8888
     *
     * Specify the port to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    port: 8888,

    /**
     * @name              hostname
     * @namespace         config.blade.server
     * @type              String
     * @default           127.0.0.1
     *
     * Specify the hostname to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hostname: '127.0.0.1',

    /**
     * @name              rootDir
     * @namespace         config.blade.server
     * @type              String
     * @default           ${__packageRoot(process.cwd())}
     *
     * Specify the root directory to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `${__packageRoot(process.cwd())}`
  }
};
