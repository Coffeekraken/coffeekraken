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
        define(["require", "exports", "../../object/deepMerge", "../../string/toString", "./SLogAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    const toString_1 = __importDefault(require("../../string/toString"));
    const SLogAdapter_1 = __importDefault(require("./SLogAdapter"));
    return class SLogConsoleAdapter extends SLogAdapter_1.default {
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
        constructor(settings) {
            // extend settings
            super(deepMerge_1.default({
                logConsoleAdapter: {
                    enableChildProcessLogs: true,
                    logMethods: {
                        log: console.log,
                        info: console.info,
                        warn: console.warn,
                        debug: console.debug,
                        error: console.error,
                        trace: console.trace
                    }
                }
            }, settings !== null && settings !== void 0 ? settings : {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0NvbnNvbGVBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ0NvbnNvbGVBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsdUVBQWlEO0lBRWpELHFFQUErQztJQUUvQyxnRUFBMEM7SUF1QzFDLE9BQVMsTUFBTSxrQkFBbUIsU0FBUSxxQkFBYTtRQUNyRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxRQUEyQztZQUNyRCxrQkFBa0I7WUFDbEIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsaUJBQWlCLEVBQUU7b0JBQ2pCLHNCQUFzQixFQUFFLElBQUk7b0JBQzVCLFVBQVUsRUFBRTt3QkFDVixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7d0JBQ2hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTt3QkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO3dCQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7d0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzt3QkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO3FCQUNyQjtpQkFDRjthQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O2dCQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNyQyxpQ0FBaUM7b0JBQ2pDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFFMUIsMkRBQTJEO29CQUMzRCxRQUFRLEtBQUssRUFBRTt3QkFDYixLQUFLLE9BQU87NEJBQ1YsYUFBYSxHQUFHLE9BQU8sQ0FBQzs0QkFDeEIsTUFBTTt3QkFDUixLQUFLLE9BQU87NEJBQ1YsYUFBYSxHQUFHLE9BQU8sQ0FBQzs0QkFDeEIsTUFBTTt3QkFDUixLQUFLLE1BQU07NEJBQ1QsYUFBYSxHQUFHLE1BQU0sQ0FBQzs0QkFDdkIsTUFBTTt3QkFDUixLQUFLLE1BQU07NEJBQ1QsYUFBYSxHQUFHLE1BQU0sQ0FBQzs0QkFDdkIsTUFBTTt3QkFDUixLQUFLLE9BQU87NEJBQ1YsYUFBYSxHQUFHLE9BQU8sQ0FBQzs0QkFDeEIsTUFBTTtxQkFDVDtvQkFFRCxrQkFBa0I7b0JBQ2xCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO3dCQUMvQixDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FDckQsa0JBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUM5QixDQUFDO3FCQUNIO3lCQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO3dCQUN0QyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FDckQsa0JBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUM5QixDQUFDO3FCQUNIO3lCQUFNO3dCQUNMLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUNyRCxrQkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzlCLENBQUM7cUJBQ0g7b0JBRUQsc0JBQXNCO29CQUN0QixPQUFPLEVBQUUsQ0FBQztnQkFDWixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FBQTtLQUNGLENBQUMifQ==