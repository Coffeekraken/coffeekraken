"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateValueOutputString;

var _parseHtml = _interopRequireDefault(require("../../console/parseHtml"));

var _toString = _interopRequireDefault(require("../../string/toString"));

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
function validateValueOutputString(validateValueResultObj) {
  let issuesArray = [];

  if (validateValueResultObj.name) {
    issuesArray.push(`<yellow>│</yellow> <underline><bold>${validateValueResultObj.name}</bold></underline>`);
  }

  issuesArray.push(`<yellow>│</yellow> - Received value: <yellow>${(0, _toString.default)(validateValueResultObj.received.value)}</yellow>`);
  validateValueResultObj.issues.forEach(issue => {
    switch (issue.toLowerCase()) {
      case 'required':
        issuesArray.push(`<yellow>│</yellow> - This value is <green>required</green>`);
        break;

      case 'type':
        issuesArray.push(`<yellow>│</yellow> - The value type has to be <green>${validateValueResultObj.expected.type}</green> but you passed <red>${validateValueResultObj.received.type}</red>`);
        break;

      case 'values':
        issuesArray.push(`<yellow>│</yellow> - The allowed values are [${validateValueResultObj.expected.values.map(v => {
          return `"<green>${v}</green>"`;
        }).join(', ')}]`);
        break;

      case 'static':
        issuesArray.push(`<yellow>│</yellow> - This value has to be a <green>static</green> one`);
        break;
    }
  });
  return (0, _parseHtml.default)(issuesArray.join('\n'));
}

module.exports = exports.default;