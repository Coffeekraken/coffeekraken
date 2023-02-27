// @ts-nocheck

/**
 * @name        isFirefox
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is firefox
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is firefox, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isFirefox()
 *
 * @example 	js
 * import { __isFirefox } from '@coffeekraken/sugar/is'
 * if (__isFirefox()) {
 *   // do something cool
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isFirefox(ua: string = navigator.userAgent): boolean {
    return ua.indexOf('Firefox') > -1;
}
