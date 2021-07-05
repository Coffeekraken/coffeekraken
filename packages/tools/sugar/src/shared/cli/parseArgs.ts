// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __unquote from '../string/unquote';

/**
 * @name                        parseArgs
 * @namespace            js.cli
 * @type                        Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status            beta
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
      valueQuote: undefined
    },
    settings
  );

  string = string.trim();
  string = string.replace(/(["'`])--/gm, '$1--§ --');

  let valueQuote = settings.valueQuote;
  if (!valueQuote) {
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      if (char === '"' || char === '`' || char === "'") {
        valueQuote = char;
        break;
      }
    }
    if (!valueQuote) valueQuote = '"';
  }

  let stringArray: string[] = [];

  let isFunctionStyle = false;

  if (string.match(/^\(/) && string.match(/\)$/)) {
    isFunctionStyle = true;

    string = string.slice(1, -1);

    let currentStr = '';
    let parenthesisCount = 0;
    let quotesCount = 0;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const previousChar = string[i - 1] || string[0];

      // check if we are in quotes or not
      if (char === valueQuote && previousChar !== '\\' && !quotesCount) {
        quotesCount++;
      } else if (char === valueQuote && previousChar !== '\\' && quotesCount) {
        quotesCount--;
      }

      // check if we are in parenthesis
      if (!quotesCount && char === '(') {
        parenthesisCount++;
      } else if (!quotesCount && char === ')') {
        parenthesisCount--;
      }

      if (char === ',') {
        if (quotesCount || parenthesisCount) {
          currentStr += char;
        } else {
          stringArray.push(currentStr.trim());
          currentStr = '';
        }
      } else {
        currentStr += char;
      }
    }

    if (parenthesisCount) currentStr += ')'.repeat(parenthesisCount);

    stringArray.push(currentStr.trim());
  } else {
    let currentStr = '';
    let quotesCount = false;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const previousChar = string[i - 1] || string[0];

      // check if we are in quotes or not
      if (char === valueQuote && previousChar !== '\\' && !quotesCount) {
        quotesCount = true;
      } else if (char === valueQuote && previousChar !== '\\' && quotesCount) {
        quotesCount = false;
      }

      if (char === ' ') {
        if (quotesCount) {
          currentStr += char;
        } else {
          stringArray.push(currentStr.trim());
          currentStr = '';
        }
      } else {
        currentStr += char;
      }
    }
    stringArray.push(currentStr.trim());
  }

  stringArray = stringArray.map((item) => __unquote(item));

  const argsObj = {};
  let currentArgName = undefined;
  let currentValue;
  stringArray = stringArray.forEach((part, i) => {
    if (
      !isFunctionStyle &&
      !part.includes(' ') &&
      (part.slice(0, 2) === '--' || part.slice(0, 1) === '-')
    ) {
      if (
        currentValue === undefined &&
        currentArgName !== -1 &&
        currentArgName &&
        argsObj[currentArgName] === undefined
      ) {
        argsObj[currentArgName] = true;
      }

      currentArgName = part.replace(/^[-]{1,2}/, '');

      if (argsObj[currentArgName] === undefined) {
        argsObj[currentArgName] = true;
      }
    } else {
      let value;
      if (part && typeof part === 'string') {
        value = part
          .replace(/^\\\\\\`/, '')
          .replace(/\\\\\\`$/, '')
          .replace(/^'/, '')
          .replace(/'$/, '')
          .replace(/^"/, '')
          .replace(/"$/, '');
        if (value.match(/^\$[a-zA-Z0-9-_]+\s?:.*/)) {
          const parts = part.split(':');
          currentArgName = parts[0].trim().replace(/^\$/, '');
          value = parts.slice(1).join(':').trim();
        }
      }

      currentValue = __parse(value);
      if (typeof currentValue === 'string') {
        currentValue = currentValue.replace('--§ ', '');
      }

      if (currentArgName !== undefined) {
        if (
          argsObj[currentArgName] !== undefined &&
          argsObj[currentArgName] !== true
        ) {
          if (!Array.isArray(argsObj[currentArgName])) {
            argsObj[currentArgName] = [argsObj[currentArgName]];
          }
          argsObj[currentArgName].push(currentValue);
        } else {
          argsObj[currentArgName] = currentValue;
        }
        currentValue = undefined;
        currentArgName = undefined;
      } else {
        argsObj[i] = currentValue;
      }
    }
  });

  Object.keys(argsObj).forEach(key => {
    const value = argsObj[key];
    if (value === undefined) delete argsObj[key];
  });

  return argsObj;
}
