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

var _parseTypeDefinitionString = _interopRequireDefault(require("../validation/utils/parseTypeDefinitionString"));

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
function parseArgsString(string, definitionObj, settings) {
  if (definitionObj === void 0) {
    definitionObj = {};
  }

  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    defaultObj: {}
  }, settings);
  var argsObj = {}; // process the passed string

  var stringArray = string.match(/(?:[^\s"|'|`]+|("|'|`)[^"|'|`]*("|'|`))+/gm) || [];
  stringArray = stringArray.map(item => {
    return (0, _unquote.default)(item);
  });
  var currentArgName = null;
  var currentArgType = null;
  var currentArgDefinition = null;
  stringArray = stringArray.filter(part => {
    var currentArg = part.replace(/^[-]{1,2}/, '');

    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      var realArgName = getArgNameByAlias(currentArg, definitionObj) || currentArg;
      currentArgName = realArgName;

      if (!definitionObj[realArgName]) {
        throw new Error("You try to pass an argument \"<yellow>".concat(realArgName, "</yellow>\" that is not supported. Here's the supported arguments:\n").concat(Object.keys(definitionObj).map(argName => {
          var argDefinition = definitionObj[argName];
          var string = "<cyan>>".concat(argName, "</cyan>: --").concat(argName);
          if (argDefinition.alias) string += " (-".concat(argDefinition.alias, ")");
          if (argDefinition.description) string += ": ".concat(argDefinition.description);
          return string;
        }).join('\n')));
      }

      currentArgDefinition = definitionObj[realArgName];
      currentArgType = (0, _parseTypeDefinitionString.default)(currentArgDefinition.type);
      argsObj[realArgName] = true;
      return false;
    }

    var lastArgObjKey = Object.keys(argsObj)[Object.keys(argsObj).length - 1];

    if (!lastArgObjKey) {
      for (var key in definitionObj) {
        var obj = definitionObj[key];
        var value = (0, _parse.default)(part);

        if ((0, _ofType.default)(value, obj.type)) {
          if (obj.validator && !obj.validator(value)) {
            continue;
          }

          argsObj[key] = value;
          break;
        }
      }
    } else if (lastArgObjKey) {
      var _value = (0, _parse.default)(part);

      if (currentArgType[0].type.toLowerCase() === 'array') {
        if (Array.isArray(_value)) argsObj[lastArgObjKey] = _value;else if (!Array.isArray(argsObj[lastArgObjKey])) argsObj[lastArgObjKey] = [];

        if (currentArgType[0].of) {
          if ((0, _ofType.default)(_value, currentArgType[0].of)) {
            if (currentArgDefinition.validator && !currentArgDefinition.validator(_value)) {
              return true;
            }

            argsObj[lastArgObjKey].push(_value);
          }
        } else {// argsObj[lastArgObjKey].push(value);
        }
      } else {
        argsObj[lastArgObjKey] = _value; // __set(argsObj, lastArgObjKey, value);
      }
    }

    return true;
  });
  var finalObj = {};

  for (var key in definitionObj) {
    var value = argsObj[key];

    if (value === undefined && settings.defaultObj[key] !== undefined) {
      // __set(finalObj, key, settings.defaultObj[key]);
      finalObj[key] = settings.defaultObj[key];
      continue;
    } // __set(finalObj, key, argsObj[key]);


    finalObj[key] = argsObj[key];
  }

  return (0, _completeArgsObject.default)(finalObj, definitionObj, settings);
}

function getArgNameByAlias(alias, definitionObj) {
  var argNames = Object.keys(definitionObj);

  for (var i = 0; i < argNames.length; i++) {
    var argDefinition = definitionObj[argNames[i]];
    if (argDefinition.alias && argDefinition.alias === alias) return argNames[i];
  }

  return null;
}

module.exports = exports.default;