"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateValue;

var _get = _interopRequireDefault(require("../../object/get"));

var _SValueValidationError = _interopRequireDefault(require("../../error/SValueValidationError"));

var _ofType = _interopRequireDefault(require("../../is/ofType"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _typeof = _interopRequireDefault(require("../../value/typeof"));

var _node = _interopRequireDefault(require("../../is/node"));

var _path = _interopRequireDefault(require("../../is/path"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _SRequiredValidation = _interopRequireDefault(require("./validation/SRequiredValidation"));

var _SPathValidation = _interopRequireDefault(require("./validation/SPathValidation"));

var _STypeValidation = _interopRequireDefault(require("./validation/STypeValidation"));

var _SValuesValidation = _interopRequireDefault(require("./validation/SValuesValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _validationsObj = {
  required: {
    class: _SRequiredValidation.default,
    args: []
  },
  path: {
    class: _SPathValidation.default,
    args: ['%definitionObj.path.exists']
  },
  type: {
    class: _STypeValidation.default,
    args: ['%definitionObj.type']
  },
  values: {
    class: _SValuesValidation.default,
    args: ['%definitionObj.values']
  }
};
/**
 * @name          validateValue
 * @namespace     sugar.js.validation.value
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
    extendFn: null,
    validationsObj: _validationsObj
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
    $issues: [],
    $messages: {}
  };
  Object.keys(settings.validationsObj).forEach((validationName, i) => {
    if (!_validationsObj[validationName]) {
      issueObj.$issues.push("definitionObj.".concat(validationName, ".unknown"));
      issueObj.$messages["definitionObj.".concat(validationName, ".unknown")] = "The specified \"<yellow>".concat(validationName, "</yellow>\" validation is <red>not supported</red>");
    }

    if (!definitionObj[validationName]) return;
    var validationObj = Object.assign({}, settings.validationsObj[validationName]);
    validationObj.args = validationObj.args.map(arg => {
      if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
        arg = definitionObj[arg.replace('%definitionObj.', '')];
      }

      return arg;
    });
    var validationResult = validationObj.class.apply(value, ...validationObj.args);

    if (validationResult !== true) {
      issueObj.$issues.push(validationName);
      issueObj.$messages[validationName] = validationResult;
    }
  });

  if (settings.extendFn && typeof settings.extendFn === 'function') {
    var additionalIssues = settings.extendFn(value, definitionObj, settings) || [];
    issueObj.$issues = [...issueObj.$issues, ...(additionalIssues.$issues || [])];
    issueObj.$messages = [...issueObj.$messages, ...(additionalIssues.$messages || [])];
  }

  if (!issueObj.$issues.length) return true;

  if (settings.throw) {
    throw new _SValueValidationError.default(issueObj);
  }

  return issueObj;
}

module.exports = exports.default;