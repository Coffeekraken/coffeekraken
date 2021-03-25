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
        define(["require", "exports", "../../object/deepMerge", "../../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    const toString_1 = __importDefault(require("../../string/toString"));
    return class SLogConsoleAdapter {
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @param         {Object}        [settings={}]           The settings object to configure your SLogConsoleAdapter instance. Here's the settings available:
         * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
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
         * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
         * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
         *
         * @example         js
         * await consoleAdapter.log('hello world');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        log(message, level) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    // init the console method to use
                    let consoleMethod = 'log';
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
                        ((global || window)._console || console)[consoleMethod](toString_1.default(message, {}) + '⠀');
                    }
                    else if (typeof message === 'object') {
                        ((global || window)._console || console)[consoleMethod](toString_1.default(message, {}) + '⠀');
                    }
                    else {
                        ((global || window)._console || console)[consoleMethod](toString_1.default(message, {}) + '⠀');
                    }
                    // resolve the promise
                    resolve();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0NvbnNvbGVBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ0NvbnNvbGVBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsdUVBQWlEO0lBR2pELHFFQUErQztJQThCL0MsT0FBUyxNQUFNLGtCQUFrQjtRQWEvQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQXZCekI7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQWNiLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO2dCQUNFLHNCQUFzQixFQUFFLElBQUk7Z0JBQzVCLFVBQVUsRUFBRTtvQkFDVixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7b0JBQ2hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lCQUNyQjthQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0csR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLOztnQkFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDckMsaUNBQWlDO29CQUNqQyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBRTFCLDJEQUEyRDtvQkFDM0QsUUFBUSxLQUFLLEVBQUU7d0JBQ2IsS0FBSyxPQUFPOzRCQUNWLGFBQWEsR0FBRyxPQUFPLENBQUM7NEJBQ3hCLE1BQU07d0JBQ1IsS0FBSyxPQUFPOzRCQUNWLGFBQWEsR0FBRyxPQUFPLENBQUM7NEJBQ3hCLE1BQU07d0JBQ1IsS0FBSyxNQUFNOzRCQUNULGFBQWEsR0FBRyxNQUFNLENBQUM7NEJBQ3ZCLE1BQU07d0JBQ1IsS0FBSyxNQUFNOzRCQUNULGFBQWEsR0FBRyxNQUFNLENBQUM7NEJBQ3ZCLE1BQU07d0JBQ1IsS0FBSyxPQUFPOzRCQUNWLGFBQWEsR0FBRyxPQUFPLENBQUM7NEJBQ3hCLE1BQU07cUJBQ1Q7b0JBRUQsa0JBQWtCO29CQUNsQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTt3QkFDL0IsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQ3JELGtCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FDOUIsQ0FBQztxQkFDSDt5QkFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTt3QkFDdEMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQ3JELGtCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FDOUIsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FDckQsa0JBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUM5QixDQUFDO3FCQUNIO29CQUVELHNCQUFzQjtvQkFDdEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1NBQUE7S0FDRixDQUFDIn0=