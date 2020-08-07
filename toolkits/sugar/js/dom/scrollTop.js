"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTop;

/**
 * @name      scrollTop
 * @namespace           js.dom
 * @type      Function
 *
 * Return the amount of scroll top that the user as made in the page
 *
 * @example     js
 * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTop';
 * scrollTop();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
 */
function scrollTop() {
  return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}

module.exports = exports.default;