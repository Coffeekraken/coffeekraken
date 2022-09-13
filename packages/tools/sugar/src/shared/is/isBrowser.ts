// @ts-nocheck

/**
 * @name        isBrowser
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the script is running inside a browser or not
 *
 * @return   {Boolean}   true if it's in a browser, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isBrowser } from '@coffeekraken/sugar/is'
 * if (__isBrowser() {
 *   // do something
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isBrowser() {
    return typeof window !== 'undefined';
}
