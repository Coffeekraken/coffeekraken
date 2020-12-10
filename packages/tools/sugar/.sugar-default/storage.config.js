const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name            localFolderPath
   * @namespace       config.storage
   * @type            String
   * @default         ${__packageRoot()}/.local
   *
   * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  localFolderPath: `${__packageRoot()}/.local`,

  /**
   * @name            cacheFolderPath
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.localFolderPath]/cache
   *
   * Configure where is located the "cache" folder
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cacheFolderPath: `[config.storage.localFolderPath]/cache`,

  /**
   * @name            tempFolderPath
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.localFolderPath]/cache
   *
   * Configure where is located the "temp" folder
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  tempFolderPath: `[config.storage.localFolderPath]/temp`
};
