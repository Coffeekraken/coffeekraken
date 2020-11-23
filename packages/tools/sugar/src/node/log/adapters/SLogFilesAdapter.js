"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const prepend_file_1 = __importDefault(require("prepend-file"));
const make_dir_1 = __importDefault(require("make-dir"));
const files_1 = __importDefault(require("../htmlPresets/files"));
/**
 * @name                    SLogFilesAdapter
 * @namespace           js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily and store them in some files where you want on your file system.
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogFilesAdapter from '@coffeekraken/sugar/node/log/adapters/SLogFilesAdapter';
 * const logger = new SLog({
 *    adapters: [
 *      new SLogFilesAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SLogFilesAdapter {
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
    async log(message, level) {
        return new Promise((resolve, reject) => {
            // ensure the log directory exist
            make_dir_1.default.sync(this._settings.path);
            // prepend the new log
            const newLog = `# ${new Date().toISOString()}\n# ${files_1.default(message)}\n\n`;
            prepend_file_1.default.sync(`${this._settings.path}/${level}.log`, newLog);
            // resolving the file logging
            resolve();
        });
    }
}
exports.default = SLogFilesAdapter;
