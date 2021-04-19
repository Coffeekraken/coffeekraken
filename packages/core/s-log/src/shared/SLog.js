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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "./adapters/SLogConsoleAdapter", "@coffeekraken/sugar/shared/core/env", "@coffeekraken/s-class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const SLogConsoleAdapter_1 = __importDefault(require("./adapters/SLogConsoleAdapter"));
    const env_1 = __importDefault(require("@coffeekraken/sugar/shared/core/env"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    class SLog extends s_class_1.default {
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
            super(deepMerge_1.default({
                log: {
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
                    adapters = this.logSettings.adaptersByLevel[level];
                if (adapters === null)
                    adapters = Object.keys(this.logSettings.adapters);
                else if (typeof adapters === 'string')
                    adapters = adapters.split(',').map((a) => a.trim());
                const env = env_1.default('env') || env_1.default('node_env') || 'production';
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
    exports.default = SLog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEZBQXNFO0lBRXRFLHVGQUFpRTtJQUVqRSw4RUFBd0Q7SUFFeEQsb0VBQTZDO0lBNEU3QyxNQUFxQixJQUFLLFNBQVEsaUJBQVE7UUFDeEM7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxXQUFXO1lBQ2IsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILFlBQVksUUFBcUM7WUFDL0Msa0JBQWtCO1lBQ2xCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEdBQUcsRUFBRTtvQkFDSCxRQUFRLEVBQUU7d0JBQ1IsT0FBTyxFQUFFLElBQUksNEJBQW9CLEVBQUU7cUJBQ3BDO29CQUNELGVBQWUsRUFBRTt3QkFDZixHQUFHLEVBQUUsSUFBSTt3QkFDVCxJQUFJLEVBQUUsSUFBSTt3QkFDVixJQUFJLEVBQUUsSUFBSTt3QkFDVixLQUFLLEVBQUUsSUFBSTt3QkFDWCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRCxxQkFBcUIsRUFBRTt3QkFDckIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLFVBQVUsRUFBRSxJQUFJO3FCQUNqQjtvQkFDRCxxQkFBcUIsRUFBRSxLQUFLO2lCQUM3QjthQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztZQUVGLDZDQUE2QztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQU8sV0FBVyxFQUFFLEVBQUU7Z0JBQ25FLElBQUksT0FBTyxJQUFJLENBQUMsV0FB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