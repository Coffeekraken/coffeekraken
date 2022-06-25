// @ts-nocheck

/**
 * @name              alpha2Hex
 * @namespace            js.color
 * @type              Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Take alpha (0-1) and convert it to hex like "FF", "80", etc...
 *
 * @param       {Number}            alpha           The alpha to convert to hex (0-1)
 * @return          {String}                        The hex string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import alpha2Hex from '@coffeekraken/sugar/js/color/alpha2Hex';
 * alpha2Hex(1); // FF
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function alpha2Hex(alpha: number): string {
    const _opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
    return _opacity.toString(16);
}
