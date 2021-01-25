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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const prepend_file_1 = __importDefault(require("prepend-file"));
const make_dir_1 = __importDefault(require("make-dir"));
const files_1 = __importDefault(require("../htmlPresets/files"));
module.exports = class SLogFilesAdapter {
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param         {Object}        [settings={}]           The settings object to configure your SLogFilesAdapter instance. Here's the settings available:
     * - path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder
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
         * - path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // extend settings
        this._settings = deepMerge_1.default({
            path: process.cwd() + '/.logs'
        }, settings);
    }
    /**
     * @name            log
     * @type            Function
     * @async
     *
     * This is the main method of the logger. It actually log the message passed as parameter to the confilesole
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
            return new Promise(({ resolve, reject }) => {
                // ensure the log directory exist
                make_dir_1.default.sync(this._settings.path);
                // prepend the new log
                const newLog = `# ${new Date().toISOString()}\n# ${files_1.default(message)}\n\n`;
                prepend_file_1.default.sync(`${this._settings.path}/${level}.log`, newLog);
                // resolving the file logging
                resolve();
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0ZpbGVzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2dGaWxlc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFFZCx1RUFBaUQ7QUFDakQsZ0VBQXlDO0FBQ3pDLHdEQUFpQztBQUNqQyxpRUFBaUQ7QUEyQmpELGlCQUFTLE1BQU0sZ0JBQWdCO0lBYTdCOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBdkJ6Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBY2Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVE7U0FDL0IsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O1lBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN6QyxpQ0FBaUM7Z0JBQ2pDLGtCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBDLHNCQUFzQjtnQkFDdEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxPQUFPLGVBQWEsQ0FDOUQsT0FBTyxDQUNSLE1BQU0sQ0FBQztnQkFDUixzQkFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVsRSw2QkFBNkI7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRixDQUFDIn0=