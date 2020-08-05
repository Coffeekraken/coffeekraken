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

var _completeArgsObject = _interopRequireDefault(require("./completeArgsObject"));

var _unquote = _interopRequireDefault(require("../string/unquote"));

var _argumentTypeDefinitionString = _interopRequireDefault(require("../parse/argumentTypeDefinitionString"));

var _ofType = _interopRequireDefault(require("../is/ofType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @todo            update example
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
    defaultObj: {}
  }, settings);
  const argsObj = {}; // process the passed string

  let stringArray = string.match(/(?:[^\s("|'|`)]+|("|'|`)[^("|'|`)]*("|'|`))+/gm) || [];
  stringArray = stringArray.map(item => {
    return (0, _unquote.default)(item);
  });
  let currentArgName = null;
  let currentArgType = null;
  let currentArgDefinition = null;
  stringArray = stringArray.filter(part => {
    const currentArg = part.replace(/^[-]{1,2}/, '');

    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      const realArgName = getArgNameByAlias(currentArg, definitionObj) || currentArg;
      currentArgName = realArgName;
      currentArgDefinition = definitionObj[realArgName];
      currentArgType = (0, _argumentTypeDefinitionString.default)(currentArgDefinition.type);
      argsObj[realArgName] = true;
      return false;
    }

    const lastArgObjKey = Object.keys(argsObj)[Object.keys(argsObj).length - 1];

    if (!lastArgObjKey) {
      for (const key in definitionObj) {
        const obj = definitionObj[key];
        const value = (0, _parse.default)(part);

        if ((0, _ofType.default)(value, obj.type)) {
          if (obj.validator && !obj.validator(value)) {
            continue;
          }

          argsObj[key] = value;
          break;
        }
      }
    } else if (lastArgObjKey) {
      const value = (0, _parse.default)(part);

      if (currentArgType[0].type.toLowerCase() === 'array') {
        if (Array.isArray(value)) argsObj[lastArgObjKey] = value;else if (!Array.isArray(argsObj[lastArgObjKey])) argsObj[lastArgObjKey] = [];

        if (currentArgType[0].of) {
          if ((0, _ofType.default)(value, currentArgType[0].of)) {
            if (currentArgDefinition.validator && !currentArgDefinition.validator(value)) {
              return true;
            }

            argsObj[lastArgObjKey].push(value);
          }
        } else {// argsObj[lastArgObjKey].push(value);
        }
      } else {
        argsObj[lastArgObjKey] = value; // __set(argsObj, lastArgObjKey, value);
      }
    }

    return true;
  });
  const finalObj = {};

  for (let key in definitionObj) {
    const value = argsObj[key];

    if (value === undefined && settings.defaultObj[key] !== undefined) {
      // __set(finalObj, key, settings.defaultObj[key]);
      finalObj[key] = settings.defaultObj[key];
      continue;
    } // __set(finalObj, key, argsObj[key]);


    finalObj[key] = argsObj[key];
  }

  return (0, _completeArgsObject.default)(finalObj, definitionObj);
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