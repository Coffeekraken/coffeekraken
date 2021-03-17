// @ts-nocheck

import __deepMerge from '../../shared/object/deepMerge';
import __countLine from '../../shared/string/countLine';

/**
 * @name                                    center
 * @namespace           sugar.node.terminal
 * @type                                    Function
 * @status              beta
 *
 *
 * Allow to center one or more lines in the terminal depending on the process.env.STDOUT_PADDING environment variable
 * Settings:
 * - spaceChar (~) {String}: Which character to consider as a space that will be replaced by an actual space
 *
 * @param                 {String|Array}                  text                    The text to center or array of strings to center
 * @param                 {Object}                  [settings={}]           An object of settings
 * @return                {String}                                          The centered text
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @example             js
 * import center from '@coffeekraken/sugar/node/terminal/center';
 * center('Hello world'); // => '                 Hello world'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function center(text, settings = {}) {
  settings = __deepMerge(
    {
      spaceChar: '~'
    },
    settings
  );
  const maxWidth =
    process.stdout.columns - (process.env.STDOUT_PADDING || 0) * 2;
  let lines = Array.isArray(text) ? text : text.split('\n');
  lines = lines.map((l) => {
    const lineLenght = __countLine(l);
    return (' '.repeat(Math.round(maxWidth / 2 - lineLenght / 2)) + l)
      .split(settings.spaceChar)
      .join(' ');
  });
  return Array.isArray(text) ? lines : lines.join('\n');
}
export default center;
