// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __isInViewport from '../isInViewport';
import __whenInViewport from '../whenInViewport';
import __whenOutOfViewport from '../whenOutOfViewport';
/**
 * @name      inViewportStatusChange
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform        js
 * @status        beta
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
 * inViewportStatusChange(myElm).on('enter', $elm => {
 *    // do something...
 * }).on('exit', $elm => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRTdGF0dXNDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxtQkFBbUIsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxJQUFJO0lBQ2xDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixPQUFPLElBQUksVUFBVSxDQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNYLFNBQVMsT0FBTztZQUNkLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksVUFBVTtvQkFBRSxPQUFPO2dCQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNwQixRQUFRLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELFNBQVMsUUFBUTtZQUNmLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksVUFBVTtvQkFBRSxPQUFPO2dCQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsRUFBRSxDQUFDO1NBQ1o7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDLEVBQ0Q7UUFDRSxFQUFFLEVBQUUsd0JBQXdCO0tBQzdCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsc0JBQXNCLENBQUMifQ==