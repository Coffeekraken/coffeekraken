"use strict";
// @ts-nocheck
var _a, _b;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILElBQUksZ0JBQWdCLEdBQUcsS0FBSyxFQUN4Qix1QkFBdUIsQ0FBQztBQUM1QixNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxnQkFBZ0IseURBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3RDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDdEMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsZ0JBQWdCLHlEQUFHLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzVDLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUN4QixZQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN0Qyx1QkFBdUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3RDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQztBQUVILFNBQXdCLGlCQUFpQixDQUFDLElBQUk7SUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxnQkFBZ0IsRUFBRTtRQUM3QyxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWxCRCxvQ0FrQkMifQ==