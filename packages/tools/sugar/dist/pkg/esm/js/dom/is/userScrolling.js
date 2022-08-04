// @ts-nocheck
/**
 * @name      userScrolling
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
 * import __isUserScrolling from '@coffeekraken/sugar/js/dom/is/userScrolling'
 * if (__isUserScrolling(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _isUserScrolling = false, _userScrollingTimeout;
document.addEventListener('wheel', (e) => {
    _isUserScrolling = true;
    clearTimeout(_userScrollingTimeout);
    _userScrollingTimeout = setTimeout(() => {
        _isUserScrolling = false;
    }, 200);
});
document.addEventListener('touchmove', (e) => {
    _isUserScrolling = true;
    clearTimeout(_userScrollingTimeout);
    _userScrollingTimeout = setTimeout(() => {
        _isUserScrolling = false;
    }, 200);
});
export default function userScrolling($elm) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILElBQUksZ0JBQWdCLEdBQUcsS0FBSyxFQUN4QixxQkFBcUIsQ0FBQztBQUMxQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDckMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3BDLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDcEMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3pDLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUN4QixZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNwQyxxQkFBcUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3BDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLElBQUk7SUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxnQkFBZ0IsRUFBRTtRQUM3QyxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9