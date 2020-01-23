const chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3;

/**
 * @name                                    console
 * @namespace                               sugar.node.log.transports
 * @type                                    Function
 *
 * Print out your logs in the console
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

    // prepend the new log
    let logMessage = message;
    switch(type) {
      case 'error':
        logMessage = chalk.red(logMessage);
      break;
      case 'warn':
        logMessage = chalk.magenta(logMessage);
      break;
      case 'info':
        logMessage = chalk.yellow(logMessage);
      break;
      case 'verbose':
      case 'debug':
      case 'silly':
        logMessage = chalk.blue(logMessage);
      break;
      case 'success':
        logMessage = chalk.green(logMessage);
      break;
    }

    console.log(logMessage);

    resolve();

  });
}
