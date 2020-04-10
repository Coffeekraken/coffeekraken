import __removeClassesOnAnimationEnd from "./removeClassOnAnimationEnd";
/**
 * @name        addAnimationClass
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Add a class that trigger an animation and remove it at the end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|Array}    cls    The class or classes (Array) to apply
 * @return    {Promise}               A promise that will be resolved once the class have been removed and the animation finished
 *
 * @example    js
 * import addAnimationClass from '@coffeekraken/sugar/js/dom/addAnimationClass'
 * addAnimationClass(myElm, 'my-cool-class').then($elm => {
 *    // do something at the animation end...
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function addAnimationClass($elm, cls) {
  // make sure the cls argument is an Array
  if (!Array.isArray(cls)) cls = [cls];
  // add the class to the element
  cls.forEach(_cls => {
    $elm.classList.add(_cls);
  });
  // remove the class at the end of the animation
  return __removeClassesOnAnimationEnd($elm, cls);
}
