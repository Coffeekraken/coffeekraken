"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = domReady;

var _domready = _interopRequireDefault(require("domready"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      domReady
 * @namespace           js.dom
 * @type      Function
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @param 		{Function} 		cb 			An optional callback that will be called when the dom is ready
 * @return 		{Promise} 					A promise that will be resolved when the dom is ready
 *
 * @example  	js
 * import domReady from '@coffeekraken/sugar/js/dom/domReady'
 * // using callback
 * domReady(() => {
 * 		// do something
 * });
 * // using promise
 * domReady().then(() => {
 * 		// do something
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function domReady(cb) {
  if (cb === void 0) {
    cb = null;
  }

  return new Promise((resolve, reject) => {
    (0, _domready.default)(() => {
      cb && cb();
      resolve();
    });
  });
}

module.exports = exports.default;