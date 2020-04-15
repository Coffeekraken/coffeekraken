"use strict";

var _querySelectorLive = _interopRequireDefault(require("../dom/querySelectorLive"));

var _scrollTo = _interopRequireDefault(require("../dom/scrollTo"));

var _easeInOutQuint = _interopRequireDefault(require("../easing/easeInOutQuint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		linksScrollHrefAttribute
 * @namespace       sugar.js.feature
 * @type      Feature
 *
 * Add the ability to set links href attribute with "scroll:#target" in order to animate the scroll to this target element
 *
 * @example 	html
 * <a href="scroll:#my-cool-element-id">Scroll to</a>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO tests
(0, _querySelectorLive.default)('[href^="scroll:#"]', $scrollElm => {
  $scrollElm.addEventListener("click", e => {
    e.preventDefault();
    const $target = document.querySelector(`${$scrollElm.getAttribute("href").substr(7)}`);
    if (!$target) return;
    (0, _scrollTo.default)($target, 400, _easeInOutQuint.default);
  });
});