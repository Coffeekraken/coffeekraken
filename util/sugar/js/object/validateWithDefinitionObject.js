"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _validateDefinitionObject = _interopRequireDefault(require("./validateDefinitionObject"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _ofType = _interopRequireDefault(require("../is/ofType"));

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _get = _interopRequireDefault(require("../object/get"));

var _validateWithDefinitionObject = _interopRequireDefault(require("../value/validateWithDefinitionObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: tests

/**
 * @name            validateWithDefinitionObject
 * @namespace           js.object
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
 * import validateWithDefinitionObject from '@coffeekraken/sugar/js/object/validateWithDefinitionObject';
 * validateWithDefinitionObject({
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
function validateWithDefinitionObject(objectToCheck, definitionObj, extendsFn = null, validateDefinitionObject = true, _argPath = []) {
  // validate the passed definition object first
  if (validateDefinitionObject) {
    const validateDefinitionObjectResult = (0, _validateDefinitionObject.default)(definitionObj);
    if (validateDefinitionObjectResult !== true) return validateDefinitionObjectResult;
  } // loop on the definition object properties


  for (let i = 0; i < Object.keys(definitionObj).length; i++) {
    const argName = Object.keys(definitionObj)[i];
    const argDefinition = definitionObj[argName];
    const value = (0, _get.default)(objectToCheck, argName);
    const validationRes = (0, _validateWithDefinitionObject.default)(value, argDefinition, argName);
    if (validationRes !== true) return validationRes; // check if is an extendsFn

    if (extendsFn) {
      const extendsFnResult = extendsFn(argName, argDefinition, value);
      if (extendsFnResult !== true) return extendsFnResult;
    } // check if we have some "children" properties


    if (argDefinition.children) {
      const childrenValidation = validateWithDefinitionObject(objectToCheck[argName] || {}, argDefinition.children, extendsFn, validateDefinitionObject, [..._argPath, argName]);
      if (childrenValidation !== true) return childrenValidation;
    }
  } // all is good


  return true;
}

module.exports = exports.default;