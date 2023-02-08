/**
 * @name            getCookie
 * @namespace       js.cookie
 * @type            Function
 * @platform        js
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxJQUFZO0lBQzVDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUMvQixJQUFJLE1BQU0sQ0FDTixVQUFVO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUM7UUFDcEQsVUFBVSxDQUNqQixDQUNKLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQztJQUVWLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ2QsS0FBSyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUk7WUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7S0FDakI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=