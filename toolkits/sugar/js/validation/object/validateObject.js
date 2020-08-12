"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateObject;

var _validateObjectDefinitionObject = _interopRequireDefault(require("./validateObjectDefinitionObject"));

var _ofType = _interopRequireDefault(require("../../is/ofType"));

var _plainObject = _interopRequireDefault(require("../../is/plainObject"));

var _class = _interopRequireDefault(require("../../is/class"));

var _get = _interopRequireDefault(require("../../object/get"));

var _validateValue = _interopRequireDefault(require("../value/validateValue"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _parseHtml = _interopRequireDefault(require("../../console/parseHtml"));

var _filter = _interopRequireDefault(require("../../object/filter"));

var _typeof = _interopRequireDefault(require("../../value/typeof"));

var _SObjectValidationError = _interopRequireDefault(require("../../error/SObjectValidationError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * - validateDefinitionObject (true) {Boolean}: Specify if you want to validate the passed definition object first or not
 * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
 *
 * @todo        tests
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
    name: 'unnamed',
    interface: null,
    validateDefinitionObject: true
  }, settings);
  var issuesObj = {
    name: settings.name,
    interface: settings.interface,
    issues: []
  }; // validate the passed definition object first

  if (settings.validateDefinitionObject) {
    var validateDefinitionObjectResult = (0, _validateObjectDefinitionObject.default)(definitionObj, {
      throw: settings.throw,
      name: settings.name
    });
  } // loop on the definition object properties


  var _loop = function _loop(i) {
    var argName = Object.keys(definitionObj)[i];
    var argDefinition = definitionObj[argName];
    var value = (0, _get.default)(objectToCheck, argName); // get the correct value depending on the definitionObj

    var staticIssue = false;

    if (argDefinition.static && !(0, _class.default)(objectToCheck)) {
      if (objectToCheck.constructor && objectToCheck.constructor[argName]) {
        value = objectToCheck.constructor[argName];
      } else {
        value = null;
        staticIssue = true;
      }
    }

    var validationRes = (0, _validateValue.default)(value, argDefinition, {
      name: argName,
      throw: settings.throw
    });
    issuesObj[argName] = {
      name: argName,
      received: {
        type: (0, _typeof.default)(value),
        value
      },
      expected: argDefinition,
      issues: []
    };

    if (validationRes !== true) {
      issuesObj[argName] = (0, _deepMerge.default)(issuesObj[argName], validationRes || {}, {
        array: true
      });
    }

    if (staticIssue) {
      issuesObj[argName].issues.push('static');
    } // handle "lazy" properties


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
      issuesObj[argName] = settings.extendsFn(argName, argDefinition, value, issuesObj[argName]);
    } // filter args that have no issues


    issuesObj = (0, _filter.default)(issuesObj, (item, key) => {
      if (Array.isArray(item)) return true;

      if ((0, _plainObject.default)(item) && item.issues) {
        if (!item.issues.length) return false;
        if (issuesObj.issues.indexOf(key) === -1) issuesObj.issues.push(key);
      }

      return true;
    }); // TODO implement the "children" support
    // check if we have some "children" properties

    if (argDefinition.definitionObj && (argDefinition.required || objectToCheck !== null && objectToCheck !== undefined)) {
      var childrenValidation = validateObject(objectToCheck || {}, argDefinition.definitionObj, _objectSpread(_objectSpread({}, settings), {}, {
        throw: false
      }), [..._argPath, argName]); // console.log('CC', childrenValidation);

      if (childrenValidation !== true && childrenValidation.issues) {
        childrenValidation.issues.forEach(issue => {
          var issueObj = childrenValidation[issue];
          issueObj.name = "".concat(argName, ".").concat(issueObj.name);
          issuesObj.issues.push("".concat(argName, ".").concat(issue));
          issuesObj["".concat(argName, ".").concat(issue)] = issueObj;
        }); // if (settings.bySteps) return __parseHtml(childrenValidation);
        // issues = [...issues, ...childrenValidation];
      }
    }
  };

  for (var i = 0; i < Object.keys(definitionObj).length; i++) {
    _loop(i);
  }

  if (!issuesObj.issues.length) return true;

  if (settings.throw) {
    throw new _SObjectValidationError.default(issuesObj);
  }

  return issuesObj;
}

module.exports = exports.default;