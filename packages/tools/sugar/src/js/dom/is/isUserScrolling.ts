// @ts-nocheck

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
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _isUserScrolling = false,
    _isUserScrollingTimeout;
try {
    document?.addEventListener?.('wheel', (e) => {
        _isUserScrolling = true;
        clearTimeout(_isUserScrollingTimeout);
        _isUserScrollingTimeout = setTimeout(() => {
            _isUserScrolling = false;
        }, 200);
    });

    document?.addEventListener?.('touchmove', (e) => {
        _isUserScrolling = true;
        clearTimeout(_isUserScrollingTimeout);
        _isUserScrollingTimeout = setTimeout(() => {
            _isUserScrolling = false;
        }, 200);
    });
} catch (e) {}

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
