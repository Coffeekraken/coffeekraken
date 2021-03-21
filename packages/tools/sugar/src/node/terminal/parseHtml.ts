// @ts-nocheck

import __replaceTags from '../../shared/html/replaceTags';
import __sugarConfig from '../../shared/config/sugar';
import __upperFirst from '../../shared/string/upperFirst';
import __chalk from 'chalk';
import __tagsMap from '../../shared/console/html/tagsMap';
__chalk.level = 3;

// TODO tests

/**
 * @name                                parseHtml
 * @namespace           sugar.node.terminal
 * @type                                Function
 * @status              wip
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function parseHtml(message) {
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  const tagsMap = Object.assign({}, __tagsMap);

  const sugarColors = Object.keys(__sugarConfig('colors')).filter(
    (c) => c !== 'terminal'
  );
  const terminalColors = Object.keys(__sugarConfig('terminal.colors'));
  const colorsObj = {};
  sugarColors.forEach((name) => {
    colorsObj[name] = __sugarConfig(`colors.${name}`);
  });
  terminalColors.forEach((name) => {
    colorsObj[name] = __sugarConfig(`terminal.colors.${name}`);
  });

  message = message.map((m) => {
    Object.keys(colorsObj).forEach((c) => {
      const cValue = colorsObj[c];
      tagsMap[c] = (tag, content) => __chalk.hex(cValue)(content);
      tagsMap[`bg${__upperFirst(c)}`] = (tag, content) =>
        __chalk.bgHex(cValue)(content);
    });

    return __replaceTags(m, tagsMap);
  });

  if (isArray) return message;
  return message[0];
}
export default parseHtml;
