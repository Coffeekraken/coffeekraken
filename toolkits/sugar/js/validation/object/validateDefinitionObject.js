"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateDefinitionObject;

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _SDefinitionObjectInterface = _interopRequireDefault(require("../interface/SDefinitionObjectInterface"));

var _validateObject = _interopRequireDefault(require("./validateObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            validateDefinitionObject
 * @namespace       js.validation.object
 * @type            Function
 *
 * This function simply take a definition object and validate it
 *
 * @param       {Object}          definitionObject        The definition object to validate
 * @param       {Object}          [settings={}]           An object of settings to configure your validation process:
 * - name (Unnamed) {String}: Specify a name for your definition object validation. It helps a lot when you need to debug things
 *
 * @example       js
 * import validateDefinitionObject from '@coffeekraken/sugar/js/validation/object/validateDefinitionObject';
 * validateDefinitionObject({
 *    myProp: {
 *      type: 'String',
 *      required: true
 *    },
 *    otherProp: {
 *      type: 'Boolean'
 *    }
 * }); // => true
 *
 * @since         2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateDefinitionObject(definitionObject, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    name: 'Unnamed'
  }, settings);
  var issuesObj = {
    $name: settings.name,
    $issues: [],
    $messages: {}
  }; // loop on each definition object props

  Object.keys(definitionObject).forEach(argName => {
    var argDefinitionObj = definitionObject[argName]; // validate this

    var res = (0, _validateObject.default)(argDefinitionObj, _SDefinitionObjectInterface.default.definitionObj, {
      throw: true,
      name: "".concat(settings.name, ".").concat(argName)
    });
  });
}

module.exports = exports.default;