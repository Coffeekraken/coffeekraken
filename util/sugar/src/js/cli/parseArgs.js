import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __set from '../object/set';
import __get from '../object/get';
import __delete from '../object/delete';
import __parseHtml from '../console/parseHtml';
import __isPlainObject from '../is/plainObject';
import __deepMap from '../object/deepMap';
import __validateWithDefinitionObject from '../object/validateWithDefinitionObject';
import __completeArgsObject from './completeArgsObject';

/**
 * @name                        parseArgs
 * @namespace           js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    definitionObj                   The arguments object description
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * @return            {Object}                                                The object of funded arguments and their values
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parseArgsString(
  string,
  definitionObj = {},
  settings = {}
) {
  settings = __deepMerge(
    {
      defaultObj: null
    },
    settings
  );

  const argsObj = {};

  // process the passed string
  let stringArray =
    string.match(/(?:[^\s("|'|`)]+|("|'|`)[^("|'|`)]*("|'|`))+/gm) || [];
  stringArray = stringArray.filter((part) => {
    const currentArg = part.replace(/^[-]{1,2}/, '');
    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      const realArgName =
        getArgNameByAlias(currentArg, definitionObj) || currentArg;
      argsObj[realArgName] = true;
      return false;
    }
    const lastArgObjKey = Object.keys(argsObj)[Object.keys(argsObj).length - 1];
    if (lastArgObjKey) argsObj[lastArgObjKey] = __parse(part);
    return true;
  });

  return __completeArgsObject(argsObj, definitionObj);

  // const flattenArgsDefinition = {};
  // __deepMap(definitionObj, (value, prop, fullPath) => {
  //   if (
  //     value &&
  //     typeof value === 'object' &&
  //     value.type !== undefined &&
  //     value.children === undefined
  //   ) {
  //     flattenArgsDefinition[fullPath.replace('.children', '')] = value;
  //   }
  //   return value;
  // });

  // // loop on all the arguments
  // Object.keys(flattenArgsDefinition).forEach((argString) => {
  //   const argDefinitionObj = flattenArgsDefinition[argString];

  //   // check if we have an argument passed in the properties
  //   if (argsObj[argString] !== undefined) {
  //     // set the argument value in the final args object
  //     __set(finalArgsObject, argString, __parse(argsObj[argString]));
  //   } else {
  //     // check if theirs a default value to set
  //     if (argDefinitionObj.default !== undefined) {
  //       __set(finalArgsObject, argString, argDefinitionObj.default);
  //     }
  //   }
  // });

  // // make sure all is ok
  // const argsValidationResult = __validateWithDefinitionObject(
  //   finalArgsObject,
  //   definitionObj
  // );
  // if (argsValidationResult !== true) throw new Error(argsValidationResult);

  // // return the argsObj
  // return finalArgsObject;
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
