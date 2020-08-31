"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateObject;

var _toString = _interopRequireDefault(require("../../string/toString"));

var _SObjectValidationError = _interopRequireDefault(require("../../error/SObjectValidationError"));

var _class = _interopRequireDefault(require("../../is/class"));

var _plainObject = _interopRequireDefault(require("../../is/plainObject"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _filter = _interopRequireDefault(require("../../object/filter"));

var _get = _interopRequireDefault(require("../../object/get"));

var _typeof = _interopRequireDefault(require("../../value/typeof"));

var _validateValue = _interopRequireDefault(require("../value/validateValue"));

var _SDefinitionObjectInterface = _interopRequireDefault(require("../interface/SDefinitionObjectInterface"));

var _SStaticValidation = _interopRequireDefault(require("./validation/SStaticValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _validationsObj = {
  static: {
    class: _SStaticValidation.default,
    args: ['%object', '%property']
  }
};
/**
 * @name            validateObject
 * @namespace           js.validation.object
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
 * @param       {String}        [name='unnamed']    Specify a name for your object. This will be useful during the validation process
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - extendsFn (null) {Function}: Specify a function that will be called for each properties with the arguments "argName", "argDefinition" and "value" to let you the possibility to extend this validation function
 * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
 *
 * @todo        tests and documentation refactoring
 *
 * @example         js
 * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
 * validateObject({
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

function validateObject(objectToCheck, definitionObj, settings, _argPath) {
  if (settings === void 0) {
    settings = {};
  }

  if (_argPath === void 0) {
    _argPath = [];
  }

  settings = (0, _deepMerge.default)({
    throw: true,
    name: null,
    interface: null,
    validationsObj: _validationsObj
  }, settings);
  var issuesObj = {
    $name: settings.name || objectToCheck.constructor.name || objectToCheck.name || 'Unnamed',
    $interface: settings.interface,
    $issues: [],
    $messages: {}
  }; // loop on the definition object properties

  var _loop = function _loop(i) {
    var argName = Object.keys(definitionObj)[i];
    var argDefinition = definitionObj[argName]; // __SObjectDefinitionInterface.apply(argDefinition);

    var value = (0, _get.default)(objectToCheck, argName);

    if (value === undefined || value === null) {
      if (objectToCheck.constructor && objectToCheck.constructor[argName] !== undefined) {
        value = objectToCheck.constructor[argName];
      }
    }

    if (!argDefinition.required && (value === undefined || value === null)) {
      // the value is not required so we pass the checks...
      return "break";
    }

    issuesObj[argName] = {
      $name: argName,
      $received: {
        type: (0, _typeof.default)(value),
        value
      },
      $expected: argDefinition,
      $issues: [],
      $messages: {}
    };
    var validationRes = (0, _validateValue.default)(value, argDefinition, {
      name: argName,
      throw: settings.throw
    });

    if (validationRes !== true) {
      issuesObj[argName] = (0, _deepMerge.default)(issuesObj[argName], validationRes || {}, {
        array: true
      });
    } else {}

    Object.keys(settings.validationsObj).forEach(validationName => {
      if (!_validationsObj[validationName]) {
        issuesObj.$issues.push("definitionObj.".concat(validationName, ".unknown"));
        issuesObj.$messages["definitionObj.".concat(validationName, ".unknown")] = "The specified \"<yellow>".concat(validationName, "</yellow>\" validation is <red>not supported</red>");
      }

      if (validationName === 'static' && definitionObj.static && definitionObj.static !== true) return;
      if (!definitionObj.hasOwnProperty(validationName)) return;
      if (!definitionObj[validationName]) return;
      var validationObj = Object.assign({}, settings.validationsObj[validationName]);
      validationObj.args = validationObj.args.map(arg => {
        if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
          arg = (0, _get.default)(definitionObj, arg.replace('%definitionObj.', ''));
        }

        if (typeof arg === 'string' && arg === '%object') {
          arg = objectToCheck;
        }

        if (typeof arg === 'string' && arg === '%property') {
          arg = argName;
        }

        return arg;
      });
      var validationResult = validationObj.class.apply(value, ...validationObj.args);

      if (validationResult !== true) {
        issuesObj[argName].$issues.push(validationName);
        issuesObj[argName].$messages[validationName] = validationResult;
      }
    }); // handle "lazy" properties

    if (argDefinition.lazy && objectToCheck[argName] === null || objectToCheck[argName] === undefined) {
      if (!objectToCheck.__validateObjectObservedProperties) {
        Object.defineProperty(objectToCheck, '__validateObjectObservedProperties', {
          value: [],
          writable: true,
          enumerable: false
        });
      }

      if (objectToCheck.__validateObjectObservedProperties.indexOf(argName) !== -1) {} else {
        var descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(objectToCheck), argName);

        objectToCheck.__validateObjectObservedProperties.push(argName);

        Object.defineProperty(objectToCheck, argName, {
          set: value => {
            // validate the passed value
            var validationResult = (0, _validateValue.default)(value, argDefinition, _objectSpread(_objectSpread({}, settings), {}, {
              throw: true,
              name: "".concat(settings.name, ".").concat(argName)
            }));
            if (descriptor && descriptor.set) return descriptor.set(value);
            objectToCheck["__".concat(argName)] = value;
            return value;
          },
          get: () => {
            if (descriptor && descriptor.get) descriptor.get();
            return objectToCheck["__".concat(argName)];
          }
        });
      }
    } // check if is an extendsFn


    if (settings.extendsFn) {
      if (!issuesObj[argName]) {
        issuesObj[argName] = {
          $issues: []
        };
      }

      issuesObj[argName] = settings.extendsFn(argName, argDefinition, value, issuesObj[argName]);
    } // filter args that have no issues


    issuesObj = (0, _filter.default)(issuesObj, (item, key) => {
      if (Array.isArray(item)) return true;

      if ((0, _plainObject.default)(item) && item.$issues) {
        if (!item.$issues.length) return false;
        if (issuesObj.$issues.indexOf(key) === -1) issuesObj.$issues.push(key);
      }

      return true;
    }); // TODO implement the "children" support
    // check if we have some "children" properties

    if (argDefinition.definitionObj && (argDefinition.required || objectToCheck !== null && objectToCheck !== undefined)) {
      var childrenValidation = validateObject(objectToCheck || {}, argDefinition.definitionObj, _objectSpread(_objectSpread({}, settings), {}, {
        throw: false
      }), [..._argPath, argName]); // console.log('CC', childrenValidation);

      if (childrenValidation !== true && childrenValidation.$issues) {
        childrenValidation.$issues.forEach(issue => {
          var issueObj = childrenValidation[issue];
          issueObj.$name = "".concat(argName, ".").concat(issueObj.name);
          issuesObj.$issues.push("".concat(argName, ".").concat(issue));
          issuesObj["".concat(argName, ".").concat(issue)] = issueObj;
        });
      }
    }
  };

  for (var i = 0; i < Object.keys(definitionObj).length; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  if (!issuesObj.$issues.length) return true;

  if (settings.throw) {
    throw new _SObjectValidationError.default(issuesObj);
  }

  return issuesObj;
}

module.exports = exports.default;