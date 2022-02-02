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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _isUserScrolling = false, _userScrollingTimeout;
document.addEventListener('wheel', (e) => {
    _isUserScrolling = true
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