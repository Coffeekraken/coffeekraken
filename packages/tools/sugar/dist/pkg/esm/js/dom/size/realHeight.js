// @ts-nocheck
/**
 * @name      realHeight
 * @namespace            js.dom.size
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Return the full height of an element that has maybe a max-height, etc...
 *
 * @param 		{HTMLElement} 		elm 		The element to process
 * @return 		{Number} 						The real height of the element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __realHeight } from '@coffeekraken/sugar/dom';
 * __realHeight(myCoolHtmlElement);
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __realHeight(elm) {
    // apply an overflow-y to the element
    elm.style.transition = 'none';
    elm.style.overflowY = 'scroll';
    // get the actual height through the scrollHeight
    const height = elm.scrollHeight;
    // reset the overflowY
    elm.style.overflowY = '';
    elm.style.transition = '';
    // return the height
    return height;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUFDLEdBQWdCO0lBQ2pELHFDQUFxQztJQUNyQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDOUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQy9CLGlEQUFpRDtJQUNqRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ2hDLHNCQUFzQjtJQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzFCLG9CQUFvQjtJQUNwQixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=