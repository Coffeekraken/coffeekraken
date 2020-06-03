"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _validateDefinitionObject = _interopRequireDefault(require("../object/validateDefinitionObject"));

var _ofType = _interopRequireDefault(require("./ofType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              validateWithDefinitionObject
 * @namespace         sugar.js.is
 * @type              Function
 *
 * This function take an property value and an argument definition object
 * to check if the passed value is valid
 *
 * @param         {Mixed}           value         The value to check
 * @param         {Object}          definitionObj       The argument definition object
 * @param       {Boolean}       [validateDefinitionObj=true]       Specify if you want to validate the passed definition object first or not
 * @return        {String|Boolean}                Return true if all is ok, and a string describing the error if not
 *
 * @example       js
 * import isValidateWithDefinitionObject from '@coffeekraken/sugar/js/is/validateWithDefinitionObject';
 * isValidateWidthDefinitionObject('something', {
 *    type: 'String',
 *    required: true
 * }); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateWithDefinitionObject(value, argDefinitionObj, validateDefinitionObj = true) {
  // validate the passed definition object first
  if (validateDefinitionObj) {
    const validateDefinitionObjResult = (0, _validateDefinitionObject.default)(argDefinitionObj);
    if (validateDefinitionObjResult !== true) return validateDefinitionObjResult;
  } // validate type


  if (value !== undefined && argDefinitionObj.type) {
    const isOfTypeResult = (0, _ofType.default)(value, argDefinition.type, true);

    if (isOfTypeResult !== true) {
      return isOfTypeResult;
    }
  } // check required


  if (argDefinition.required === true) {
    if (value === null || value === undefined) {
      return `The passed value is <green>required</green>...`;
    }
  }
}

module.exports = exports.default;