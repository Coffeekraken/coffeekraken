// @ts-nocheck

/**
 * @name      isInIframe
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the page is loaded inside an iframe
 *
 * @return    {Boolean}    true if in iframe, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isInIframe } from '@coffeekraken/sugar/dom'
 * if (__isInIframe()) {
 *   // do something
 * }
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isInIframe(): boolean {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
