import __deepMerge from '../object/deepMerge';
import __SLogConsoleAdapter from './adapters/SLogConsoleAdapter';
import __env from '../core/env';

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
 *    adapters: {
 *      console: new SLogConsoleAdapter()
 *    }
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
    adapters: {},
    adaptersByLevel: {},
    overrideNativeConsole: false
  };

  /**
   * @name          constructor
   * @type          Function
   * 
   * Constructor
   * 
   * @param         {Object}        [settings={}]           The settings object to configure your SLog instance. Here's the settings available:
   * - adapters ({}) {Object}: An object of adapters that you want to use in this SLog instance. The format is { adapterName: adapterInstance, etc... }
   * - overrideNativeConsole (false) {Boolean}: This will override the console.log, warn, etc... methods
   * - adaptersByLevel ({}) (Object): Specify which adapter you want to use by level. Can be an Array like ['console','mail'] or a comma separated string like "console,mail". The object format is { adapterName: adaptersList }
   * - adaptersByEnvironment ({}) {Object}: Same as the "adaptersByLevel" but for the environments like "test", "development" or "production". The environment value is taken using the "sugar.js.core.env" function using the key "ENV" or "NODE_ENV"
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // extend settings
    this._settings = __deepMerge({
      adapters: {
        console: new __SLogConsoleAdapter()
      },
      adaptersByLevel: {
        log: null,
        info: null,
        warn: null,
        debug: null,
        error: null
      },
      adaptersByEnvironment: {
        test: null,
        development: null,
        production: null
      },
      overrideNativeConsole: false
    }, settings);

    // if needed, override the native console
    if (this._settings.overrideNativeConsole) {
      this._overrideNativeConsole();
    }

  }

  /**
   * @name            _overrideNativeConsole
   * @type            Function
   * @private
   * 
   * Override the native console object to call the SLog methods instead of the normal once.
   * Store the native console inside the global/window variable called "nativeConsole"
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _overrideNativeConsole() {
    // check if need to override the native console methods
    const _this = this;
    const newConsole = (function (oldCons) {
      (global || window).nativeConsole = Object.assign({}, oldCons);
      return {
        log: function (message, adapters) { _this.log(message, adapters); },
        info: function (message, adapters) { _this.info(message, adapters); },
        warn: function (message, adapters) { _this.warn(message, adapters); },
        debug: function (message, adapters) { _this.debug(message, adapters); },
        error: function (message, adapters) { _this.error(message, adapters); },
        coco: 'please'
      }
    })((global || window).console);
    (global || window).console = newConsole;
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
    if (adapters === null) adapters = this._settings.adaptersByLevel[level];
    if (adapters === null) adapters = Object.keys(this._settings.adapters);
    else if (typeof adapters === 'string') adapters = adapters.split(',').map(a => a.trim());

    const env = __env('env') || __env('node_env') || 'production';
    if (env) {
      let adaptersByEnvironment = this._settings.adaptersByEnvironment[env];
      if (adaptersByEnvironment !== null) {
        if (typeof adaptersByEnvironment === 'string') adaptersByEnvironment = adaptersByEnvironment.split(',').map(a => a.trim());
        adapters = adapters.filter(a => {
          return adaptersByEnvironment.indexOf(a) !== -1;
        });
      }
    }

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