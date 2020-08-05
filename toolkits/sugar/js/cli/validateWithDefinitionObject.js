"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _validateWithDefinitionObject = _interopRequireDefault(require("../object/validateWithDefinitionObject"));

var _validateDefinitionObject = _interopRequireDefault(require("./validateDefinitionObject"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            validateWithDefinitionObject
 * @namespace           js.cli
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
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
function validateWithDefinitionObject(objectToCheck, definitionObj, settings = {}) {
  settings = (0, _deepMerge.default)({
    validateDefinitionObject: true,
    bySteps: false
  }, settings);
  let issues = []; // validate definition object first

  if (settings.validateDefinitionObject) {
    const validateDefinitionObjectResult = (0, _validateDefinitionObject.default)(definitionObj);

    if (validateDefinitionObjectResult !== true) {
      if (settings.bySteps) return validateDefinitionObjectResult;
    }

    issues = [...issues, ...validateDefinitionObjectResult];
  }

  const validationResult = (0, _validateWithDefinitionObject.default)(objectToCheck, definitionObj, {
    validateDefinitionObject: false,
    bySteps: settings.bySteps
  });

  if (validationResult !== true) {
    if (settings.bySteps) return validationResult;
    issues = [...issues, ...validationResult];
  }

  if (!issues.length) return true;
  return issues;
}

module.exports = exports.default;