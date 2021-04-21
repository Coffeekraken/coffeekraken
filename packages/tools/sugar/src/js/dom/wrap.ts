// @ts-nocheck

/**
 * @name      wrap
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Wrap an HTMLElement inside another `$wrapper` one
 *
 * @param    {HTMLElement}    $toWrap    The element to wrap
 * @param    {HTMLElement}    $wrapper    The wrapper element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import wrap from '@coffeekraken/sugar/js/dom/wrap'
 * const $wrapper = document.createElement('div')
 * // assuming:
 * // <div>
 * //   <span class="wrap">Hello World</span>
 * // </div>
 * wrap(document.querySelector('.wrap'), $wrapper)
 * // output:
 * // <div>
 * //   <div>
 * //     <span class="wrap">Hello World</span>
 * //   </div>
 * // </div>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function wrap($elm, $wrapper) {
  if (typeof $wrapper === 'string') {
    $wrapper = document.createElement($wrapper);
  }
  const $parent = $elm.parentNode;
  const $sibling = $elm.nextSibling;
  if ($sibling) {
    $parent.insertBefore($wrapper, $sibling);
  } else {
    $parent.appendChild($wrapper);
  }
  return $wrapper.appendChild($elm);
}
export default wrap;
