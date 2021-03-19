// @ts-nocheck

import __ofType from '../is/ofType';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __unquote from '../string/unquote';
import __completeArgsObject from './completeArgsObject';

/**
 * @name                        parseArgs
 * @namespace           sugar.js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    definition                   The arguments object description
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * @return            {Object}                                                The object of funded arguments and their values
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
function parseArgsString(string, settings = {}) {
  settings = __deepMerge(
    {
      throw: true,
      definition: null,
      complete: true,
      defaultObj: {}
    },
    settings
  );

  const argsObj = {};
  const definition = settings.definition;

  // process the passed string
  let stringArray = string.match(/(?:[^\s"]+|"[^"]*")+/gm) || [];
  stringArray = stringArray.map((item) => {
    return __unquote(item);
  });

  if (!definition) {
    const argsObj = {};
    let currentArgName = -1;
    let currentValue;
    stringArray = stringArray.forEach((part) => {
      if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
        if (
          currentValue === undefined &&
          currentArgName !== -1 &&
          currentArgName
        ) {
          argsObj[currentArgName] = true;
        }
        currentArgName = part.replace(/^[-]{1,2}/, '');
      } else {
        currentValue = __parse(part);
        if (currentArgName !== undefined) {
          argsObj[currentArgName] = __parse(currentValue);
          currentValue = undefined;
          currentArgName = undefined;
        }
      }
    });

    return argsObj;
  }

  let currentArgName = null;
  const rawArgsMap = {
    __orphan: []
  };

  stringArray = stringArray.forEach((part) => {
    const currentArg = part.replace(/^[-]{1,2}/, '');

    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      const realArgName =
        getArgNameByAlias(currentArg, definition) || currentArg;
      currentArgName = realArgName;

      if (rawArgsMap[currentArgName] === undefined) {
        rawArgsMap[currentArgName] = true;
      }

      if (settings.throw && !definition[realArgName]) {
        throw new Error(
          `You try to pass an argument "<yellow>${realArgName}</yellow>" that is not supported. Here's the supported arguments:\n${Object.keys(
            definition
          )
            .map((argName) => {
              const argDefinition = definition[argName];
              let string = `<cyan>>${argName}</cyan>: --${argName}`;
              if (argDefinition.alias) string += ` (-${argDefinition.alias})`;
              if (argDefinition.description)
                string += `: ${argDefinition.description}`;
              return string;
            })
            .join('\n')}`
        );
      }
      // go to the next argument/value
      return;
    }

    // check if we have a current argument name
    if (currentArgName === null) currentArgName = '__orphan';

    // cast the value
    const value = __parse(part);

    // save the value into the raw args stack
    if (currentArgName === '__orphan') {
      rawArgsMap.__orphan.push(value);
    } else {
      if (
        rawArgsMap[currentArgName] !== undefined &&
        rawArgsMap[currentArgName] !== true
      ) {
        if (!Array.isArray(rawArgsMap[currentArgName]))
          rawArgsMap[currentArgName] = [rawArgsMap[currentArgName]];
        rawArgsMap[currentArgName].push(value);
      } else {
        rawArgsMap[currentArgName] = value;
      }
    }
  });

  let finalArgsMap = Object.assign({}, rawArgsMap);
  delete finalArgsMap.__orphan;

  // take care of orphan values
  if (settings.definition) {
    rawArgsMap.__orphan.forEach((value) => {
      for (let i = 0; i < Object.keys(settings.definition).length; i++) {
        const argName = Object.keys(settings.definition)[i];
        const definitionObj = settings.definition[argName];
        if (finalArgsMap[argName] !== undefined) continue;
        if (__ofType(value, definitionObj.type) === true) {
          finalArgsMap[argName] = value;
          break;
        }
      }
    });
  }

  if (settings.complete === true) {
    finalArgsMap = __completeArgsObject(finalArgsMap, settings);
  }

  return finalArgsMap;
}

function getArgNameByAlias(alias, definition) {
  const argNames = Object.keys(definition);
  for (let i = 0; i < argNames.length; i++) {
    const argDefinition = definition[argNames[i]];
    if (argDefinition.alias && argDefinition.alias === alias)
      return argNames[i];
  }
  return null;
}
export default parseArgsString;
