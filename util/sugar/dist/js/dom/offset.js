"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offset;

// import __getTranslateProperties from './getTranslateProperties'

/**
 * @name      offset
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get the offset top and left of the passed element from the document top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{Object} 									The offset top and left object
 *
 * @example  	js
 * import offset from '@coffeekraken/sugar/js/dom/offset'
 * const offsetElm = offset(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function offset(elm) {
  let body, box, clientLeft, clientTop, docEl, left, scrollLeft, scrollTop, top, translates, transX, transY;
  box = elm.getBoundingClientRect();
  body = document.body;
  docEl = document.documentElement;
  scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  clientTop = docEl.clientTop || body.clientTop || 0;
  clientLeft = docEl.clientLeft || body.clientLeft || 0; // translates = __getTranslateProperties(elm);
  // transX = translates.x;
  // transY = translates.y;

  top = box.top + scrollTop - clientTop;
  left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left)
  };
}

module.exports = exports.default;