// @ts-nocheck

import __uncamelize from '../../../shared/string/uncamelize';
import __styleString2Object from '../styleString2Object';
import __styleObject2String from '../styleObject2String';

/**
 * @name      style
 * @namespace            js.dom.style
 * @type      Function
 * @platform      js
 * @status        beta
 *
 * Set or remove a css style property on an HTMLElement
 *
 * @param 		{HTMLElement} 			elm 			The element to process
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(Object) 								The element applied style
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import style from '@coffeekraken/sugar/js/dom/style'
 * style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function style(elm: HTMLElement, styleObj: any): any {
  // convert style string to object
  const styleAttr = elm.getAttribute('style');

  if (styleAttr) {
    styleObj = {
      ...__styleString2Object(styleAttr),
      ...styleObj
    };
  }

  // apply the style to the element
  // elm.setAttribute('style', __styleObject2String(current.styleObj));
  elm.style.cssText = __styleObject2String(styleObj);

  // return the style
  return elm.style;
}
export default style;
