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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                        parseArgs
 * @namespace                   sugar.js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    argsDefinitions                   The arguments object description
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * - treatDotsAsObject (true) {Boolean}: Specify if you want the options with dot(s) in the name to be treated as object in the returned object
 * - handleOrphanOptions (true) {Boolean}: Specify if you want the options values without clear argument name given to be handled or not
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
function parseArgsString(string, argsDefinitions = {}, settings = {}) {
  settings = (0, _deepMerge.default)({
    treatDotsAsObject: true,
    handleOrphanOptions: true
  }, settings); // process the passed string

  let stringArray = string.match(/(?:[^\s("|')]+|("|')[^("|')]*("|'))+/gm) || [];
  let currentArg = null;
  const argsObj = {};
  stringArray = stringArray.filter(part => {
    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      currentArg = part.replace(/^[-]{1,2}/, '');
      if (currentArg.length === 1) currentArg = getArgNameByAlias(currentArg, argsDefinitions);

      if (settings.treatDotsAsObject) {
        (0, _set.default)(argsObj, currentArg, true);
      } else {
        argsObj[currentArg] = true;
      }

      return false;
    }

    if (currentArg) {
      const argDefinition = argsDefinitions[currentArg]; // check that the current argument actually exists in the argsDefinitions object

      if (!argDefinition) return false; // take care of array argument

      if (argDefinition.type && processArgType(argDefinition.type) === 'array') {
        if (settings.treatDotsAsObject) {
          if (!Array.isArray((0, _get.default)(argsObj, currentArg))) (0, _set.default)(argsObj, currentArg, []);

          if (Array.isArray(part)) {
            (0, _get.default)(argsObj, currentArg).push(parse(...part));
          } else {
            (0, _get.default)(argsObj, currentArg).push(parse(part));
          }
        } else {
          if (!Array.isArray(argsObj[currentArg])) argsObj[currentArg] = [];

          if (Array.isArray(part)) {
            argsObj[currentArg].push(...parse(part));
          } else {
            argsObj[currentArg].push(parse(part));
          }
        }

        return false;
      } // take care of all argument types


      if (settings.treatDotsAsObject) {
        (0, _set.default)(argsObj, currentArg, parse(part));
      } else {
        argsObj[currentArg] = parse(part);
      }

      currentArg = null;
      return false;
    }

    return true;
  }); // get the list of arguments that does not have value for now

  let argsWithoutValues = Object.keys(argsDefinitions).filter(argName => {
    if (settings.treatDotsAsObject) {
      return (0, _get.default)(argsObj, argName) === undefined;
    } else {
      return argsObj[argName] === undefined;
    }
  });

  if (settings.handleOrphanOptions) {
    // loop on these "unknown" values and try to get the argument that correspond to it
    stringArray = stringArray.filter(value => {
      let hasFoundAnArgument = false; // loop on the args without values

      argsWithoutValues = argsWithoutValues.filter(argName => {
        // check that the argument does not have any value
        if (settings.treatDotsAsObject) {
          if ((0, _get.default)(argsObj, argName)) return false;
        } else {
          if (argsObj[argName]) return false;
        } // check if the value correspond to the argument


        if (!hasFoundAnArgument && isValueCorrespondToArgDefinition(value, argsDefinitions[argName])) {
          // set the value in the argsObj
          if (settings.treatDotsAsObject) {
            (0, _set.default)(argsObj, argName, value);
          } else {
            argsObj[argName] = value;
          } // tell that this value has found an argument


          hasFoundAnArgument = true; // tell that this argument is now fullfiled with a value

          return false;
        } // the argument does not have any value


        return true;
      }); // filter the stringArray

      return !hasFoundAnArgument;
    });
  } // init the error list


  const errors = []; // make sure all the arguments correspond to their definition

  Object.keys(argsDefinitions).forEach(argName => {
    let value;

    if (settings.treatDotsAsObject) {
      value = (0, _get.default)(argsObj, argName);
    } else {
      value = argsObj[argName];
    } // check argument without value but with a default property in the definition


    if (value === undefined && argsDefinitions[argName].default !== undefined) {
      if (settings.treatDotsAsObject) {
        (0, _set.default)(argsObj, argName, argsDefinitions[argName].default);
      } else {
        argsObj[argName] = argsDefinitions[argName].default;
      }

      value = argsDefinitions[argName].default;
    } // check argument that does not have any value and that are required


    if (value === undefined && argsDefinitions[argName].required === true) {
      errors.push(`The argument "<red>${argName}</red>" is required but you don't pass any value...`);
      return;
    } // check that the argument correspond to his definition


    if (!isValueCorrespondToArgDefinition(value, argsDefinitions[argName])) {
      if (settings.treatDotsAsObject) {
        (0, _delete.default)(argsObj, argName);
      } else {
        delete argsObj[argName];
      }
    }
  }); // return errors if their is

  if (errors.length) {
    return new Error((0, _parseHtml.default)(errors.join('\n')));
  } // return the argsObj


  return argsObj;
}

function processArgType(type) {
  return type.toLowerCase();
}

function getArgNameByAlias(alias, argsDefinitions) {
  const argsNames = Object.keys(argsDefinitions);

  for (let i = 0; i < argsNames.length; i++) {
    const argumentObj = argsDefinitions[argsNames[i]];

    if (alias === argumentObj.alias) {
      return argsNames[i];
    }
  }
}

function parse(value) {
  if (value === 'root') return value;
  const parsedValue = (0, _parse.default)(value);

  if (typeof parsedValue === 'object' && !(0, _plainObject.default)(parsedValue)) {
    return value;
  }

  return parsedValue;
}

function isValueCorrespondToArgDefinition(value, argDefinition) {
  // checking type first
  let type = null;

  if (argDefinition.type) {
    type = processArgType(argDefinition.type);
    if (type === 'array' && !Array.isArray(parse(value))) return false;else if (type !== 'array' && type !== typeof parse(value)) return false;
  } // checking regexp


  if (argDefinition.regexp && typeof value === 'string') {
    if (!argDefinition.regexp.test(value)) return false;
  } // checking validator


  if (argDefinition.validator && typeof argDefinition.validator === 'function') {
    if (!argDefinition.validator(parse(value))) return false;
  } // all good


  return true;
}

module.exports = exports.default;