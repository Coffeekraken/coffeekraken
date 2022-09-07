"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _isUserScrolling = false, _isUserScrollingTimeout;
document.addEventListener('wheel', (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
        _isUserScrolling = false;
    }, 200);
});
document.addEventListener('touchmove', (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
        _isUserScrolling = false;
    }, 200);
});
function __isUserScrolling($elm) {
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
    if ($elm._isUserInteractive && _isUserScrolling) {
        return true;
    }
    return false;
}
exports.default = __isUserScrolling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLEVBQ3hCLHVCQUF1QixDQUFDO0FBQzVCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNyQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDeEIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDdEMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUN0QyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDekMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3RDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDdEMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBd0IsaUJBQWlCLENBQUMsSUFBSTtJQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLGdCQUFnQixFQUFFO1FBQzdDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBbEJELG9DQWtCQyJ9