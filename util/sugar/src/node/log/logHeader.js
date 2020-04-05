const __log = require('./log');
const __splitEveryNChars = require('../../../js/string/splitEveryNChars');
const __getDevEnv = require('../dev/getDevEnv');

/**
 * @name                logHeader
 * @namespace           sugar.node.log
 * @type                Function
 *
 * Log a header message containing infos like passed title, passed description and passed infos {Object}.
 *
 * @param           {String}              title                 The title to display
 * @param           {String}              [description=null]    The description to display
 * @param           {Object}              [infos={}]            An object of infos to display in {key}: {value} format
 *
 * @example         js
 * const logHeader = require('@coffeekraken/sugar/node/log/logHeader');
 * logHeader('Hello World', 'Something cool to say about the application...', { version: '1.0.0' });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function logHeader(title, description = null, infos = {}) {

  const columns = process.env.STDOUT_COLUMNS || process.stdout.columns;

  const sidePadding = __getDevEnv('stdout.padding');

  let message = '<br/>';
  message += '<br/>';
  message += `${'#'.repeat(columns - sidePadding * 2)}`;
  message += '<br/>';
  message += `<red>${title}</red>`;
  message += '<br/>';
  message += '<br/> ';
  if (description) {
    message += description;
    message += '<br/>';
    message += '<br/>';
  }
  // loop on each infos
  Object.keys(infos).forEach((key) => {
    message += `<bold><cyan>${key.charAt(0).toUpperCase() + key.slice(1)}</cyan></bold>: ${infos[key]}\n`;
  });
  message += '<br/>';
  message += '<br/>';
  message += '\n';
  message += `${'#'.repeat(columns - sidePadding * 2)}`;
  message += '<br/>';

  // log the message
  __log(message);

}
