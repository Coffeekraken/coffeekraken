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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __positionFromEvent } from '@coffeekraken/sugar/dom'
 * __positionFromEvent(e);
 * // output : { x, 230, y: 122 }
 *
 @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsbUJBQW1CLENBQUMsQ0FBMEI7SUFJbEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsSUFDSSxDQUFDLENBQUMsSUFBSSxJQUFJLFlBQVk7UUFDdEIsQ0FBQyxDQUFDLElBQUksSUFBSSxXQUFXO1FBQ3JCLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVTtRQUNwQixDQUFDLENBQUMsSUFBSSxJQUFJLGFBQWEsRUFDekI7UUFDRSxhQUFhO1FBQ2IsTUFBTSxHQUFHLEdBQ0wsT0FBTyxDQUFDLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztLQUNuQjtTQUFNLElBQ0gsQ0FBQyxDQUFDLElBQUksSUFBSSxXQUFXO1FBQ3JCLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUztRQUNuQixDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVc7UUFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxXQUFXO1FBQ3JCLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVTtRQUNwQixDQUFDLENBQUMsSUFBSSxJQUFJLFlBQVk7UUFDdEIsQ0FBQyxDQUFDLElBQUksSUFBSSxZQUFZLEVBQ3hCO1FBQ0UsYUFBYTtRQUNiLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2QsYUFBYTtRQUNiLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ2pCO0lBQ0QsT0FBTztRQUNILENBQUM7UUFDRCxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFuQ0Qsc0NBbUNDIn0=