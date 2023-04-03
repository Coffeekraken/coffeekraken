import { __autoResize, __querySelectorLive } from '@coffeekraken/sugar/dom';

/**
 *
 * @name 		autoResize
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add support for "auto-resize" attribute on any textarea, etc...
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __autoResizeFeature()
 *
 * @example       js
 * import { __autoResizeFeature } from '@coffeekraken/sugar/feature';
 * __autoResizeFeature();
 *
 * @example    html
 * <textarea class="s-textarea" auto-resize>
 *    Do something...
 * </textarea>
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function autoResizeFeature() {
    __querySelectorLive('[auto-resize]', async ($elm) => {
        __autoResize($elm);
    });
}
