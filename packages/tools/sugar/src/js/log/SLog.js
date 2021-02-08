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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SLogConsoleAdapter_1 = __importDefault(require("./adapters/SLogConsoleAdapter"));
    var env_1 = __importDefault(require("../core/env"));
    return /** @class */ (function () {
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
        function SLog(settings) {
            var _this_1 = this;
            if (settings === void 0) { settings = {}; }
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
            Object.keys(this._settings.adapters).forEach(function (adapterName) { return __awaiter(_this_1, void 0, void 0, function () {
                var cls;
                return __generator(this, function (_a) {
                    if (typeof this._settings.adapters[adapterName] === 'string') {
                        cls = require(this._settings.adapters[adapterName]);
                        this._settings.adapters[adapterName] = new cls();
                    }
                    return [2 /*return*/];
                });
            }); });
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
        SLog.prototype._overrideNativeConsole = function () {
            // check if need to override the native console methods
            var _this = this; // eslint-disable-line
            var newConsole = (function (oldCons) {
                (global || window).nativeConsole = Object.assign({}, oldCons);
                return {
                    log: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.log.apply(_this, args);
                    },
                    info: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.info.apply(_this, args);
                    },
                    warn: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.warn.apply(_this, args);
                    },
                    debug: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.debug.apply(_this, args);
                    },
                    error: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.error.apply(_this, args);
                    },
                    trace: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.trace.apply(_this, args);
                    }
                };
            })((global || window).console);
            (global || window).console = newConsole;
        };
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
        SLog.prototype._log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var adapters, level, messages, env, adaptersByEnvironment_1, adaptersLogStack;
                var _this_1 = this;
                return __generator(this, function (_a) {
                    adapters = null, level = 'log', messages = [];
                    args.forEach(function (v) {
                        if (typeof v === 'string') {
                            if (['log', 'warn', 'info', 'error', 'debug', 'trace'].indexOf(v) !== -1) {
                                level = v;
                                return;
                            }
                        }
                        messages.push(v);
                    });
                    messages = messages.filter(function (m) {
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
                        adapters = adapters.split(',').map(function (a) { return a.trim(); });
                    env = env_1.default('env') || env_1.default('node_env') || 'production';
                    if (env) {
                        adaptersByEnvironment_1 = this._settings.adaptersByEnvironment[env];
                        if (adaptersByEnvironment_1 !== null &&
                            adaptersByEnvironment_1 !== undefined) {
                            if (typeof adaptersByEnvironment_1 === 'string')
                                adaptersByEnvironment_1 = adaptersByEnvironment_1
                                    .split(',')
                                    .map(function (a) { return a.trim(); });
                            adapters = adapters.filter(function (a) {
                                return adaptersByEnvironment_1.indexOf(a) !== -1;
                            });
                        }
                    }
                    if (!Array.isArray(adapters))
                        return [2 /*return*/];
                    adaptersLogStack = [];
                    // loop on all the adapters to log the message
                    adapters.forEach(function (adapterName) {
                        // check if the adapter exists
                        if (!_this_1._settings.adapters[adapterName])
                            return;
                        // loop on all messages to log
                        messages.forEach(function (message) {
                            // make the actual log call to this adapter and add it's result to the
                            // adaptersLogStack array
                            adaptersLogStack.push(_this_1._settings.adapters[adapterName].log(message, level));
                        });
                    });
                    // return the result of all the adapters promises
                    return [2 /*return*/, Promise.all(adaptersLogStack)];
                });
            });
        };
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
        SLog.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, args)];
                });
            });
        };
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
        SLog.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['info']))];
                });
            });
        };
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
        SLog.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['warn']))];
                });
            });
        };
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
        SLog.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['debug']))];
                });
            });
        };
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
        SLog.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['error']))];
                });
            });
        };
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
        SLog.prototype.trace = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['trace']))];
                });
            });
        };
        return SLog;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUM5QyxxRkFBaUU7SUFDakUsb0RBQWdDO0lBNkJoQztRQWdCRTs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsY0FBWSxRQUFhO1lBQXpCLG1CQXFDQztZQXJDVyx5QkFBQSxFQUFBLGFBQWE7WUE3QnpCOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixxQkFBcUIsRUFBRSxLQUFLO2FBQzdCLENBQUM7WUFpQkEsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsUUFBUSxFQUFFO29CQUNSLE9BQU8sRUFBRSxJQUFJLDRCQUFvQixFQUFFO2lCQUNwQztnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsR0FBRyxFQUFFLElBQUk7b0JBQ1QsSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ3JCLElBQUksRUFBRSxJQUFJO29CQUNWLFdBQVcsRUFBRSxJQUFJO29CQUNqQixVQUFVLEVBQUUsSUFBSTtpQkFDakI7Z0JBQ0QscUJBQXFCLEVBQUUsS0FBSzthQUM3QixFQUNELFFBQVEsQ0FDVCxDQUFDO1lBRUYsNkNBQTZDO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBTyxXQUFXOzs7b0JBQzdELElBQUksT0FB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