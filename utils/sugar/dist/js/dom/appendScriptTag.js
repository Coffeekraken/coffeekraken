"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendScriptTag;

var _scriptLoaded = _interopRequireDefault(require("./scriptLoaded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Append a script tag either to the head or the body
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @example    js
 * import appendScriptTag from 'coffeekraken-sugar/js/dom/appendScriptTag'
 * appendScriptTag('dist/js/app.js')
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendScriptTag(src, $parent = document.body) {
  const $script = document.createElement("script");
  $script.src = src;
  $parent.appendChild($script);
  return (0, _scriptLoaded.default)($script);
}

module.exports = exports.default;