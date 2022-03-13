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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UG9zaXRpb25Gcm9tRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQb3NpdGlvbkZyb21FdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLENBQXdCO0lBQ2pFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNULElBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxXQUFXLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxhQUFhLEVBQUM7UUFDbEcsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDM0UsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2hCLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ25CO1NBQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVcsSUFBRyxDQUFDLENBQUMsSUFBSSxJQUFFLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFFLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFFLFlBQVksRUFBRTtRQUM1SyxhQUFhO1FBQ2IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDZCxhQUFhO1FBQ2IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDakI7SUFDRCxPQUFPO1FBQ0gsQ0FBQyxFQUFFLENBQUM7S0FDUCxDQUFDO0FBQ04sQ0FBQyJ9