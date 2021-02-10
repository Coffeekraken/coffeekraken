"use strict";
// @ts-nocheck
// @shared
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SLogConsoleAdapter_1 = __importDefault(require("./adapters/SLogConsoleAdapter"));
const env_1 = __importDefault(require("../core/env"));
/**
 * @name                    SLog
 * @namespace           sugar.js.log
 * @type                    Class
 * @status              beta
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SLog {
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
        /**
         * @name          _settings
         * @type          Object
         * @private
         *
         * Store this instance settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {
            adapters: {},
            adaptersByLevel: {},
            overrideNativeConsole: false
        };
        // extend settings
        this._settings = deepMerge_1.default({
            adapters: {
                console: new SLogConsoleAdapter_1.default()
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
        }, settings);
        // ensure every adapters are a class instance
        Object.keys(this._settings.adapters).forEach((adapterName) => __awaiter(this, void 0, void 0, function* () {
            if (typeof this._settings.adapters[adapterName] === 'string') {
                const cls = require(this._settings.adapters[adapterName]);
                this._settings.adapters[adapterName] = new (cls.default || cls)();
            }
        }));
        // if needed, override the native console
        if (this._settings.overrideNativeConsole) {
            // this._overrideNativeConsole();
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
        const _this = this; // eslint-disable-line
        const newConsole = (function (oldCons) {
            (global || window).nativeConsole = Object.assign({}, oldCons);
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
     * @return        {Promise}                             A promise that will be resolved once all the adapters have correctly log the message
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
                adapters = this._settings.adaptersByLevel[level];
            if (adapters === null)
                adapters = Object.keys(this._settings.adapters);
            else if (typeof adapters === 'string')
                adapters = adapters.split(',').map((a) => a.trim());
            const env = env_1.default('env') || env_1.default('node_env') || 'production';
            if (env) {
                let adaptersByEnvironment = this._settings.adaptersByEnvironment[env];
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
                if (!this._settings.adapters[adapterName])
                    return;
                // loop on all messages to log
                messages.forEach((message) => {
                    // make the actual log call to this adapter and add it's result to the
                    // adaptersLogStack array
                    adaptersLogStack.push(this._settings.adapters[adapterName].log(message, level));
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
     * @param           {Mixed}           ...args             The message(s) to log
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
     * @param           {Mixed}           ...args             The message(s) to log
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
     * @param           {Mixed}           ...args             The message(s) to log
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
     * @param           {Mixed}           ...args             The message(s) to log
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
     * @param           {Mixed}           ...args             The message(s) to log
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
     * @param           {Mixed}           ...args             The message(s) to log
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
exports.default = SLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztBQUVWLG9FQUE4QztBQUM5Qyx1RkFBaUU7QUFDakUsc0RBQWdDO0FBR2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBcUIsSUFBSTtJQWdCdkI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUE3QnpCOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixlQUFlLEVBQUUsRUFBRTtZQUNuQixxQkFBcUIsRUFBRSxLQUFLO1NBQzdCLENBQUM7UUFpQkEsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLElBQUksNEJBQW9CLEVBQUU7YUFDcEM7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7YUFDakI7WUFDRCxxQkFBcUIsRUFBRSxLQUFLO1NBQzdCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRiw2Q0FBNkM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLFdBQVcsRUFBRSxFQUFFO1lBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFB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