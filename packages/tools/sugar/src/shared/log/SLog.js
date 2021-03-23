"use strict";
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
            (global || window)._console = Object.assign({}, oldCons);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQThDO0FBQzlDLHVGQUFpRTtBQUNqRSxzREFBZ0M7QUFHaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFxQixJQUFJO0lBZ0J2Qjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQTdCekI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUc7WUFDVixRQUFRLEVBQUUsRUFBRTtZQUNaLGVBQWUsRUFBRSxFQUFFO1lBQ25CLHFCQUFxQixFQUFFLEtBQUs7U0FDN0IsQ0FBQztRQWlCQSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLFFBQVEsRUFBRTtnQkFDUixPQUFPLEVBQUUsSUFBSSw0QkFBb0IsRUFBRTthQUNwQztZQUNELGVBQWUsRUFBRTtnQkFDZixHQUFHLEVBQUUsSUFBSTtnQkFDVCxJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixVQUFVLEVBQUUsSUFBSTthQUNqQjtZQUNELHFCQUFxQixFQUFFLEtBQUs7U0FDN0IsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLDZDQUE2QztRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQU8sV0FBVyxFQUFFLEVBQUU7WUFDakUsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdB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