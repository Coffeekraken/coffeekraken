"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollToLocationHash;

var _scrollTo = _interopRequireDefault(require("./scrollTo"));

var _easeInOutQuint = _interopRequireDefault(require("../easings/easeInOutQuint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Scroll to the location hash if an hash is present.
 * This function will try to get the target element from the hash and scroll to it
 *
 * @example 	js
 * import __scrollToLocationHash from 'coffeekraken-sugar/js/dom/scrollToLocationHash'
 * __scrollToLocationHash(500, 0)
 *
 * @param    {Integer}    [duration=500]    The scroll duration
 * @param    {Integer}    [offset=0]    A pixel value to offset the scroll with
 * @param    {Function}    [easing=__easeing]    An easing function to use to scroll
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
 */
function scrollToLocationHash(duration = 500, offset = 0, easing = _easeInOutQuint.default) {
  // check if we have an hash in the url
  const hash = document.location.hash; // if not, do nothing

  if (!hash) return; // try to get the hash target in the page

  const targetElm = document.querySelector(hash); // if no target found, do nothing

  if (!targetElm) return; // tell the browser that we handle the scroll restoration manually

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  } // scroll to target


  (0, _scrollTo.default)(targetElm, duration, easing, offset, "top");
}

module.exports = exports.default;