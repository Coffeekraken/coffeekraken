"use strict";
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
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const SLogAdapter_1 = __importDefault(require("./SLogAdapter"));
module.exports = class SLogConsoleAdapter extends SLogAdapter_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0NvbnNvbGVBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLWxvZy9zcmMvc2hhcmVkL2FkYXB0ZXJzL1NMb2dDb25zb2xlQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLDRGQUFzRTtBQUV0RSwwRkFBb0U7QUFFcEUsZ0VBQTBDO0FBdUMxQyxpQkFBUyxNQUFNLGtCQUFtQixTQUFRLHFCQUFhO0lBQ3JEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLFFBQTJDO1FBQ3JELGtCQUFrQjtRQUNsQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLGlCQUFpQixFQUFFO2dCQUNqQixzQkFBc0IsRUFBRSxJQUFJO2dCQUM1QixVQUFVLEVBQUU7b0JBQ1YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO29CQUNoQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztpQkFDckI7YUFDRjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O1lBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JDLGlDQUFpQztnQkFDakMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUUxQiwyREFBMkQ7Z0JBQzNELFFBQVEsS0FBSyxFQUFFO29CQUNiLEtBQUssT0FBTzt3QkFDVixhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUN4QixNQUFNO29CQUNSLEtBQUssT0FBTzt3QkFDVixhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUN4QixNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxhQUFhLEdBQUcsTUFBTSxDQUFDO3dCQUN2QixNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxhQUFhLEdBQUcsTUFBTSxDQUFDO3dCQUN2QixNQUFNO29CQUNSLEtBQUssT0FBTzt3QkFDVixhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUN4QixNQUFNO2lCQUNUO2dCQUVELGtCQUFrQjtnQkFDbEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQy9CLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUNyRCxrQkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzlCLENBQUM7aUJBQ0g7cUJBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQ3RDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUNyRCxrQkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzlCLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQ3JELGtCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FDOUIsQ0FBQztpQkFDSDtnQkFFRCxzQkFBc0I7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRixDQUFDIn0=