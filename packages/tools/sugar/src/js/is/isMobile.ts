/**
 * @name        isMobile
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @feature         Take the theme.media.queries.mobile.maxWidth in consideration if accessible
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isMobile } from 'coffeekraken/sugar/is'
 * if (__isMobile()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isMobile(): boolean {
    // touch event
    if (!('ontouchstart' in document.documentElement)) return false;
    // orientation
    if (window.orientation === undefined) return false;
    // match media
    const maxWidth =
        // @ts-ignore
        document.env?.SUGAR?.theme?.get('media.queries.mobile.maxWidth') ?? 639;
    if (
        !window.matchMedia(`only screen and (max-width: ${maxWidth}px)`).matches
    ) {
        return false;
    }
    // limited accuracy
    if (!window.matchMedia('(pointer: coarse)').matches) return false;
    // it seems that it's a mobile
    return true;
}
