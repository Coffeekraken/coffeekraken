import __setCookie from './setCookie';
/**
 * @name            deleteCookie
 * @namespace       js.cookie
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Delete a cookie
 *
 * @param       {String}            name            The cookie name to delete
 * @return      {any}                               The cookie value
 *
 * @snippet         __deleteCookie($1)
 *
 * @example         js
 * import { __deleteCookie } from '@coffeekraken/sugar/cookie';
 * __deleteCookie('myCookie');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __deleteCookie(name) {
    __setCookie(name, '', {
        'max-age': -1,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FBQyxJQUFZO0lBQy9DLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDaEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9