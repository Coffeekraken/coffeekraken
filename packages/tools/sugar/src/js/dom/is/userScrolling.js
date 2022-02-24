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
export default function userScrolling($elm) {
    $elm.addEventListener('mouseover', (e) => {
        $elm._isMouseover = true;
    });
    $elm.addEventListener('mouseout', (e) => {
        $elm._isMouseover = false;
    });
    if ($elm._isMouseover && _isUserScrolling) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclNjcm9sbGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJTY3JvbGxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUscUJBQXFCLENBQUM7QUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JDLGdCQUFnQixHQUFHLElBQUksQ0FBQTtJQUN2QixZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNwQyxxQkFBcUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3BDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLElBQUk7SUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLGdCQUFnQixFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=