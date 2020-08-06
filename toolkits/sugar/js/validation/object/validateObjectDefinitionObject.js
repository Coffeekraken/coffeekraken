"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateObjectDefinitionObject;

var _plainObject = _interopRequireDefault(require("../../is/plainObject"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: tests

/**
 * @name            validateObjectDefinitionObject
 * @namespace           js.validation.definitionObject
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - bySteps (false) {Boolean}: Specify if you want each issues returned individually or if you want all the issues at once
 * - extendsFn (null) {Function}: Specify a function that will be called at first to extend your validation process
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
function validateObjectDefinitionObject(definitionObj, settings = {}) {
  settings = (0, _deepMerge.default)({
    bySteps: false,
    extendsFn: null
  });
  let issues = [];

  if (!(0, _plainObject.default)(definitionObj)) {
    const msg = `Sorry but the passed definition object has to be a plain object...`;
    if (settings.bySteps) return msg;
    issues = [...issues, msg];
  }

  const argNames = Object.keys(definitionObj);

  if (!argNames.length) {
    const msg = `A definition object has to contain at least 1 argument definition...`;
    if (settings.bySteps) return msg;
    issues = [...issues, msg];
  }

  for (let i = 0; i < argNames.length; i++) {
    const argName = argNames[i];
    const argDefinition = definitionObj[argName]; // check the type

    if (argDefinition.type === undefined) {
      const msg = `An argument definiion object has to contain a "type" property which is not the case for your argument "${argName}"...`;
      if (settings.bySteps) return msg;
      issues = [...issues, msg];
    }

    if (typeof argDefinition.type !== 'string') {
      const msg = `The "type" property of an argument definition object has to be a String. You've passed "${(0, _toString.default)(argDefinition.type)}" which is a "${typeof argDefinition.type}" for your argument "${argName}"...`;
      if (settings.bySteps) return msg;
      issues = [...issues, msg];
    }

    if (argDefinition.required !== undefined) {
      if (typeof argDefinition.required !== 'boolean') {
        const msg = `The "required" property of an argument definition object has to bo a Boolean. You've passed "${(0, _toString.default)(argDefinition.required)}" which is a "${typeof argDefinition.required}"...`;
        if (settings.bySteps) return msg;
        issues = [...issues, msg];
      }
    } // if an extends function exist, call it


    if (settings.extendsFn && typeof settings.extendsFn === 'function') {
      const res = settings.extendsFn(argName, argDefinition);

      if (res !== true) {
        if (settings.bySteps) return res;
        issues = [...issues, ...res];
      }
    }
  }

  if (!issues.length) return true;
  return issues;
}

module.exports = exports.default;