"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateValueOutputString;

var _parseHtml = _interopRequireDefault(require("../../console/parseHtml"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _validateObjectDefinitionObject = _interopRequireDefault(require("../object/validateObjectDefinitionObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                validateValueOutputString
 * @namespace           js.validation.value
 * @type                Function
 *
 * This function take the resulting object of the ```validateValue``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateValueResultObj           The validateValue resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
 *
 * @example       js
 * import validateValueOutputString from '@coffeekraken/sugar/js/validation/object/validateValueOutputString';
 * import validateValue from '@coffeekraken/sugar/js/validation/object/validateValue';
 * const resultObj = validateValue(true, {
 *    type: 'String',
 *    required: true
 * });
 * validateValueOutputString(resultObj);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateValueOutputString(validateValueResultObj, settings) {
  if (settings === void 0) {
    settings = {};
  }

  var issuesArray = [];
  settings = (0, _deepMerge.default)({
    name: settings.name || validateValueResultObj.$name,
    interface: settings.interface || validateValueResultObj.$interface
  });

  if (settings.name) {
    issuesArray.push("<yellow>\u2502</yellow> ".concat(settings.name, "\n<yellow>\u2502</yellow>"));
  }

  if (validateValueResultObj.$received) {
    issuesArray.push("<yellow>\u2502</yellow> - Received value: <yellow>".concat((0, _toString.default)(validateValueResultObj.$received.value, {
      beautify: true
    }), "</yellow>"));
  }

  validateValueResultObj.$issues.forEach(issue => {
    switch (issue.toLowerCase()) {
      case 'definitionobject.unknown':
        issuesArray.push("<yellow>\u2502</yellow> This passed definition object property \"<cyan>".concat((0, _toString.default)(validateValueResultObj.$name || 'unnamed'), "</cyan>\" is not supported..."));
        break;

      case 'required':
        issuesArray.push("<yellow>\u2502</yellow> - This value is <green>required</green>");
        break;

      case 'type':
        issuesArray.push("<yellow>\u2502</yellow> - The value type has to be <green>".concat(validateValueResultObj.$expected.type, "</green> but you passed <red>").concat(validateValueResultObj.$received.type, "</red>"));
        break;

      case 'description':
        issuesArray.push("<yellow>\u2502</yellow> - It seems that you forget to set a description for this property...");
        break;

      case 'values':
        issuesArray.push("<yellow>\u2502</yellow> - The allowed values are [".concat(validateValueResultObj.$expected.values.map(v => {
          return "\"<green>".concat(v, "</green>\"");
        }).join(', '), "]"));
        break;

      case 'lazy':
        issuesArray.push("<yellow>\u2502</yellow> - This property is specified as a <yellow>lazy</yellow> one");
        break;

      case 'static':
        issuesArray.push("<yellow>\u2502</yellow> - This value has to be a <green>static</green> one");
        break;
    }
  });
  return (0, _parseHtml.default)(issuesArray.join('\n')) + '\n';
}

module.exports = exports.default;