/**
 * @name            readCssDataFrom
 * @namespace       js.dom.css
 * @type             Function
 * @platform          js
 * @status           stable
 *
 * This function allows you to read some JSON data from the ":before|:after" pseudo class in the "content" property.
 *
 * @param       {HTMLElement}           [$elm=document.body]        The element from which to get data
 *
 * @snippet         __readCssDataFrom(document.body)
 *
 * @example         js
 * import { __readCssDataFrom } from '@coffeekraken/sugar/dom';
 * const data = __readCssDataFrom();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function readCssDataFrom($elm, settings) {
    const finalSettings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
    let data;
    // get from ":before" first
    const beforeStyle = window.getComputedStyle($elm, '::before');
    if (beforeStyle.content !== 'none') {
        try {
            // @TODO        check why we need to make JSON.parse 2 times...
            data = JSON.parse(JSON.parse(beforeStyle.content));
        }
        catch (e) { }
    }
    // if no data, check in ":after"
    if (!data) {
        const afterStyle = window.getComputedStyle($elm, '::after');
        if (afterStyle.content) {
            try {
                // @TODO        check why we need to make JSON.parse 2 times...
                data = JSON.parse(JSON.parse(afterStyle.content));
            }
            catch (e) { }
        }
    }
    // return the data or an empty object
    return data !== null && data !== void 0 ? data : {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBSUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQ25DLElBQWlCLEVBQ2pCLFFBQXdDO0lBRXhDLE1BQU0sYUFBYSxxQkFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxJQUFJLENBQUM7SUFFVCwyQkFBMkI7SUFDM0IsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM5RCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1FBQ2hDLElBQUk7WUFDQSwrREFBK0Q7WUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7S0FDakI7SUFFRCxnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNQLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLElBQUk7Z0JBQ0EsK0RBQStEO2dCQUMvRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtTQUNqQjtLQUNKO0lBRUQscUNBQXFDO0lBQ3JDLE9BQU8sSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksRUFBRSxDQUFDO0FBQ3RCLENBQUMifQ==