/**
 * @name            getCookie
 * @namespace       js.cookie
 * @type            Function
 * @status          stable
 *
 * Get a cookie value
 *
 * @param       {String}            name            The cookie name to get
 * @return      {any}                               The cookie value
 *
 * @example         js
 * import { __getCookie } from '@coffeekraken/sugar/cookie';
 * __getCookie('myCookie');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getCookie(name) {
    let matches = document.cookie.match(new RegExp('(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'));
    let value;
    if (matches === null || matches === void 0 ? void 0 : matches[1]) {
        value = decodeURIComponent(matches[1]);
        try {
            value = JSON.parse(value);
        }
        catch (e) { }
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLElBQVk7SUFDNUMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQy9CLElBQUksTUFBTSxDQUNOLFVBQVU7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sQ0FBQztRQUNwRCxVQUFVLENBQ2pCLENBQ0osQ0FBQztJQUVGLElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDZCxLQUFLLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSTtZQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtLQUNqQjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==