// @ts-nocheck

/**
 * @name                    remToPx
 * @namespace            js.convert
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          rem           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __remToPx($1)
 *
 * @example         js
 * import { __remToPx } from '@coffeekraken/sugar/convert';
 * __remToPx(2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __remToPx(rem) {
    return (
        rem *
        parseFloat(
            getComputedStyle(document.documentElement).fontSize || '16px',
        )
    );
}
