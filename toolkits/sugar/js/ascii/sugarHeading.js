"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sugarHeading;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _parseHtml = _interopRequireDefault(require("../console/parseHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sugarHeading(settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    version: '2.0.0',
    borders: true
  }, settings);
  var version = '';
  if (settings.version) version = "<white>".concat(settings.version, "</white>");
  var value = ["<yellow>".concat(settings.borders ? '█' : '', "</yellow>"), "<yellow>".concat(settings.borders ? '█' : '', "     ____                           </yellow>"), "<yellow>".concat(settings.borders ? '█' : '', "   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>"), "<yellow>".concat(settings.borders ? '█' : '', "   \\___ \\| | | |/ _` |/ _` | `__|  </yellow>"), "<yellow>".concat(settings.borders ? '█' : '', "    ___) | |_| | (_| | (_| | |       </yellow>"), "<yellow>".concat(settings.borders ? '█' : '', "   |____/ \\__,_|\\__, |\\__,_|_|</yellow> ").concat(version, "    "), "<yellow>".concat(settings.borders ? '█' : '', "                |___/</yellow>"), "<yellow>".concat(settings.borders ? '█' : '', "</yellow>")].map(line => {
    return (0, _parseHtml.default)(line).trim();
  }).join('\n');
  return value;
}

module.exports = exports.default;