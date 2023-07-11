import __isMobile from './isMobile.js';

/**
 * @name        isPhone
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a phone device
 *
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isPhone()
 *
 * @example 	js
 * import { __isPhone } from '@coffeekraken/sugar/is'
 * if (__isPhone()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default __isMobile;
