import __deepMerge from '../../object/deepMerge';
import __consoleHtmlPreset from '../htmlPresets/console';
import __isChildProcess from '../../is/childProcess';
import __toString from '../../string/toString';

/**
 * @name                    SLogConsoleAdapter
 * @namespace               sugar.js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogConsoleAdapter from '@coffeekraken/sugar/js/log/adapters/SLogConsoleAdapter';
 * const logger = new SLog({
 *    adapters: [
 *      new SLogConsoleAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SLogConsoleAdapter {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings. Here's the list of available settings
   * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
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
   * @param         {Object}        [settings={}]           The settings object to configure your SLogConsoleAdapter instance. Here's the settings available:
   * - enableChildProcessLogs (true) {Boolean}: Specify if you want that the logs are formatted specialy for when used in a child process
   * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // extend settings
    this._settings = __deepMerge(
      {
        enableChildProcessLogs: true,
        logMethods: {
          log: console.log,
          info: console.info,
          warn: console.warn,
          debug: console.debug,
          error: console.error
        }
      },
      settings
    );
  }

  /**
   * @name            log
   * @type            Function
   * @async
   *
   * This is the main method of the logger. It actually log the message passed as parameter to the console
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
    return new Promise((resolve, reject) => {
      // init the console method to use
      let consoleMethod = 'log';

      // adapting the console method to use depending on the type
      switch (level) {
        case 'error':
          consoleMethod = 'error';
          break;
        case 'warn':
          consoleMethod = 'warn';
          break;
        case 'info':
          consoleMethod = 'info';
          break;
        case 'debug':
          consoleMethod = 'debug';
          break;
      }

      let formatedMessage = message;

      // if (this._settings.enableChildProcessLogs && __isChildProcess()) {
      formatedMessage = `${level}:${__toString(message)}`;
      // }

      // log the message
      ((global || window).nativeConsole || console)[consoleMethod](
        __consoleHtmlPreset(formatedMessage)
      );

      // resolve the promise
      resolve();
    });
  }
}
