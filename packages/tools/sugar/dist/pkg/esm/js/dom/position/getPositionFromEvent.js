/**
 * @name      getPositionFromEvent
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
 * import __getPositionFromEvent from '@coffeekraken/sugar/js/dom/position/getPositionFromEvent'
 * __getPositionFromEvent(e);
 * // output : { x, 230, y: 122 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function getPositionFromEvent(e) {
    let x, y;
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
        // @ts-ignore
        const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    }
    else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
        // @ts-ignore
        x = e.clientX;
        // @ts-ignore
        y = e.clientY;
    }
    return {
        x, y
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsb0JBQW9CLENBQUMsQ0FBd0I7SUFDakUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsSUFBRyxDQUFDLENBQUMsSUFBSSxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLGFBQWEsRUFBQztRQUNsRyxhQUFhO1FBQ2IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMzRSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDaEIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDbkI7U0FBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUUsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUUsWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUUsWUFBWSxFQUFFO1FBQzVLLGFBQWE7UUFDYixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNkLGFBQWE7UUFDYixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUNqQjtJQUNELE9BQU87UUFDSCxDQUFDLEVBQUUsQ0FBQztLQUNQLENBQUM7QUFDTixDQUFDIn0=