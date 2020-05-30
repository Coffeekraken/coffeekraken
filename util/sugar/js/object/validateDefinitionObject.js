"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateDefinitionObject;

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _toString = _interopRequireDefault(require("../string/toString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: tests

/**
 * @name            validateDefinitionObject
 * @namespace       sugar.js.object
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @example       js
 * import validateDefinitionObject from '@coffeekraken/sugar/js/object/validateDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateDefinitionObject(definitionObj, extendsFn = null) {
  if (!(0, _plainObject.default)(definitionObj)) {
    return `Sorry but the passed definition object has to be a plain object...`;
  }

  const argNames = Object.keys(definitionObj);

  if (!argNames.length) {
    return `A definition object has to contain at least 1 argument definition...`;
  }

  for (let i = 0; i < argNames.length; i++) {
    const argName = argNames[i];
    const argDefinition = definitionObj[argName]; // check the type

    const supportedTypes = ['string', 'number', 'object', 'array', 'boolean'];
    if (argDefinition.type === undefined) return `An argument definiion object has to contain a "type" property which is not the case for your argument "${argName}"...`;
    if (typeof argDefinition.type !== 'string') return `The "type" property of an argument definition object has to be a String. You've passed "${(0, _toString.default)(argDefinition.type)}" which is a "${typeof argDefinition.type}" for your argument "${argName}"...`;
    if (supportedTypes.indexOf(argDefinition.type.toLowerCase()) === -1) return `The "type" property of an argument definition object has to be one of these values "${supportedTypes.join(',')}". You've passed "${argDefinition.type}" for your argument "${argName}"...`;

    if (argDefinition.required !== undefined) {
      if (typeof argDefinition.required !== 'boolean') {
        return `The "required" property of an argument definition object has to bo a Boolean. You've passed "${(0, _toString.default)(argDefinition.required)}" which is a "${typeof argDefinition.required}"...`;
      }
    } // if an extends function exist, call it


    if (extendsFn && typeof extendsFn === 'function') {
      const res = extendsFn(argName, argDefinition);
      if (res !== true) return res;
    }
  } // return true


  return true;
}

module.exports = exports.default;