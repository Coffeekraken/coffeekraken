const __log = require('./log');
const __splitEveryNChars = require('../../../dist/js/string/splitEveryNChars');

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
module.exports = function logHeader(title, description=null, infos={}) {

  let descriptionArray = [];
  if (description) {
    descriptionArray = __splitEveryNChars(description, 60);
  }
  let descriptionFormated = '';
  descriptionArray.forEach((line) => {
    descriptionFormated += '# ' + line + '\n';
  });


  let message = '#######################################################################\n';
  message += '#\n';
  message += `# ${title} \n`;
  message += '#\n';
  if (descriptionFormated) {
    message += descriptionFormated;
    message += '#\n';
  }
  // loop on each infos
  Object.keys(infos).forEach((key) => {
    message += `# - ${key.charAt(0).toUpperCase() + key.slice(1)}: ${infos[key]}\n`;
  });
  if (Object.keys(infos).length > 0) {
    message += `#\n`;
  }
  message += '#######################################################################';
  message += `#\n`;

  // log the message
  __log(message, 'success');

}
