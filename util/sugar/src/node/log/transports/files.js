const __prependFile = require('prepend-file');
const __makeDir = require('make-dir');
const __filesPreset = require('../htmlPresets/files');

/**
 * @name                                    files
 * @namespace                               sugar.node.log.transports
 * @type                                    Function
 *
 * Save the logs into separated files like error.log, warn.log, etc...
 *
 * The settings available for this transport are:
 *
 * - ```logsPath```: (default: process.cwd + '/.logs') The path where you want to store your log files
 *
 * @param                   {String}                  message                     The message to log
 * @param                   {String}                  [type="info"]               The type of log. Can be 'error','warn','info','verbose','debug' or 'silly'
 * @param                   {Object}                  [settings={}]               The transport settings object
 * @return                  {Promise}                                             A promise that will be resolved once the log process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (message, type = 'info', settings = {}) => {
  return new Promise((resolve, reject) => {

    settings = {
      logsPath: process.cwd() + '/.logs',
      ...settings
    };

    // ensure the log directory exist
    __makeDir.sync(settings.logsPath);

    // prepend the new log
    const newLog = `# ${new Date().toISOString()}\n# ${__filesPreset(message)}\n\n`;
    __prependFile.sync(`${settings.logsPath}/${type}.log`, newLog);

    // resolving the file logging
    resolve();

  });
}
