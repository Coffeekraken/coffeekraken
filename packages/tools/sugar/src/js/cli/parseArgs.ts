// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __set from '../object/set';
import __get from '../object/get';
import __delete from '../object/delete';
import __parseHtml from '../console/parseHtml';
import __isPlainObject from '../is/plainObject';
import __deepMap from '../object/deepMap';
import __completeArgsObject from './completeArgsObject';
import __unquote from '../string/unquote';
import __parseTypeDefinitionString from '../validation/utils/parseTypeDefinitionString';
import __ofType from '../is/ofType';

/**
 * @name                        parseArgs
 * @namespace           sugar.js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    definitionObj                   The arguments object description
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
      definitionObj: null,
      defaultObj: {}
    },
    settings
  );

  const argsObj = {};
  const definitionObj = settings.definitionObj;

  // process the passed string
  let stringArray = string.match(/(?:[^\s"]+|"[^"]*")+/gm) || [];
  stringArray = stringArray.map((item) => {
    return __unquote(item);
  });

  if (!definitionObj) {
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
  let currentArgType = null;
  let currentArgDefinition = null;

  stringArray = stringArray.filter((part) => {
    const currentArg = part.replace(/^[-]{1,2}/, '');
    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      const realArgName =
        getArgNameByAlias(currentArg, definitionObj) || currentArg;
      currentArgName = realArgName;

      if (!definitionObj[realArgName]) {
        throw new Error(
          `You try to pass an argument "<yellow>${realArgName}</yellow>" that is not supported. Here's the supported arguments:\n${Object.keys(
            definitionObj
          )
            .map((argName) => {
              const argDefinition = definitionObj[argName];
              let string = `<cyan>>${argName}</cyan>: --${argName}`;
              if (argDefinition.alias) string += ` (-${argDefinition.alias})`;
              if (argDefinition.description)
                string += `: ${argDefinition.description}`;
              return string;
            })
            .join('\n')}`
        );
      }

      currentArgDefinition = definitionObj[realArgName];

      currentArgType = __parseTypeDefinitionString(currentArgDefinition.type);

      argsObj[realArgName] = true;

      return false;
    }

    const lastArgObjKey = Object.keys(argsObj)[Object.keys(argsObj).length - 1];

    if (!lastArgObjKey) {
      for (const key in definitionObj) {
        const obj = definitionObj[key];

        const value = __parse(part);

        if (__ofType(value, obj.type)) {
          if (obj.validator && !obj.validator(value)) {
            continue;
          }
          argsObj[key] = value;
          break;
        }
      }
    } else if (lastArgObjKey) {
      const value = __parse(part);

      if (currentArgType[0].type.toLowerCase() === 'array') {
        if (Array.isArray(value)) argsObj[lastArgObjKey] = value;
        else if (!Array.isArray(argsObj[lastArgObjKey]))
          argsObj[lastArgObjKey] = [];
        if (currentArgType[0].of) {
          if (__ofType(value, currentArgType[0].of)) {
            if (
              currentArgDefinition.validator &&
              !currentArgDefinition.validator(value)
            ) {
              return true;
            }
            if (argsObj[lastArgObjKey] === value) {
            } else argsObj[lastArgObjKey].push(value);
          }
        } else {
          // argsObj[lastArgObjKey].push(value);
        }
      } else {
        argsObj[lastArgObjKey] = value;
        // __set(argsObj, lastArgObjKey, value);
      }
    }
    return true;
  });

  const finalObj = {};
  for (const key in definitionObj) {
    const value = argsObj[key];
    if (value === undefined && settings.defaultObj[key] !== undefined) {
      finalObj[key] = settings.defaultObj[key];
      continue;
    } else if (argsObj[key] !== undefined) {
      finalObj[key] = argsObj[key];
    }
  }

  return __completeArgsObject(finalObj, settings);
}

function getArgNameByAlias(alias, definitionObj) {
  const argNames = Object.keys(definitionObj);
  for (let i = 0; i < argNames.length; i++) {
    const argDefinition = definitionObj[argNames[i]];
    if (argDefinition.alias && argDefinition.alias === alias)
      return argNames[i];
  }
  return null;
}
export = parseArgsString;