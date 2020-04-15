import __deepMerge from '../object/deepMerge';

/**
 * @name                    SLog
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
export default class SLog {

  /**
   * @name          _settings
   * @type          Object
   * @private
   * 
   * Store this instance settings
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {
    adapters: {}
  };

  /**
   * @name          constructor
   * @type          Function
   * 
   * Constructor
   * 
   * @param         {Object}        [settings={}]           The settings object to configure your SLog instance. Here's the settings available:
   * - adapters ({}) {Object}: An object of adapters that you want to use in this SLog instance. The format is { adapterName: adapterInstance, etc... }
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // extend settings
    this._settings = __deepMerge({
      adapters: {}
    }, settings);
  }

  /**
   * @name            _log
   * @type            Function
   * @private
   * 
   * Internal log method that make the actual call to all the adapters, etc...
   * 
   * @param         {Mixed}         message         The actual message to log
   * @param         {String|Array}    [adapters=null]       The list of adapters to use
   * @param         {String}          [level='log']         The log level. Can be "log", "info", "error", "debug" or "warn"
   * @return        {Promise}                             A promise that will be resolved once all the adapters have correctly log the message
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _log(message, adapters = null, level = 'log') {

    // process the adapters argument
    if (adapters === null) adapters = Object.keys(this._settings.adapters);
    else if (typeof adapters === 'string') adapters = adapters.split(',').map(a => a.trim());

    // init the promises stack
    const adaptersLogStack = [];

    // loop on all the adapters to log the message
    adapters.forEach(adapterName => {

      // check if the adapter exists
      if (!this._settings.adapters[adapterName]) return;

      // make the actual log call to this adapter and add it's result to the
      // adaptersLogStack array
      adaptersLogStack.push(this._settings.adapters[adapterName].log(message, level));

    });

    // return the result of all the adapters promises
    return Promise.all(adaptersLogStack);

  }

  /**
   * @name            log
   * @type            Function
   * @async
   * 
   * The main log method that log a normal message
   * 
   * @param           {Mixed}           message             The message to log
   * @param           {String|Array}    [adapters=null]     The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"
   * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
   * 
   * @example         js
   * await logger.log('Something cool');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async log(message, adapters = null) {
    // call the internal _log method and return his result
    return this._log(message, adapters, 'log');
  }

  /**
   * @name            info
   * @type            Function
   * @async
   * 
   * The info method that log a message with the "info" level
   * 
   * @param           {Mixed}           message             The message to log
   * @param           {String|Array}    [adapters=null]     The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"
   * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
   * 
   * @example         js
   * await logger.info('Something cool');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async info(message, adapters = null) {
    // call the internal _log method and return his result
    return this._log(message, adapters, 'info');
  }

  /**
   * @name            warn
   * @type            Function
   * @async
   * 
   * The warn method that log a message with the "warn" level
   * 
   * @param           {Mixed}           message             The message to log
   * @param           {String|Array}    [adapters=null]     The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"
   * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
   * 
   * @example         js
   * await logger.warn('Something cool');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async warn(message, adapters = null) {
    // call the internal _log method and return his result
    return this._log(message, adapters, 'warn');
  }

  /**
   * @name            debug
   * @type            Function
   * @async
   * 
   * The debug method that log a message with the "debug" level
   * 
   * @param           {Mixed}           message             The message to log
   * @param           {String|Array}    [adapters=null]     The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"
   * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
   * 
   * @example         js
   * await logger.debug('Something cool');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async debug(message, adapters = null) {
    // call the internal _log method and return his result
    return this._log(message, adapters, 'debug');
  }

  /**
   * @name            error
   * @type            Function
   * @async
   * 
   * The error method that log a message with the "error" level
   * 
   * @param           {Mixed}           message             The message to log
   * @param           {String|Array}    [adapters=null]     The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"
   * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
   * 
   * @example         js
   * await logger.error('Something cool');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async error(message, adapters = null) {
    // call the internal _log method and return his result
    return this._log(message, adapters, 'error');
  }



}