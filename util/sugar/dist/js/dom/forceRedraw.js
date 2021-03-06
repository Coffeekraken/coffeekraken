"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = forceRedraw;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      forceRedraw
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Force the element to be painted again in case of visual issues
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to force the redraw on
 * @return    {HTMLElement}    The HTMLElement to maintain chainability
 *
 * @example    js
 * import forceRedraw from '@coffeekraken/sugar/js/dom/forceRedraw'
 * forceRedraw($elm)
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function forceRedraw($elm) {
  const display = (0, _getStyleProperty.default)($elm, "display");
  $elm.style.display = "none";
  $elm.offsetHeight;
  $elm.style.display = display;
  return $elm;
}

module.exports = exports.default;