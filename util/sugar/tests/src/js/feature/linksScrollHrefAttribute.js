import querySelectorLive from "../dom/querySelectorLive";
import scrollTo from "../dom/scrollTo";
import easeInOutQuint from "../easing/easeInOutQuint";

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

querySelectorLive('[href^="scroll:#"]', $scrollElm => {
  $scrollElm.addEventListener("click", e => {
    e.preventDefault();
    const $target = document.querySelector(
      `${$scrollElm.getAttribute("href").substr(7)}`
    );
    if (!$target) return;
    scrollTo($target, 400, easeInOutQuint);
  });
});
