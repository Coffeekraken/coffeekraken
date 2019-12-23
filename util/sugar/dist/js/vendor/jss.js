"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jss;

var _jss = _interopRequireDefault(require("jss"));

var _jssPluginVendorPrefixer = _interopRequireDefault(require("jss-plugin-vendor-prefixer"));

var _jssPluginGlobal = _interopRequireDefault(require("jss-plugin-global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jss.default.use((0, _jssPluginVendorPrefixer.default)(), (0, _jssPluginGlobal.default)());

function jss(styleObject) {
  const sheet = _jss.default.createStyleSheet(styleObject);

  sheet.attach();
  return sheet;
}

module.exports = exports.default;