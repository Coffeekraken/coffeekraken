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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const toString_1 = __importDefault(require("../../string/toString"));
/**
 * @name                    SLogConsoleAdapter
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
 *    adapters: [
 *      new SLogConsoleAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @see       https://www.npmjs.com/package/fmt-obj
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SLogConsoleAdapter {
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
     * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
     * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
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
            });
        });
    }
}
exports.default = SLogConsoleAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0NvbnNvbGVBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ0NvbnNvbGVBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7QUFFVix1RUFBaUQ7QUFHakQscUVBQStDO0FBRy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQXFCLGtCQUFrQjtJQWFyQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQXZCekI7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQWNiLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO1lBQ0Usc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixVQUFVLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dCQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzthQUNyQjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0csR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLOztZQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNyQyxpQ0FBaUM7Z0JBQ2pDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFFMUIsMkRBQTJEO2dCQUMzRCxRQUFRLEtBQUssRUFBRTtvQkFDYixLQUFLLE9BQU87d0JBQ1YsYUFBYSxHQUFHLE9BQU8sQ0FBQzt3QkFDeEIsTUFBTTtvQkFDUixLQUFLLE9BQU87d0JBQ1YsYUFBYSxHQUFHLE9BQU8sQ0FBQzt3QkFDeEIsTUFBTTtvQkFDUixLQUFLLE1BQU07d0JBQ1QsYUFBYSxHQUFHLE1BQU0sQ0FBQzt3QkFDdkIsTUFBTTtvQkFDUixLQUFLLE1BQU07d0JBQ1QsYUFBYSxHQUFHLE1BQU0sQ0FBQzt3QkFDdkIsTUFBTTtvQkFDUixLQUFLLE9BQU87d0JBQ1YsYUFBYSxHQUFHLE9BQU8sQ0FBQzt3QkFDeEIsTUFBTTtpQkFDVDtnQkFFRCxrQkFBa0I7Z0JBQ2xCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO29CQUMvQixDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FDMUQsa0JBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUM5QixDQUFDO2lCQUNIO3FCQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO29CQUN0QyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FDMUQsa0JBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUM5QixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUMxRCxrQkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzlCLENBQUM7aUJBQ0g7Z0JBRUQsc0JBQXNCO2dCQUN0QixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUFyR0QscUNBcUdDIn0=