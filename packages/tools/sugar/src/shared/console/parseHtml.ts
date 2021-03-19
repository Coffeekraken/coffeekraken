// @ts-nocheck

import __tagsMap from './html/tagsMap';
import __isTerminal from '../is/terminal';
import __replaceTags from '../html/replaceTags';

/**
 * @name                                parseHtml
 * @namespace          sugar.js.console
 * @type                                Function
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHtml(message) {
  if (__isTerminal()) {
    const fn = require(`${__dirname}/../../node/terminal/parseHtml`).default;
    return fn(message);
  }

  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = message.map((m) => {
    return __replaceTags(m, __tagsMap);
  });

  if (isArray) return message;
  return message[0];
}
export default parseHtml;
