"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      positionFromEvent
 * @namespace            js.dom.position
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get the position from an event "touchstart", "touchmove", "touchend", "mousedown", "mousemove" or "mouseup".
 *
 * @param 		{MouseEvent|TouchEvent} 					e  		The event to get the position from
 * @return 		{x: number; y: number;} 									The absolute position of the event
 *
 * @snippet         __positionFromEvent($1);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __positionFromEvent } from '@coffeekraken/sugar/dom'
 * __positionFromEvent(e);
 * // output : { x, 230, y: 122 }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __positionFromEvent(e) {
    let x, y;
    if (e.type == 'touchstart' ||
        e.type == 'touchmove' ||
        e.type == 'touchend' ||
        e.type == 'touchcancel') {
        // @ts-ignore
        const evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    }
    else if (e.type == 'mousedown' ||
        e.type == 'mouseup' ||
        e.type == 'mousemove' ||
        e.type == 'mouseover' ||
        e.type == 'mouseout' ||
        e.type == 'mouseenter' ||
        e.type == 'mouseleave') {
        // @ts-ignore
        x = e.clientX;
        // @ts-ignore
        y = e.clientY;
    }
    return {
        x,
        y,
    };
}
exports.default = __positionFromEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FBQyxDQUEwQjtJQUlsRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDVCxJQUNJLENBQUMsQ0FBQyxJQUFJLElBQUksWUFBWTtRQUN0QixDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVc7UUFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLElBQUksYUFBYSxFQUN6QjtRQUNFLGFBQWE7UUFDYixNQUFNLEdBQUcsR0FDTCxPQUFPLENBQUMsQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDakUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2hCLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ25CO1NBQU0sSUFDSCxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVc7UUFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTO1FBQ25CLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVztRQUNyQixDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVc7UUFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLElBQUksWUFBWTtRQUN0QixDQUFDLENBQUMsSUFBSSxJQUFJLFlBQVksRUFDeEI7UUFDRSxhQUFhO1FBQ2IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDZCxhQUFhO1FBQ2IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDakI7SUFDRCxPQUFPO1FBQ0gsQ0FBQztRQUNELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQW5DRCxzQ0FtQ0MifQ==