import __SPromise from '../promise/SPromise';
import __isInViewport from './isInViewport';
import __whenInViewport from './whenInViewport';
import __whenOutOfViewport from './whenOutOfViewport';

// TODO tests

/**
 * @name      inViewportStatusChange
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		{HTMLElement} 						elm  		The element to monitor
 * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
 *
 * @example  	js
 * import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
 * inViewportStatusChange(myElm).enter($elm => {
 *    // do something...
 * }).exit($elm => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function inViewportStatusChange($elm) {
  let isFinished = false;

  return new __SPromise(
    (resolve, reject, trigger, cancel) => {
      function _whenIn() {
        __whenInViewport($elm).then(() => {
          if (isFinished) return;
          trigger('enter', $elm);
          _whenOut();
        });
      }
      function _whenOut() {
        __whenOutOfViewport($elm).then(() => {
          if (isFinished) return;
          trigger('exit', $elm);
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
