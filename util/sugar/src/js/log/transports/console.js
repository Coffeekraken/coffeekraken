/**
 * @name                                  console
 * @namespace                             sugar.js.log.transports
 * @type                                  Function
 *
 * Console log transport that simply log the message in the browser console
 *
 * @param                 {String}                      message                       The message to log
 * @param                 {String}                      [type="info"]                 The log type. Can be "error", "warn", "info", "verbose", "debug", "silly"
 * @return                {Promise}                                                   A promise that will be resolved once the log process if finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (message, type = 'info') => {
  return new Promise((resolve, reject) => {

    // init the console method to use
    let consoleMethod = 'log';

    // adapting the console method to use depending on the type
    switch(type) {
      case 'error':
        consoleMethod = 'error';
      break;
      case 'warn':
        consoleMethod = 'warn';
      break;
      case 'info':
        consoleMethod = 'info';
      break;
      case 'verbose':
      case 'debug':
      case 'silly':
        consoleMethod = 'log';
      break;
    }

    // log the message
    console[consoleMethod](message);

    // resolve the promise
    resolve();

  });
}
