import __deepMerge from '../object/deepMerge';
import __countLine from '../string/countLine';

/**
 * @name                                    center
 * @namespace           sugar.node.terminal
 * @type                                    Function
 * @test                ./__tests__/center.test.js
 *
 * Allow to center one or more lines in the terminal depending on the process.env.STDOUT_PADDING environment variable
 * Settings:
 * - spaceChar (~) {String}: Which character to consider as a space that will be replaced by an actual space
 *
 * @param                 {String|Array}                  text                    The text to center or array of strings to center
 * @param                 {Object}                  [settings={}]           An object of settings
 * @return                {String}                                          The centered text
 *
 * @example             js
 * import center from '@coffeekraken/sugar/node/terminal/center';
 * center('Hello world'); // => '                 Hello world'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function center(text, settings = {}) {
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
