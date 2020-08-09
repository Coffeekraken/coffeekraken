"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateObjectOutputString;

var _validateValueOutputString = _interopRequireDefault(require("../value/validateValueOutputString"));

var _parseHtml = _interopRequireDefault(require("../../console/parseHtml"));

var _trimLines = _interopRequireDefault(require("../../string/trimLines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                validateObjectOutputString
 * @namespace           js.validation.object
 * @type                Function
 *
 * This function take the resulting object of the ```validateObject``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateObjectResultObj           The validateObject resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
 *
 * @example       js
 * import validateObjectOutputString from '@coffeekraken/sugar/js/validation/object/validateObjectOutputString';
 * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
 * const resultObj = validateObject({
 *    plop: true,
 *    hello: 'world'
 * }, {
 *    plop: {
 *      type: 'String',
 *      required: true
 *    },
 *    hello: {
 *      type: 'String',
 *      required: true
 *    }
 * });
 * validateObjectOutputString(resultObj);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateObjectOutputString(validateObjectResultObj) {
  var stringsArray = [];
  stringsArray.push((0, _trimLines.default)("\n  <underline><bold>Object validation</bold></underline>\n\n  - Name: <yellow>".concat(validateObjectResultObj.name || 'unnamed', "</yellow>\n  - Error").concat(validateObjectResultObj.issues.length > 1 ? 's' : '', ": <red>").concat(validateObjectResultObj.issues.length, "</red>\n  - Propert").concat(validateObjectResultObj.issues.length > 1 ? 'ies' : 'y', ": ").concat(validateObjectResultObj.issues.map(v => {
    return "<red>".concat(v, "</red>");
  }).join(', '))));
  validateObjectResultObj.issues.forEach(attrName => {
    var attrIssueObj = validateObjectResultObj[attrName];
    var string = (0, _validateValueOutputString.default)(attrIssueObj, {
      name: attrName
    });
    stringsArray.push(string);
  });
  return (0, _parseHtml.default)(stringsArray.join('\n\n'));
}

module.exports = exports.default;