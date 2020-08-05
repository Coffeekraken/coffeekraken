"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _validateDefinitionObject = _interopRequireDefault(require("../object/validateDefinitionObject"));

var _ofType = _interopRequireDefault(require("./ofType"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              validateWithDefinitionObject
 * @namespace           js.is
 * @type              Function
 *
 * This function take an property value and an argument definition object
 * to check if the passed value is valid
 *
 * @param         {Mixed}           value         The value to check
 * @param         {Object}          definitionObj       The argument definition object
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - validateDefinitionObject (true) {Boolean}: Specify if you want to validate the passed definition object first or not
 * - bySteps (false) {Boolean}: Specify if you want each issues returned individually or if you want all the issues at once
 * @return        {Array<String>|Boolean}                Return true if all is ok, and an Array of String describing the error if not
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
function validateWithDefinitionObject(value, argDefinitionObj, settings = {}) {
  settings = (0, _deepMerge.default)({
    validateDefinitionObj: true,
    bySteps: false
  }, settings);
  let issues = []; // validate the passed definition object first

  if (settings.validateDefinitionObj) {
    const validateDefinitionObjResult = (0, _validateDefinitionObject.default)(argDefinitionObj);

    if (validateDefinitionObjResult !== true) {
      if (settings.bySteps) return validateDefinitionObjResult;
      issues = [...issues, ...validateDefinitionObjResult];
    }
  } // validate type


  if (value !== undefined && argDefinitionObj.type) {
    const isOfTypeResult = (0, _ofType.default)(value, argDefinition.type, true);

    if (isOfTypeResult !== true) {
      if (settings.bySteps) return isOfTypeResult;
      issues = [...issues, ...isOfTypeResult];
    }
  } // check required


  if (argDefinition.required === true) {
    if (value === null || value === undefined) {
      if (settings.bySteps) return `The passed value is <green>required</green>...`;
      issues.push(`The passed value is <green>required</green>...`);
    }
  }

  if (!issues.length) return true;
  return issues;
}

module.exports = exports.default;