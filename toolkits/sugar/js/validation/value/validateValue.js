"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateValue;

var _SValueValidationError = _interopRequireDefault(require("../../error/SValueValidationError"));

var _ofType = _interopRequireDefault(require("../../is/ofType"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _typeof = _interopRequireDefault(require("../../value/typeof"));

var _node = _interopRequireDefault(require("../../is/node"));

var _path = _interopRequireDefault(require("../../is/path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          validateValue
 * @namespace     js.validation.value
 * @type          Function
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - name ('unnamed') {String}: Specify a name. Useful for debugging
 * - extendFn (null) {Function}: Specify a function that will be called after the default validations checks and before the return or throw statements. It will have as arguments the "value" to check, the "definitionObj" and the "settings" object. You then can make your checks and return an array of "issues" like ["path","other"], etc...
 * @return         {Boolean|Object}           true if the check is passed, an Array of String describing the issue if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateValue from '@coffeekraken/sugar/js/validation/value/validateValue';
 * validateValue(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateValue(value, definitionObj, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    name: 'unnamed',
    throw: true,
    extendFn: null
  }, settings);

  if ((value === null || value === undefined) && definitionObj.default !== undefined) {
    value = definitionObj.default;
  }

  var issueObj = {
    $expected: definitionObj,
    $received: {
      type: (0, _typeof.default)(value),
      value
    },
    $name: settings.name,
    $issues: []
  };

  if ((value === null || value === undefined) && !definitionObj.required) {
    return true;
  }

  if (definitionObj.lazy) {
    issueObj.$issues.push('lazy');
  } // check required


  if (definitionObj.required === true) {
    if (value === null || value === undefined) {
      issueObj.$issues.push('required');
    }
  } // validate type


  if (definitionObj.type) {
    var isOfTypeResult = (0, _ofType.default)(value, definitionObj.type);

    if (isOfTypeResult !== true) {
      issueObj = (0, _deepMerge.default)(issueObj, isOfTypeResult, {
        array: true
      });
    }
  } // check allowed values


  if (definitionObj.values && Array.isArray(definitionObj.values)) {
    if (definitionObj.values.indexOf(value) === -1) {
      issueObj.$issues.push('values');
    }
  } // check "path" defined value


  if (definitionObj.path && !(0, _node.default)()) {
    if (!(0, _path.default)(value)) {
      issueObj.$issues.push('path');
    }
  }

  if (settings.extendFn && typeof settings.extendFn === 'function') {
    var additionalIssues = settings.extendFn(value, definitionObj, settings) || [];
    issueObj.$issues = [...issueObj.$issues, ...additionalIssues];
  }

  if (!issueObj.$issues.length) return true;

  if (settings.throw) {
    throw new _SValueValidationError.default(issueObj);
  }

  return issueObj;
}

module.exports = exports.default;