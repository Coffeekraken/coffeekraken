"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateCliObject;

var _validateObject = _interopRequireDefault(require("../object/validateObject"));

var _validateCliDefinitionObject = _interopRequireDefault(require("./validateCliDefinitionObject"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            validateCliObject
 * @namespace           js.validation.cli
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
 * @param       {String}        [name='unnamed']     The name used for debug
 * @param       {Object}        [settings={}]       An object with settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want the process to throw an error when something went wrong
 * - validateDefinitionObject (true) {Boolean}: Specify if you want to validate the passed definition object
 * @param       {Boolean}       [validateDefinitionObject=true]       Specify if you want to validate the passed definition object first or not
 * @return      {Boolean|String}                    Return true if all is ok, and a simple string that describe the issue if it's not
 *
 * @todo        tests
 *
 * @example         js
 * import validateCliObject from '@coffeekraken/sugar/js/object/validateCliObject';
 * validateCliObject({
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
function validateCliObject(objectToCheck, definitionObj, name = 'unnamed', settings = {}) {
  settings = (0, _deepMerge.default)({
    throw: true,
    validateDefinitionObject: true
  }, settings);
  let issueObj = {
    issues: []
  }; // validate definition object first

  if (settings.validateDefinitionObject) {
    const validateDefinitionObjectResult = (0, _validateCliDefinitionObject.default)(definitionObj);

    if (validateDefinitionObjectResult !== true) {
      throw new Error(validateDefinitionObjectResult);
    }
  }

  const validationResult = (0, _validateObject.default)(objectToCheck, definitionObj, name, (0, _deepMerge.default)({
    extendsFn: (argName, argDefinition, value, argIssueObj) => {
      if (!argDefinition.description || typeof argDefinition.description !== 'string') {
        argIssueObj.issues.push('description');
      }

      return argIssueObj;
    }
  }, settings));

  if (validationResult !== true) {
    issueObj = (0, _deepMerge.default)(issueObj, validationResult, {
      array: true
    });
  }

  if (!issueObj.issues.length) return true;
  return issueObj;
}

module.exports = exports.default;