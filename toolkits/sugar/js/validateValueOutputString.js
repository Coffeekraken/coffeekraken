"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateValueOutputString;

var _parseHtml = _interopRequireDefault(require("../../console/parseHtml"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _node = _interopRequireDefault(require("../../is/node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                validateValueOutputString
 * @namespace           sugar.js.validation.value
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
    var string = "<yellow>\u2502</yellow> - Received value: <yellow>".concat((0, _toString.default)(validateValueResultObj.$received.value, {
      beautify: true
    }), "</yellow>");

    if ((0, _node.default)()) {
      var __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');

      string = string.replace("".concat(__packageRoot(), "/"), '');
      string = string.replace("".concat(__packageRoot(__dirname), "/"), '');
    }

    issuesArray.push(string);
  }

  validateValueResultObj.$issues.forEach(issue => {
    if (validateValueResultObj.$messages[issue]) {
      issuesArray.push("<yellow>\u2502</yellow> - ".concat(validateValueResultObj.$messages[issue]));
    }
  });
  return (0, _parseHtml.default)(issuesArray.join('\n')) + '\n';
}

module.exports = exports.default;