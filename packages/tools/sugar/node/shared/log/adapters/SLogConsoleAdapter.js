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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const toString_1 = __importDefault(require("../../string/toString"));
module.exports = class SLogConsoleAdapter {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0NvbnNvbGVBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9sb2cvYWRhcHRlcnMvU0xvZ0NvbnNvbGVBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7OztBQUVWLHVFQUFpRDtBQUdqRCxxRUFBK0M7QUE4Qi9DLGlCQUFTLE1BQU0sa0JBQWtCO0lBYS9COzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBdkJ6Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBY2Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLFVBQVUsRUFBRTtnQkFDVixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2dCQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2FBQ3JCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O1lBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JDLGlDQUFpQztnQkFDakMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUUxQiwyREFBMkQ7Z0JBQzNELFFBQVEsS0FBSyxFQUFFO29CQUNiLEtBQUssT0FBTzt3QkFDVixhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUN4QixNQUFNO29CQUNSLEtBQUssT0FBTzt3QkFDVixhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUN4QixNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxhQUFhLEdBQUcsTUFBTSxDQUFDO3dCQUN2QixNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxhQUFhLEdBQUcsTUFBTSxDQUFDO3dCQUN2QixNQUFNO29CQUNSLEtBQUssT0FBTzt3QkFDVixhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUN4QixNQUFNO2lCQUNUO2dCQUVELGtCQUFrQjtnQkFDbEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQy9CLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUMxRCxrQkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzlCLENBQUM7aUJBQ0g7cUJBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQ3RDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUMxRCxrQkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzlCLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQzFELGtCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FDOUIsQ0FBQztpQkFDSDtnQkFFRCxzQkFBc0I7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRixDQUFDIn0=