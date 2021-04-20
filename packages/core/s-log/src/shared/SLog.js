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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "./adapters/SLogConsoleAdapter", "@coffeekraken/sugar/shared/cli/parseArgs", "@coffeekraken/sugar/shared/console/parseHtml", "@coffeekraken/sugar/shared/core/env", "@coffeekraken/s-class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const SLogConsoleAdapter_1 = __importDefault(require("./adapters/SLogConsoleAdapter"));
    const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
    const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
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
                        const argsObj = parseArgs_1.default(cli);
                        logObjArray.push(Object.assign({ value: parseHtml_1.default(log), type: 'default' }, argsObj));
                    }
                    else {
                        logObjArray.push({
                            type: 'default',
                            value: parseHtml_1.default(log)
                        });
                    }
                }
                else {
                    if (!log.type)
                        log.type = 'default';
                    if (log.value !== undefined)
                        log.value = parseHtml_1.default(log.value.toString());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEZBQXNFO0lBRXRFLHVGQUFpRTtJQUNqRSx5RkFBbUU7SUFDbkUsNkZBQXVFO0lBRXZFLDhFQUF3RDtJQUV4RCxvRUFBNkM7SUE0RTdDLE1BQXFCLElBQUssU0FBUSxpQkFBUTtRQUN4Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLFdBQVc7WUFDYixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUN0QixJQUEyQztZQUUzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JELE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztZQUU5QixtQkFBbUI7WUFDbkIsYUFBYTtZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQzNCLDJCQUEyQjtvQkFDM0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO3dCQUM3QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3pDLE1BQU0sR0FBRyxH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