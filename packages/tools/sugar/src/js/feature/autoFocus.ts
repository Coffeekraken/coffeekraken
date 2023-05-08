import { __querySelectorLive } from '@coffeekraken/sugar/dom';

/**
 *
 * @name 		autoFocus
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Make sure your "autofocus" fields works as expected
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __autoFocusFeature()
 *
 * @example       js
 * import { __autoFocusFeature } from '@coffeekraken/sugar/feature';
 * __autoFocusFeature();
 *
 * @example    html
 * <textarea autofocus class="s-textarea">
 *    Do something...
 * </textarea>
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function autoFocusFeature() {
    __querySelectorLive('[autofocus]', ($elm) => {
        document.activeElement?.blur?.();
        setTimeout(() => {
            $elm.focus();
        });
    });
}
