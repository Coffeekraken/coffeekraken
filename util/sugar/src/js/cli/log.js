/**
 * @name                    log
 * @namespace               sugar.js.cli
 * @type                    Function
 *
 * This function take as parameter the log type that you want to make (log, success, error, etc...) as well as the
 * argument ou want to log and convert it to a string that you can parse using the "parseLog" function to get
 * back the original value
 *
 * @param         {Mixed}         value           The value to log
 * @param         {String}        [type="log"]    The type of log you want to make. Can be anothing but has to stay a single word
 *
 * @example       js
 * import log from '@coffeekraken/sugar/js/cli/log';
 * log('Hello world', 'error');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function log(value, type = 'log') {}
log.start = (value) => log(value, 'start');
log.success = (value) => log(value, 'success');
log.error = (value) => log(value, 'error');
log.warning = (value) => log(value, 'warning');
log.end = (value) => log(value, 'end');
log.complete = (value) => log(value, 'complete');
module.exports = log;
