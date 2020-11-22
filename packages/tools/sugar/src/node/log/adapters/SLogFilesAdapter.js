"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __deepMerge = require('../../object/deepMerge');
const __prependFile = require('prepend-file');
const __makeDir = require('make-dir');
const __filesPreset = require('../htmlPresets/files');
/**
 * @name                    SLogFilesAdapter
 * @namespace           js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily and store them in some files where you want on your file system.
 *
 * @example               js
 * conse SLog = require('@coffeekraken/sugar/js/log/SLog');
 * const SLogFilesAdapter = require('@coffeekraken/sugar/node/log/adapters/SLogFilesAdapter');
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
        this._settings = __deepMerge({
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
            __makeDir.sync(this._settings.path);
            // prepend the new log
            const newLog = `# ${new Date().toISOString()}\n# ${__filesPreset(message)}\n\n`;
            __prependFile.sync(`${this._settings.path}/${level}.log`, newLog);
            // resolving the file logging
            resolve();
        });
    }
}
exports.default = SLogFilesAdapter;
