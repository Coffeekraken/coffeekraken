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
function __isUserScrolling($elm) {
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
exports.default = __isUserScrolling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILElBQUksZ0JBQWdCLEdBQUcsS0FBSyxFQUN4Qix1QkFBdUIsQ0FBQztBQUM1QixJQUFJO0lBQ0EsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsZ0JBQWdCLHlEQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3hDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixZQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN0Qyx1QkFBdUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3RDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUVILE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGdCQUFnQix5REFBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM1QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdEMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUN0QyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZCxTQUF3QixpQkFBaUIsQ0FBQyxJQUFJO0lBQzFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtRQUN2QyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxnQkFBZ0IsQ0FBQztLQUN0RDtJQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUMsa0JBQWtCLElBQUksZ0JBQWdCLENBQUM7QUFDdkQsQ0FBQztBQW5CRCxvQ0FtQkMifQ==