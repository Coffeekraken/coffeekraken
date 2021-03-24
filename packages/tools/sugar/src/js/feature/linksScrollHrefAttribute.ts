// @ts-nocheck

import querySelectorLive from '../dom/querySelectorLive';
import scrollTo from '../dom/scrollTo';
import easeInOutQuint from '../../shared/easing/easeInOutQuint';

/**
 * @name 		linksScrollHrefAttribute
 * @namespace           sugar.js.feature
 * @type      Feature
 * @stable
 *
 * Add the ability to set links href attribute with "scroll:#target" in order to animate the scroll to this target element
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}       [duration=400]       Specify the scroll duration
 * @setting       {Function}      [easing=easeInOutQuint]     Specify the easing function to use
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 *
 * @example     js
 * import linksScrollHrefAttribute from '@coffeekraken/sugar/js/feature/linksScrollHrefAttribute';
 * linksScrollHrefAttribute();
 *
 * @example 	html
 * <a scroll href="#my-cool-element-id">Scroll to</a>
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function linksScrollHrefAttribute(settings = {}) {
  settings = {
    duration: 400,
    easing: easeInOutQuint,
    ...settings
  };
  querySelectorLive('[href^="#"][scroll]', ($scrollElm) => {
    $scrollElm.addEventListener('click', (e) => {
      e.preventDefault();
      const $target = document.querySelector(
        `${$scrollElm.getAttribute('href')}`
      );
      if (!$target) return;
      scrollTo($target, settings.duration, settings.easing);
    });
  });
}
export default linksScrollHrefAttribute;
