// @ts-nocheck

import __addEventListenerOnce from './addEventListenerOnce';
import __SPromise from '../promise/SPromise';

/**
 * @name      removeClassOnAnimationEnd
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Remove some class on animation end
 *
 * @param    {HTMLElement}    elm    The element to take care of
 * @param    {String|Array}    class    The class or classes (Array) to remove
 * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
 * removeClassOnAnimationEnd(myCoolElm, 'my-class');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function removeClassOnAnimationEnd($elm, cls) {
  return new __SPromise(
    (resolve, reject, trigger, cancel) => {
      // listen for animation end on the element just once
      __addEventListenerOnce($elm, 'animationend', (e) => {
        if (!Array.isArray(cls)) cls = [cls];
        // remove the cls
        cls.forEach((_cls) => {
          $elm.classList.remove(_cls);
        });
        // resolve the process
        resolve(e);
      });
    },
    {
      id: 'removeClassOnAnimationEnd'
    }
  );
}
export = removeClassOnAnimationEnd;