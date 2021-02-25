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
    return new __SPromise(({ emit }) => {
        function _whenIn() {
            __whenInViewport($elm).then(() => {
                if (isFinished)
                    return;
                emit('enter', $elm);
                _whenOut();
            });
        }
        function _whenOut() {
            __whenOutOfViewport($elm).then(() => {
                if (isFinished)
                    return;
                emit('exit', $elm);
                _whenIn();
            });
        }
        // if not in viewport at start
        if (!__isInViewport($elm)) {
            _whenOut();
        }
        else {
            _whenIn();
        }
    }, {
        id: 'inViewportStatisChange'
    }).on('finally', () => {
        isFinished = true;
    });
}
export default inViewportStatusChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRTdGF0dXNDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxtQkFBbUIsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsc0JBQXNCLENBQUMsSUFBSTtJQUNsQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFdkIsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDWCxTQUFTLE9BQU87WUFDZCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUMvQixJQUFJLFVBQVU7b0JBQUUsT0FBTztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxFQUFFLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxTQUFTLFFBQVE7WUFDZixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLFVBQVU7b0JBQUUsT0FBTztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixRQUFRLEVBQUUsQ0FBQztTQUNaO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQyxFQUNEO1FBQ0UsRUFBRSxFQUFFLHdCQUF3QjtLQUM3QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=