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
 * @example         js
 * import { __deleteCookie } from '@coffeekraken/sugar/cookie';
 * __deleteCookie('myCookie');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __deleteCookie(name: string): void {
    __setCookie(name, '', {
        'max-age': -1,
    });
}
