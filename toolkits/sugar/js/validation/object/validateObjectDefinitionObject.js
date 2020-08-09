"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateObjectDefinitionObject;

var _plainObject = _interopRequireDefault(require("../../is/plainObject"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _typeof = _interopRequireDefault(require("../../value/typeof"));

var _SDefinitionObjectError = _interopRequireDefault(require("../../error/SDefinitionObjectError"));

var _validateValue = _interopRequireDefault(require("../../validation/value/validateValue"));

var _definitionObjectDefinition = _interopRequireDefault(require("./definitionObjectDefinition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: tests

/**
 * @name            validateObjectDefinitionObject
 * @namespace           js.validation.object
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - extendsFn (null) {Function}: Specify a function that will be called at first to extend your validation process
 * - name ('unnamed') {String}: Specify a name for debugging purposes
 * - throw (true) {Boolean}: Specify if you want to throw an error if something goes wrong
 * - definitionObj ({}) {Object}: Specify the definition object that will be used to validate the passed one... Weird I know ;)
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateObjectDefinitionObject from '@coffeekraken/sugar/js/object/validateObjectDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateObjectDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateObjectDefinitionObject(definitionObj, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    definitionObj: _definitionObjectDefinition.default,
    throw: true,
    extendsFn: null,
    name: 'unnamed'
  }, settings);
  var issuesObj = {
    name: settings.name,
    issues: []
  };

  if (!(0, _plainObject.default)(definitionObj)) {
    issuesObj.expected = {
      type: 'Object<Object>'
    };
    issuesObj.received = {
      type: (0, _typeof.default)(definitionObj),
      value: definitionObj
    };
    issuesObj.issues.push('type');
  }

  var argNames = Object.keys(definitionObj);

  if (!argNames.length) {
    issuesObj.issues.push('arguments.required');
  }

  var _loop = function _loop(i) {
    var argName = argNames[i];
    var argDefinition = definitionObj[argName];
    var argIssuesObj = {
      issues: []
    };
    Object.keys(argDefinition).forEach(definitionPropName => {
      var definitionPropValue = argDefinition[definitionPropName];
      var expectedDefinitionObj = settings.definitionObj[definitionPropName];

      if (!expectedDefinitionObj) {
        argIssuesObj.issues.push(definitionPropName);
        argIssuesObj[definitionPropName] = {
          issues: ['definitionObject.unknown'],
          name: definitionPropName
        };
        return;
      }

      var definitionPropValidationResult = (0, _validateValue.default)(definitionPropValue, expectedDefinitionObj, {
        name: argName,
        throw: settings.throw
      });

      if (definitionPropValidationResult !== true) {
        argIssuesObj.issues.push(definitionPropName);
        argIssuesObj[definitionPropName] = (0, _deepMerge.default)(argIssuesObj, definitionPropValidationResult, {
          array: true
        });
      }
    });

    if (argIssuesObj.issues.length) {
      issuesObj.issues.push(argName);
      issuesObj[argName] = argIssuesObj;
    }
  };

  for (var i = 0; i < argNames.length; i++) {
    _loop(i);
  }

  if (!issuesObj.issues.length) return true;

  if (settings.throw) {
    throw new _SDefinitionObjectError.default(issuesObj);
  }

  return issuesObj;
}

module.exports = exports.default;