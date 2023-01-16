/**
 * @name            setCookie
 * @namespace       js.cookie
 * @type            Function
 * @status          stable
 *
 * Set a cookie
 *
 * @param       {String}            name            The name of the cookie to set
 * @param       {Any}               value           The cookie value to set
 * @param       {Partial<ISetCookieOptions>}        [options={}]        Some options to configure your cookie
 *
 * @example         js
 * import { __setCookie } from '@coffeekraken/sugar/cookie';
 * __setCookie('myCookie', 'hello world');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISetCookieOptions {
    path: string;
    domain: string;
    expires: string;
    'max-age': number;
    secure: boolean;
    samesite: boolean | 'strict' | 'lax';
    httpOnly: boolean;
}

export default function __setCookie(
    name: string,
    value: any,
    options: Partial<ISetCookieOptions> = {},
): void {
    options = {
        path: '/',
        // add other defaults here if necessary
        ...options,
    };

    try {
        value = JSON.stringify(value);
    } catch (e) {}

    // @ts-ignore
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
