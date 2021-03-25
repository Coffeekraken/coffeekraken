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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "./adapters/SLogConsoleAdapter", "../core/env"], factory);
    }
})(function (require, exports) {
    "use strict";
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
         * @param         {Object}        [settings={}]           The settings object to configure your SLog instance. Here's the settings available:
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
    exports.default = SLog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0VBQThDO0lBQzlDLHVGQUFpRTtJQUNqRSxzREFBZ0M7SUFHaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxNQUFxQixJQUFJO1FBZ0J2Qjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQTdCekI7Ozs7Ozs7O2VBUUc7WUFDSCxjQUFTLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLHFCQUFxQixFQUFFLEtBQUs7YUFDN0IsQ0FBQztZQWlCQSxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxRQUFRLEVBQUU7b0JBQ1IsT0FBTyxFQUFFLElBQUksNEJBQW9CLEVBQUU7aUJBQ3BDO2dCQUNELGVBQWUsRUFBRTtvQkFDZixHQUFHLEVBQUUsSUFBSTtvQkFDVCxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsSUFBSTtpQkFDWjtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDckIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjtnQkFDRCxxQkFBcUIsRUFBRSxLQUFLO2FBQzdCLEVBQ0QsUUFBUSxDQUNULENBQUM7WUFFRiw2Q0FBNkM7WUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLFdBQVcsRUFBRSxFQUFFO2dCQUNqRSxJQUFJLE9BQU8sSUFBSSxDQUFDLFNB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R0FBRyxJQUFJOztnQkFDaEIsc0RBQXNEO2dCQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxJQUFJLENBQUMsR0FBRyxJQUFJOztnQkFDaEIsc0RBQXNEO2dCQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxLQUFLLENBQUMsR0FBRyxJQUFJOztnQkFDakIsc0RBQXNEO2dCQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxLQUFLLENBQUMsR0FBRyxJQUFJOztnQkFDakIsc0RBQXNEO2dCQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxLQUFLLENBQUMsR0FBRyxJQUFJOztnQkFDakIsc0RBQXNEO2dCQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUFBO0tBQ0Y7SUFwVEQsdUJBb1RDIn0=