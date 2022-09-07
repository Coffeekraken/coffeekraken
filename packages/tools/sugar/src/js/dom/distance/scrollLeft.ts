// @ts-nocheck

/**
 * @name      scrollLeft
 * @namespace            js.dom.distance
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Get the amount of scroll left
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __scrollLeft } from '@coffeekraken/sugar/dom'
 * __scrollLeft() // 40
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
export default function __scrollLeft(): number {
    return (
        window.pageXOffset || document.scrollLeft || document.body.scrollLeft
    );
}
