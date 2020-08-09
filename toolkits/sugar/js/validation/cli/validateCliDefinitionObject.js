"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateCliDefinitionObject;

var _validateObjectDefinitionObject = _interopRequireDefault(require("../object/validateObjectDefinitionObject"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _cliDefinitionObjectDefinition = _interopRequireDefault(require("./cliDefinitionObjectDefinition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name            validateCliDefinitionObject
 * @namespace           js.validation.cli
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]               A settings object to configure your validation process:
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateCliDefinitionObject from '@coffeekraken/sugar/js/cli/validateCliDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateCliDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateCliDefinitionObject(definitionObj, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({}, settings);
  return (0, _validateObjectDefinitionObject.default)(definitionObj, _objectSpread(_objectSpread({}, settings), {}, {
    definitionObj: _cliDefinitionObjectDefinition.default
  }));
}

module.exports = exports.default;