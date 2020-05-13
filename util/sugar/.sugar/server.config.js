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
     * @default           [appRoot]/public
     *
     * Specify the root directory to use for the PHP built-in server
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: '[appRoot]/public'
  }
};
