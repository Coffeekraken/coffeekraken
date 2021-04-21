// @ts-nocheck

import __getStyleProperty from './getStyleProperty';

/**
 * @name      forceRedraw
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Force the element to be painted again in case of visual issues
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to force the redraw on
 * @return    {HTMLElement}    The HTMLElement to maintain chainability
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import forceRedraw from '@coffeekraken/sugar/js/dom/forceRedraw'
 * forceRedraw($elm)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function forceRedraw($elm) {
  const display = __getStyleProperty($elm, 'display');
  $elm.style.display = 'none';
  $elm.offsetHeight;
  $elm.style.display = display;
  return $elm;
}
export default forceRedraw;
