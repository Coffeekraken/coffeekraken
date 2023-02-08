/**
 * @name            setCookie
 * @namespace       js.cookie
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Set a cookie
 *
 * @param       {String}            name            The name of the cookie to set
 * @param       {Any}               value           The cookie value to set
 * @param       {Partial<ISetCookieSettings>}        [settings={}]        Some settings to configure your cookie
 *
 * @setting         {String}        [path="/"]            The path of the cookie to store
 * @setting         {String}        [domain=null]           The domain on which to store the cookie
 * @setting         {String}        [expires=null]          The date when the cookie expires
 * @setting         {Number}        [max-age=null]          The number of seconds until the cookie expires
 * @setting         {Boolean}       [secure=null]           Specify if the cookie is available only on HTTPS or not
 * @setting         {Boolean | 'strict' | 'lax'}        [samesite=null]         Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks (CSRF)
 * @setting         {Boolean}       [httpOnly=null]         Forbids JavaScript from accessing the cookie, for example, through the Document.cookie property.
 *
 * @example         js
 * import { __setCookie } from '@coffeekraken/sugar/cookie';
 * __setCookie('myCookie', 'hello world');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISetCookieSettings {
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
    settings: Partial<ISetCookieSettings> = {},
): void {
    settings = {
        path: '/',
        // add other defaults here if necessary
        ...settings,
    };

    try {
        value = JSON.stringify(value);
    } catch (e) {}

    // @ts-ignore
    if (settings.expires instanceof Date) {
        settings.expires = settings.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in settings) {
        updatedCookie += '; ' + optionKey;
        let optionValue = settings[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
