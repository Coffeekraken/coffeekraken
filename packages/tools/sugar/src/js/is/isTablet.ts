// @ts-nocheck
/**
 * @name        isTablet
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a tablet device
 *
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isTablet } from '@coffeekraken/sugar/is'
 * if (__isTablet()) {
 *   // do something cool...
 * }
 *
 * @see       https://blog.devgenius.io/4-ways-to-detect-mobile-browsers-in-javascript-943b66657524
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isTablet(): boolean {
    // touch event
    if (!('ontouchstart' in document.documentElement)) return false;
    // orientation
    if (window.orientation === undefined) return false;
    // match media
    const minWidth =
            document.env?.SUGAR?.theme?.get('media.queries.tablet.minWidth') ??
            640,
        maxWidth =
            // @ts-ignore
            document.env?.SUGAR?.theme?.get('media.queries.tablet.maxWidth') ??
            1279;
    if (
        !window.matchMedia(
            `only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`,
        ).matches
    ) {
        return false;
    }
    // limited accuracy
    if (!window.matchMedia('(pointer: coarse)').matches) return false;
    // it seems that it's a tablet
    return true;
}
