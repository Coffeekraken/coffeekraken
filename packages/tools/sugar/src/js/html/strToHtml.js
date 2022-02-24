// @ts-nocheck
/**
 * @name        strToHtml
 * @namespace            js.html
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the html (dom) version of a string
 *
 * @param    {HTMLElement}    html    The string to convert to dom nodes
 * @return    {HTMLElement}    The dom nodes representation of the passed string
 * *
 * @example    js
 * import strToHtml from '@coffeekraken/sugar/js/html/strToHtml'
 * const myString = '<p>Hello World</p>'
 * strToHtml(myString) // <p>Hello World</p>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function strToHtml(string) {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.innerHTML = string;
        if (cont.children.length === 1) {
            return cont.children[0];
        }
        else {
            return cont;
        }
    }
    return string;
}
export default strToHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyVG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyVG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQVMsU0FBUyxDQUFDLE1BQWM7SUFDN0IsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==