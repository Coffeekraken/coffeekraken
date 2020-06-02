const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  server: {
    /**
     * @name              port
     * @namespace         sugar.config.blade.server
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
     * @namespace         sugar.config.blade.server
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
     * @namespace         sugar.config.blade.server
     * @type              String
     * @default           ${__packageRoot(process.cwd())}
     *
     * Specify the root directory where to search for the views files
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `${__packageRoot(process.cwd())}`
  }
};
