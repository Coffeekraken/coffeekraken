"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _ofType = _interopRequireDefault(require("../is/ofType"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _class = _interopRequireDefault(require("../is/class"));

var _typeof = _interopRequireDefault(require("../value/typeof"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          validateWithDefinitionObject
 * @namespace     js.value
 * @type          Function
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param         {String}      [name=null]     A name for the check. Usefull for debugging purpose
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * @return         {Boolean|Array<String>}           true if the check is passed, an Array of String describing the issue if not
 *
 * @example       js
 * import validateWithDefinitionObject from '@coffeekraken/sugar/js/value/validateWithDefinitionObject';
 * validateWithDefinitionObject(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateWithDefinitionObject(value, definitionObj, name = null, settings = {}) {
  settings = (0, _deepMerge.default)({}, settings);
  let issueObj = {
    expected: definitionObj,
    received: {
      type: (0, _typeof.default)(value),
      value
    },
    issues: []
  }; // validate type

  if (definitionObj.type) {
    const isOfTypeResult = (0, _ofType.default)(value, definitionObj.type);

    if (isOfTypeResult !== true) {
      issueObj = { ...issueObj,
        ...isOfTypeResult,
        issues: [...issueObj.issues, ...isOfTypeResult.issues]
      };
    }
  } // check required


  if (definitionObj.required === true) {
    if (value === null || value === undefined) {
      issueObj.issues.push('required');
    }
  } // check allowed values


  if (definitionObj.values && Array.isArray(definitionObj.values)) {
    if (definitionObj.values.indexOf(value) === -1) {
      issueObj.issues.push('values');
    }
  }

  if (!issueObj.issues.length) return true;
  return issueObj;
}

module.exports = exports.default;