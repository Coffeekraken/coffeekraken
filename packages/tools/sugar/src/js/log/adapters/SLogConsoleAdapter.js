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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../object/deepMerge", "../../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var toString_1 = __importDefault(require("../../string/toString"));
    return /** @class */ (function () {
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @param         {Object}        [settings={}]           The settings object to configure your SLogConsoleAdapter instance. Here's the settings available:
         * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SLogConsoleAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * @name          _settings
             * @type          Object
             * @private
             *
             * Store this instance settings. Here's the list of available settings
             * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            // extend settings
            this._settings = deepMerge_1.default({
                enableChildProcessLogs: true,
                logMethods: {
                    log: console.log,
                    info: console.info,
                    warn: console.warn,
                    debug: console.debug,
                    error: console.error,
                    trace: console.trace
                }
            }, settings);
        }
        /**
         * @name            log
         * @type            Function
         * @async
         *
         * This is the main method of the logger. It actually log the message passed as parameter to the console
         *
         * @param         {Mixed}          message            The message to log
         * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
         * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
         *
         * @example         js
         * await consoleAdapter.log('hello world');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLogConsoleAdapter.prototype.log = function (message, level) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // init the console method to use
                            var consoleMethod = 'log';
                            // adapting the console method to use depending on the type
                            switch (level) {
                                case 'trace':
                                    consoleMethod = 'trace';
                                    break;
                                case 'error':
                                    consoleMethod = 'error';
                                    break;
                                case 'warn':
                                    consoleMethod = 'warn';
                                    break;
                                case 'info':
                                    consoleMethod = 'info';
                                    break;
                                case 'debug':
                                    consoleMethod = 'debug';
                                    break;
                            }
                            // log the message
                            if (typeof message === 'string') {
                                ((global || window).nativeConsole || console)[consoleMethod](toString_1.default(message, {}) + '⠀');
                            }
                            else if (typeof message === 'object') {
                                ((global || window).nativeConsole || console)[consoleMethod](toString_1.default(message, {}) + '⠀');
                            }
                            else {
                                ((global || window).nativeConsole || console)[consoleMethod](toString_1.default(message, {}) + '⠀');
                            }
                            // resolve the promise
                            resolve();
                        })];
                });
            });
        };
        return SLogConsoleAdapter;
    }());
});
