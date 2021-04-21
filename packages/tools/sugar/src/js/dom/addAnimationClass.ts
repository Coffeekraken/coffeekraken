// @ts-nocheck

import __removeClassesOnAnimationEnd from './removeClassOnAnimationEnd';
/**
 * @name        addAnimationClass
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Add a class that trigger an animation and remove it at the end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|Array}    cls    The class or classes (Array) to apply
 * @return    {Promise}               A promise that will be resolved once the class have been removed and the animation finished
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 *
 * @example    js
 * import addAnimationClass from '@coffeekraken/sugar/js/dom/addAnimationClass'
 * addAnimationClass(myElm, 'my-cool-class').then($elm => {
 *    // do something at the animation end...
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function addAnimationClass($elm, cls) {
  // make sure the cls argument is an Array
  if (!Array.isArray(cls)) cls = [cls];
  // add the class to the element
  cls.forEach((_cls) => {
    $elm.classList.add(_cls);
  });
  // remove the class at the end of the animation
  return __removeClassesOnAnimationEnd($elm, cls);
}
export default addAnimationClass;
