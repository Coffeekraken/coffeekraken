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
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SLogConsoleAdapter_1 = __importDefault(require("./adapters/SLogConsoleAdapter"));
const env_1 = __importDefault(require("../core/env"));
module.exports = class SLog {
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
                this._settings.adapters[adapterName] = new cls();
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7O0FBRVYsb0VBQThDO0FBQzlDLHVGQUFpRTtBQUNqRSxzREFBZ0M7QUE2QmhDLGlCQUFTLE1BQU0sSUFBSTtJQWdCakI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUE3QnpCOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixlQUFlLEVBQUUsRUFBRTtZQUNuQixxQkFBcUIsRUFBRSxLQUFLO1NBQzdCLENBQUM7UUFpQkEsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLElBQUksNEJBQW9CLEVBQUU7YUFDcEM7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7YUFDakI7WUFDRCxxQkFBcUIsRUFBRSxLQUFLO1NBQzdCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRiw2Q0FBNkM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLFdBQVcsRUFBRSxFQUFFO1lBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLEVB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