"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = js;

var _SAjax = _interopRequireDefault(require("@coffeekraken/sugar/js/class/SAjax"));

var _settings = _interopRequireDefault(require("../settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function js(code, language, options = {}) {
  return new Promise((resolve, reject) => {
    const ajx = new _SAjax.default({
      url: `${_settings.default.apiUrl}/compile/${language}?${_settings.default.queryString}`,
      method: 'POST',
      data: JSON.stringify({
        data: code,
        options: options
      }),
      contentType: 'application/json'
    });
    resolve(ajx.send());
  });
}

module.exports = exports.default;