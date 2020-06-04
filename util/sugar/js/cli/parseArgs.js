"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseArgsString;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _parse = _interopRequireDefault(require("../string/parse"));

var _set = _interopRequireDefault(require("../object/set"));

var _get = _interopRequireDefault(require("../object/get"));

var _delete = _interopRequireDefault(require("../object/delete"));

var _parseHtml = _interopRequireDefault(require("../console/parseHtml"));

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _deepMap = _interopRequireDefault(require("../object/deepMap"));

var _validateWithDefinitionObject = _interopRequireDefault(require("../object/validateWithDefinitionObject"));

var _completeArgsObject = _interopRequireDefault(require("./completeArgsObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                        parseArgs
 * @namespace                   sugar.js.cli
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
function parseArgsString(string, definitionObj = {}, settings = {}) {
  settings = (0, _deepMerge.default)({
    defaultObj: null
  }, settings);
  const argsObj = {}; // process the passed string

  let stringArray = string.match(/(?:[^\s("|'|`)]+|("|'|`)[^("|'|`)]*("|'|`))+/gm) || [];
  stringArray = stringArray.filter(part => {
    const currentArg = part.replace(/^[-]{1,2}/, '');

    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      const realArgName = getArgNameByAlias(currentArg, definitionObj) || currentArg;
      argsObj[realArgName] = true;
      return false;
    }

    const lastArgObjKey = Object.keys(argsObj)[Object.keys(argsObj).length - 1];
    if (lastArgObjKey) argsObj[lastArgObjKey] = (0, _parse.default)(part);
    return true;
  });
  return (0, _completeArgsObject.default)(argsObj, definitionObj); // const flattenArgsDefinition = {};
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
    if (argDefinition.alias && argDefinition.alias === alias) return argNames[i];
  }

  return null;
}

module.exports = exports.default;