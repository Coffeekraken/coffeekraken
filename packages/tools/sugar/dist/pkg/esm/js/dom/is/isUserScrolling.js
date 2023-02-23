// @ts-nocheck
var _a, _b;
/**
 * @name      isUserScrolling
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 * @async
 *
 * Check the user is scrolling a particular element
 *
 * @param 		{HTMLElement} 				[$elm=document]  			The element to monitor
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @snippet         __isUserScrolling();
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __isUserScrolling } from '@coffeekraken/sugar/dom'
 * if (__isUserScrolling(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _isUserScrolling = false, _isUserScrollingTimeout;
try {
    (_a = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a === void 0 ? void 0 : _a.call(document, 'wheel', (e) => {
        _isUserScrolling = true;
        clearTimeout(_isUserScrollingTimeout);
        _isUserScrollingTimeout = setTimeout(() => {
            _isUserScrolling = false;
        }, 200);
    });
    (_b = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b === void 0 ? void 0 : _b.call(document, 'touchmove', (e) => {
        _isUserScrolling = true;
        clearTimeout(_isUserScrollingTimeout);
        _isUserScrollingTimeout = setTimeout(() => {
            _isUserScrolling = false;
        }, 200);
    });
}
catch (e) { }
export default function __isUserScrolling($elm) {
    if ($elm._isUserInteractive !== undefined) {
        return $elm._isUserInteractive && _isUserScrolling;
    }
    $elm.addEventListener('mouseover', (e) => {
        $elm._isUserInteractive = true;
    });
    $elm.addEventListener('mouseout', (e) => {
        $elm._isUserInteractive = false;
    });
    $elm.addEventListener('touchstart', (e) => {
        $elm._isUserInteractive = true;
    });
    $elm.addEventListener('touchend', (e) => {
        $elm._isUserInteractive = false;
    });
    return $elm._isUserInteractive && _isUserScrolling;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7O0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILElBQUksZ0JBQWdCLEdBQUcsS0FBSyxFQUN4Qix1QkFBdUIsQ0FBQztBQUM1QixJQUFJO0lBQ0EsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsZ0JBQWdCLHlEQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3hDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixZQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN0Qyx1QkFBdUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3RDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUVILE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGdCQUFnQix5REFBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM1QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdEMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUN0QyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZCxNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUFDLElBQUk7SUFDMUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixJQUFJLGdCQUFnQixDQUFDO0tBQ3REO0lBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxnQkFBZ0IsQ0FBQztBQUN2RCxDQUFDIn0=