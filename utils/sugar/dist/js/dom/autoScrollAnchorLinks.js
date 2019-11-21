"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoScrollAnchorLinks;

var _easeInOutQuint = _interopRequireDefault(require("../easings/easeInOutQuint"));

var _querySelectorLive = _interopRequireDefault(require("./querySelectorLive"));

var _urlParse = _interopRequireDefault(require("url-parse"));

var _scrollTo = _interopRequireDefault(require("./scrollTo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Listen for links contains an hash to init them for scroll to target on click
 * @param    {Integer}    [duration=500]    The scroll duration in ms
 * @param    {Integer}    [offset=0]    A scroll offset to apply
 * @param    {Function}    [easing=__easing]    An easing function used to scroll
 * @param    {Boolean}    [checkPathnames=true]    Specify if need to check the pathnames correspondance or not
 *
 * @example    js
 * import autoScrollAnchorLinks from 'coffeekraken-sugar/js/autoScrollAnchorLinks'
 * autoScrollAnchorLinks()
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoScrollAnchorLinks(duration = 500, offset = 0, easing = _easeInOutQuint.default, checkPathnames = true) {
  (0, _querySelectorLive.default)('a:not([is])[href*="#"]', $link => {
    // listen for click
    $link.addEventListener("click", e => {
      // get the hash
      const linkUrl = (0, _urlParse.default)($link.getAttribute("href"));
      const currentUrl = (0, _urlParse.default)(); // chack that we have an hash

      if (!linkUrl.hash || linkUrl.hash === "#") return; // if it's not the same pathname between the current url and the link one,
      // we do nothing and we let the link behave as he want

      if (checkPathnames && currentUrl.pathname !== linkUrl.pathname) return; // try to get the target from the hash

      const $target = document.querySelector(linkUrl.hash); // if we don't have any target, let the link behave as he wants

      if (!$target) return; // preventing the link to behave as he wants

      e.preventDefault(); // append the hash to the history in the url

      history.pushState({}, null, linkUrl.hash); // all seems to be good, we can scroll to the target

      (0, _scrollTo.default)($target, duration, easing || _easeInOutQuint.default, offset, "top");
    });
  });
}

module.exports = exports.default;