// @ts-nocheck

import __SPromise from '../promise/SPromise';
import __isInViewport from './isInViewport';
import __whenInViewport from './whenInViewport';
import __whenOutOfViewport from './whenOutOfViewport';

/**
 * @name      inViewportStatusChange
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		{HTMLElement} 						elm  		The element to monitor
 * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
 * inViewportStatusChange(myElm).enter($elm => {
 *    // do something...
 * }).exit($elm => {
 *    // do something...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function inViewportStatusChange($elm) {
  let isFinished = false;

  return new __SPromise(
    ({ emit }) => {
      function _whenIn() {
        __whenInViewport($elm).then(() => {
          if (isFinished) return;
          emit('enter', $elm);
          _whenOut();
        });
      }
      function _whenOut() {
        __whenOutOfViewport($elm).then(() => {
          if (isFinished) return;
          emit('exit', $elm);
          _whenIn();
        });
      }

      // if not in viewport at start
      if (!__isInViewport($elm)) {
        _whenOut();
      } else {
        _whenIn();
      }
    },
    {
      id: 'inViewportStatisChange'
    }
  ).on('finally', () => {
    isFinished = true;
  });
}
export default inViewportStatusChange;
