// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __prependFile from 'prepend-file';
import __makeDir from 'make-dir';
import __filesPreset from '../htmlPresets/files';

/**
 * @name                    SLogFilesAdapter
 * @namespace           js.log
 * @type                    Class
 * @wip
 *
 * This class allows you to log your messages, errors, etc... easily and store them in some files where you want on your file system.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogFilesAdapter from '@coffeekraken/sugar/node/log/adapters/SLogFilesAdapter';
 * const logger = new SLog({
 *    adapters: [
 *      new SLogFilesAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SLogFilesAdapter {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings. Here's the list of available settings
   * - path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param         {Object}        [settings={}]           The settings object to configure your SLogFilesAdapter instance. Here's the settings available:
   * - path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // extend settings
    this._settings = __deepMerge(
      {
        path: process.cwd() + '/.logs'
      },
      settings
    );
  }

  /**
   * @name            log
   * @type            Function
   * @async
   *
   * This is the main method of the logger. It actually log the message passed as parameter to the confilesole
   *
   * @param         {Mixed}          message            The message to log
   * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
   * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
   *
   * @example         js
   * await consoleAdapter.log('hello world');
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async log(message, level) {
    return new Promise(({ resolve, reject }) => {
      // ensure the log directory exist
      __makeDir.sync(this._settings.path);

      // prepend the new log
      const newLog = `# ${new Date().toISOString()}\n# ${__filesPreset(
        message
      )}\n\n`;
      __prependFile.sync(`${this._settings.path}/${level}.log`, newLog);

      // resolving the file logging
      resolve();
    });
  }
};
