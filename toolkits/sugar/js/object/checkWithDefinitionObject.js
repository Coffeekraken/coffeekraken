"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkWithDefinitionObject;

var _validateDefinitionObject = _interopRequireDefault(require("./validateDefinitionObject"));

var _toString = _interopRequireDefault(require("../string/toString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: tests

/**
 * @name            checkWithDefinitionObject
 * @namespace       sugar.js.object
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
 * @param       {Function}      [extendsFn=null]    Specify a function that will be called for each properties with the arguments "argName", "argDefinition" and "value" to let you the possibility to extend this validation function
 * @param       {Boolean}       [validateDefinitionObject=true]       Specify if you want to validate the passed definition object first or not
 * @return      {Boolean|String}                    Return true if all is ok, and a simple string that describe the issue if it's not
 *
 * @example         js
 * import checkWithDefinitionObject from '@coffeekraken/sugar/js/object/checkWithDefinitionObject';
 * checkWithDefinitionObject({
 *    arg1: 'hello',
 *    arg2: false
 * }, {
 *    arg1: {
 *      type: 'String',
 *      required: true
 *    },
 *    arg2: {
 *      type: 'Boolean',
 *      required: true
 *    }
 * }); // => true
 *
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function checkWithDefinitionObject(objectToCheck, definitionObj, extendsFn = null, validateDefinitionObject = true) {
  // validate the passed definition object first
  if (validateDefinitionObject) {
    const validateDefinitionObjectResult = (0, _validateDefinitionObject.default)(definitionObj);
    if (validateDefinitionObjectResult !== true) return validateDefinitionObjectResult;
  } // loop on the definition object properties


  for (let i = 0; i < Object.keys(definitionObj).length; i++) {
    const argName = Object.keys(definitionObj)[i];
    const argDefinition = definitionObj[argName];
    const value = objectToCheck[argName]; // validate type

    if (value !== undefined && argDefinition.type) {
      if (argDefinition.type.toLowerCase() === 'array') {
        if (!Array.isArray(value)) return `The property "${argName}" has to be an Array. You've passed a "${typeof value}" with the value "${(0, _toString.default)(value)}"...`;
      } else if (typeof value !== argDefinition.type.toLowerCase()) {
        return `The property "${argName}" has to be of type "${argDefinition.type}". You've passed a "${typeof value}" with the value "${(0, _toString.default)(value)}"...`;
      }
    } // check required


    if (argDefinition.required === true) {
      if (value === null || value === undefined) {
        return `The property "${argName}" is required...`;
      }
    } // check if is an extendsFn


    if (extendsFn) {
      const extendsFnResult = extendsFn(argName, argDefinition, value);
      if (extendsFnResult !== true) return extendsFnResult;
    }
  } // all is good


  return true;
}

module.exports = exports.default;