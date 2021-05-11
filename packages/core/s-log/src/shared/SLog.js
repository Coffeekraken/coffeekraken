// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SLogConsoleAdapter from './adapters/SLogConsoleAdapter';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __env from '@coffeekraken/sugar/shared/core/env';
import __SClass from '@coffeekraken/s-class';
export default class SLog extends __SClass {
    /**
     * @name      logSettings
     * @type      ISLogSettings
     * @get
     *
     * Access the log settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get logSettings() {
        return this._settings.log;
    }
    /**
     * @name                parseAndFormatLog
     * @type                Function
     * @static
     *
     * This function take as input either a string with some arguments like "--type group --title 'hello world'", etc... or directly an object
     * with arguments as properties and format that into a valid ILog formated object
     *
     * @param       {String|String[]|Object|Object[]}          log          The log(s) to parse and format
     * @return      {ILog}                                                  An ILog complient object
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static parseAndFormatLog(logs) {
        const isArray = Array.isArray(logs);
        logs = Array.isArray(logs) === false ? [logs] : logs;
        const logObjArray = [];
        // loop on each log
        // @ts-ignore
        logs.forEach((log) => {
            if (typeof log === 'string') {
                // search for log arguments
                const matches = log.match(/\[--?[a-zA-Z0-9-_]+[^\]]+\]/gm);
                if (matches && matches.length) {
                    log = log.replace(matches[0], '').trim();
                    const cli = matches[0].slice(1, -1);
                    const argsObj = __parseArgs(cli);
                    logObjArray.push(Object.assign({ value: __parseHtml(log), type: 'default' }, argsObj));
                }
                else {
                    logObjArray.push({
                        type: 'default',
                        value: __parseHtml(log)
                    });
                }
            }
            else {
                if (!log.type)
                    log.type = 'default';
                if (log.value !== undefined)
                    log.value = __parseHtml(log.value.toString());
                logObjArray.push(log);
            }
        });
        if (isArray === true)
            return logObjArray;
        return logObjArray[0];
    }
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param         {Object}        [settings={}]           The settings object to configure your SLog instance. Here's the settings available:
     * - adapters ({}) {Object}: An object of adapters that you want to use in this SLog instance. The format is { adapterName: adapterInstance, etc... }
     * - overrideNativeConsole (false) {Boolean}: This will override the console.log, warn, etc... methods
     * - adaptersByLevel ({}) (Object): Specify which adapter you want to use by level. Can be an Array like ['console','mail'] or a comma separated string like "console,mail". The object format is { adapterName: adaptersList }
     * - adaptersByEnvironment ({}) {Object}: Same as the "adaptersByLevel" but for the environments like "test", "development" or "production". The environment value is taken using the "sugar.js.core.env" function using the key "ENV" or "NODE_ENV"
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        // extend settings
        super(__deepMerge({
            log: {
                types: __sugarConfig('log.types'),
                adapters: {
                    console: new __SLogConsoleAdapter()
                },
                adaptersByLevel: {
                    log: null,
                    info: null,
                    warn: null,
                    debug: null,
                    error: null,
                    trace: null
                },
                adaptersByEnvironment: {
                    test: null,
                    development: null,
                    production: null
                },
                overrideNativeConsole: false
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
        // ensure every adapters are a class instance
        Object.keys(this.logSettings.adapters).forEach((adapterName) => __awaiter(this, void 0, void 0, function* () {
            if (typeof this.logSettings.adapters[adapterName] === 'string') {
                const cls = require(this.logSettings.adapters[adapterName]);
                this.logSettings.adapters[adapterName] = new (cls.default || cls)();
            }
        }));
        // if needed, override the native console
        if (this.logSettings.overrideNativeConsole) {
            this._overrideNativeConsole();
        }
    }
    /**
     * @name            _overrideNativeConsole
     * @type            Function
     * @private
     *
     * Override the native console object to call the SLog methods instead of the normal once.
     * Store the native console inside the global/window variable called "_console"
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _overrideNativeConsole() {
        // check if need to override the native console methods
        const _this = this; // eslint-disable-line
        const newConsole = (function (oldCons) {
            if (process)
                global._console = Object.assign({}, oldCons);
            else
                window._console = Object.assign({}, oldCons);
            return {
                log: function (...args) {
                    _this.log(...args);
                },
                info: function (...args) {
                    _this.info(...args);
                },
                warn: function (...args) {
                    _this.warn(...args);
                },
                debug: function (...args) {
                    _this.debug(...args);
                },
                error: function (...args) {
                    _this.error(...args);
                },
                trace: function (...args) {
                    _this.trace(...args);
                }
            };
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
     * @param         {Mixed}         ...args         The actual message(s) to log or the level wanted like "log", "warn", "info", "debug" or "error"
     * @return        {Promise}                             A promise that will be resolved once all the adapters have correctly log the message
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _log(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let adapters = null, level = 'log', messages = [];
            args.forEach((v) => {
                if (typeof v === 'string') {
                    if (['log', 'warn', 'info', 'error', 'debug', 'trace'].indexOf(v) !== -1) {
                        level = v;
                        return;
                    }
                }
                messages.push(v);
            });
            messages = messages.filter((m) => {
                if (m === null || m === '')
                    return false;
                if (typeof m === 'string' && m.trim() === '')
                    return false;
                return true;
            });
            // process the adapters argument
            if (adapters === null)
                adapters = this.logSettings.adaptersByLevel[level];
            if (adapters === null)
                adapters = Object.keys(this.logSettings.adapters);
            else if (typeof adapters === 'string')
                adapters = adapters.split(',').map((a) => a.trim());
            const env = __env('env') || __env('node_env') || 'production';
            if (env) {
                let adaptersByEnvironment = this.logSettings.adaptersByEnvironment[env];
                if (adaptersByEnvironment !== null &&
                    adaptersByEnvironment !== undefined) {
                    if (typeof adaptersByEnvironment === 'string')
                        adaptersByEnvironment = adaptersByEnvironment
                            .split(',')
                            .map((a) => a.trim());
                    adapters = adapters.filter((a) => {
                        return adaptersByEnvironment.indexOf(a) !== -1;
                    });
                }
            }
            if (!Array.isArray(adapters))
                return;
            // init the promises stack
            const adaptersLogStack = [];
            // loop on all the adapters to log the message
            adapters.forEach((adapterName) => {
                // check if the adapter exists
                if (!this.logSettings.adapters[adapterName])
                    return;
                // loop on all messages to log
                messages.forEach((message) => {
                    // make the actual log call to this adapter and add it's result to the
                    // adaptersLogStack array
                    adaptersLogStack.push(this.logSettings.adapters[adapterName].log(message, level));
                });
            });
            // return the result of all the adapters promises
            return Promise.all(adaptersLogStack);
        });
    }
    /**
     * @name            log
     * @type            Function
     * @async
     *
     * The main log method that log a normal message
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.log('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // call the internal _log method and return his result
            return this._log(...args);
        });
    }
    /**
     * @name            info
     * @type            Function
     * @async
     *
     * The info method that log a message with the "info" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.info('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    info(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // call the internal _log method and return his result
            return this._log(...args, 'info');
        });
    }
    /**
     * @name            warn
     * @type            Function
     * @async
     *
     * The warn method that log a message with the "warn" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.warn('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    warn(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // call the internal _log method and return his result
            return this._log(...args, 'warn');
        });
    }
    /**
     * @name            debug
     * @type            Function
     * @async
     *
     * The debug method that log a message with the "debug" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.debug('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    debug(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // call the internal _log method and return his result
            return this._log(...args, 'debug');
        });
    }
    /**
     * @name            error
     * @type            Function
     * @async
     *
     * The error method that log a message with the "error" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.error('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // call the internal _log method and return his result
            return this._log(...args, 'error');
        });
    }
    /**
     * @name            trace
     * @type            Function
     * @async
     *
     * The trace method that log a message with the "trace" level
     *
     * @param           {Mixed}           ...args             The message(s) to log
     * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
     *
     * @example         js
     * await logger.trace('Something cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    trace(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // call the internal _log method and return his result
            return this._log(...args, 'trace');
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sb0JBQW9CLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxXQUFXLE1BQU0sMENBQTBDLENBQUM7QUFDbkUsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFFdkUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxLQUFLLE1BQU0scUNBQXFDLENBQUM7QUFFeEQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUE2RTdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSyxTQUFRLFFBQVE7SUFDeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FDdEIsSUFBMkM7UUFFM0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRCxNQUFNLFdBQVcsR0FBVSxFQUFFLENBQUM7UUFFOUIsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLDJCQUEyQjtnQkFDM0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFD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