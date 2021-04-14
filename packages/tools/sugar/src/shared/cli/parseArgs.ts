// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __unquote from '../string/unquote';

/**
 * @name                        parseArgs
 * @namespace           sugar.js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * @return            {Object}                                                The object of funded arguments and their values
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
 *    param1: { type: 'String', alias: 'p' },
 *    world: { type: 'Array', alias: 'w', validator: value => {
 *      return Array.isArray(value);
 *    }},
 *    bool: { type: 'Boolean', alias: 'b', default: false, required: true },
 *    'hello.world': { type: 'String' },
 *    help: { type: 'String', alias: 'h' },
 *    id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
 * }, {
 *    treatDotsAsObject: true,
 *    handleOrphanOptions: true
 * });
 * {
 *    param1: 'hello',
 *    world: [10, 'yop', 'hello world'],
 *    bool: true,
 *    hello: {
 *      world: 'Nelson'
 *    },
 *    help: 'coco yep',
 *    id: '#blop'
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parseArgs(string, settings = {}) {
  settings = __deepMerge(
    {
      throw: true,
      defaultObj: {},
      cast: true,
      valueQuote: '"'
    },
    settings
  );

  // process the passed string
  let reg = /(?:[^\s"]+|"[^"]*")+/gm;
  if (settings.valueQuote === "'") reg = /(?:[^\s']+|'[^']*')+/gm;
  else if (settings.valueQuote === '`')
    reg = /(?:[^\s\\\\`]+|\\\\`[^\\\\`]*\\\\`)+/gm;
  let stringArray = string.match(reg) || [];
  stringArray = stringArray.map((item) => {
    return __unquote(item);
  });
  const argsObj = {};
  let currentArgName = undefined;
  let currentValue;
  stringArray = stringArray.forEach((part, i) => {
    const isLast = i === stringArray.length - 1;

    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      if (
        currentValue === undefined &&
        currentArgName !== -1 &&
        currentArgName
      ) {
        argsObj[currentArgName] = true;
      }
      currentArgName = part.replace(/^[-]{1,2}/, '');

      if (isLast) {
        argsObj[currentArgName] = true;
      }
    } else {
      if (part && typeof part === 'string') {
        part = part
          .replace(/^\\\\\\`/, '')
          .replace(/\\\\\\`$/, '')
          .replace(/^'/, '')
          .replace(/'$/, '')
          .replace(/^"/, '')
          .replace(/"$/, '');
      }

      currentValue = __parse(part);
      if (currentArgName !== undefined) {
        argsObj[currentArgName] = currentValue;
        currentValue = undefined;
        currentArgName = undefined;
      } else {
        argsObj[i] = currentValue;
      }
    }
  });

  return argsObj;
}
