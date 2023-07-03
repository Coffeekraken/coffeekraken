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
 * @snippet         __realHeight($1)
 *
 * @example     js
 * import { __realHeight } from '@coffeekraken/sugar/dom';
 * __realHeight(myCoolHtmlElement);
 *
 * @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsR0FBZ0I7SUFDakQscUNBQXFDO0lBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUM5QixHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDL0IsaURBQWlEO0lBQ2pELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDaEMsc0JBQXNCO0lBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDMUIsb0JBQW9CO0lBQ3BCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==