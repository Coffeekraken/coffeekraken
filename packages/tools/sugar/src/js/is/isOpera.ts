// @ts-nocheck

/**
 * @name        isOpera
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is opera, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isOpera()
 *
 * @example 	js
 * import { __isOpera } from '@coffeekraken/sugar/is'
 * if ( __isOpera()) {
 *   // do something cool
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isOpera(ua: string = navigator.userAgent): boolean {
    return ua.toLowerCase().indexOf('op') > -1;
}
