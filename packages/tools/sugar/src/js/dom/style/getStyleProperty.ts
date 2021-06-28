// @ts-nocheck

import camelize from '../../../shared/string/camelize';
import autoCast from '../../../shared/string/autoCast';

/**
 * @name      getStyleProperty
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status      beta
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
 * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getStyleProperty(elm: HTMLElement, property: string): any {
  // caching mecanisme
  setTimeout(() => {
    elm._sComputedStyle = null;
  });

  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;

  const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[camelize(`${prefix}${property}`)];
    if (value && value.trim() !== '') return autoCast(value);
  }
  return null;
}
export default getStyleProperty;
