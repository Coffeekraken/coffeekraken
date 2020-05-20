import __parse from '../string/parse';
import __toString from '../string/toString';

/**
 * @name                    parseLog
 * @namespace               sugar.js.cli
 * @type                    Function
 *
 * This function take a log message logged with the "log" function of this same folder
 * and return you back an object with these two properties:
 * - level: The log level like "info", "error", "warn", etc...
 * - value: The logged value
 *
 * @param         {String}        log         The log to parse
 * @return        {Object}                    An object with a "level" and "value" properties
 *
 * @example       js
 * import parseLog from '@coffeekraken/sugar/js/cli/parseLog';
 * parseLog('error: Something cool');
 * // {
 * //   level: 'error',
 * //   value: 'Something cool'
 * // }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parseLog(log) {
  const splits = log.split(/^([a-zA-Z0-9]+):/).filter((l) => l !== '');
  if (splits.length === 2) {
    return {
      level: splits[0].toLowerCase().trim(),
      value: __parse(splits[1].trim())
    };
  } else if (splits.length === 1) {
    return {
      level: 'log',
      value: __parse(splits[0].trim())
    };
  } else {
    return false;
  }
}
