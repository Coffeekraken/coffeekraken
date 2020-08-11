"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateObjectDefinitionObjectOutputString;

var _validateValueOutputString = _interopRequireDefault(require("../value/validateValueOutputString"));

var _parseHtml = _interopRequireDefault(require("../../console/parseHtml"));

var _trimLines = _interopRequireDefault(require("../../string/trimLines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                validateObjectDefinitionObjectOutputString
 * @namespace           js.validation.object
 * @type                Function
 *
 * This function take the resulting object of the ```validateObjectDefinitionObject``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateObjectDefinitionObjectResultObj           The validateObject resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
 *
 * @example       js
 * import validateObjectDefinitionObjectOutputString from '@coffeekraken/sugar/js/validation/object/validateObjectDefinitionObjectOutputString';
 * import validateObjectDefinitionObject from '@coffeekraken/sugar/js/validation/object/validateObjectDefinitionObject';
 * const resultObj = validateObjectDefinitionObject({
 *    plop: {
 *      type: 'String',
 *      required: true
 *    },
 *    hello: {
 *      type: 'String',
 *      required: true
 *    }
 * });
 * validateObjectDefinitionObjectOutputString(resultObj);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateObjectDefinitionObjectOutputString(validateObjectDefinitionObjectResultObj) {
  var stringsArray = [];
  stringsArray.push((0, _trimLines.default)("\n  <underline><bold>Definition object validation</bold></underline>\n\n  - Name: <yellow>".concat(validateObjectDefinitionObjectResultObj.name || 'unnamed', "</yellow>\n  - Error").concat(validateObjectDefinitionObjectResultObj.issues.length > 1 ? 's' : '', ": <red>").concat(validateObjectDefinitionObjectResultObj.issues.length, "</red>\n  - Propert").concat(validateObjectDefinitionObjectResultObj.issues.length > 1 ? 'ies' : 'y', ": ").concat(validateObjectDefinitionObjectResultObj.issues.map(v => {
    return "<red>".concat(v, "</red>");
  }).join(', '))));
  validateObjectDefinitionObjectResultObj.issues.forEach(attrName => {
    if (attrName === 'expected' || attrName === 'received' || attrName === 'issues') {
      return;
    }

    if (!validateObjectDefinitionObjectResultObj[attrName] || !validateObjectDefinitionObjectResultObj[attrName].issues) {
      return;
    }

    validateObjectDefinitionObjectResultObj[attrName].issues.forEach(issueName => {
      var attrIssueObj = validateObjectDefinitionObjectResultObj[attrName][issueName];
      var string = (0, _validateValueOutputString.default)(attrIssueObj, {
        name: attrName
      });
      stringsArray.push(string);
    });
  });
  return (0, _parseHtml.default)(stringsArray.join('\n\n'));
}

module.exports = exports.default;