import __wait from '../../shared/datetime/wait.js';
import __querySelectorLive from '../dom/query/querySelectorLive.js';

/**
 * @name 		confirmButton
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add support for "confirm" attribute on any button, link, etc...
 * This will maintain a property on the element itself called "needConfirmation".
 * In your "pointerup" handler, you can then check if the button has been confirmed by using
 * `e.currentTarget.needConfirmation`. You can then make whatever you need with that...
 * Note that the `@sugar.ui.button` postcss mixin support this `confirm="Confirm?" attribute visually.
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __confirmButtonFeature()
 *
 * @example       js
 * import { __confirmButtonFeature } from '@coffeekraken/sugar/feature';
 * __confirmButtonFeature();
 *
 * @example    html
 * <button class="s-btn" confirm="Confirm?">
 *    Do something...
 * </button>
 *
 * @example     js
 * $myButton.addEventListener('pointerup', e => {
 *   if (e.needConfirmation) {
 *      return;
 *   }
 *   // handle your action here...
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function confirmButtonFeature() {
    __querySelectorLive('[confirm]', async ($btn) => {
        if ($btn.needConfirmation !== undefined) {
            return;
        }
        $btn._isConfirmedStatus = undefined;
        $btn.needConfirmation = true;

        await __wait(100); // avoid css issues

        const buttonElmStyle = window.getComputedStyle($btn),
            buttonWidth = buttonElmStyle.width,
            confirmElmStyle = window.getComputedStyle($btn, ':after'),
            confirmWidth = `${parseInt(confirmElmStyle.width) + 10}px`; // add 4 just in case

        // set size
        $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);

        $btn.addEventListener('pointerdown', (e) => {
            if ($btn._isConfirmedStatus === undefined) {
                $btn._isConfirmedStatus = false;
                $btn.style.setProperty('--s-btn-confirm-width', confirmWidth);
            } else if ($btn._isConfirmedStatus === false) {
                setTimeout(() => {
                    $btn.style.setProperty(
                        '--s-btn-confirm-width',
                        buttonWidth,
                    );
                }, 100);
                $btn._isConfirmedStatus = true;
                $btn.needConfirmation = false;
            }
        });
        $btn.addEventListener('blur', (e) => {
            setTimeout(() => {
                $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
            }, 100);
            $btn._isConfirmedStatus = undefined;
        });
        $btn.addEventListener('pointerup', (e) => {
            setTimeout(() => {
                if ($btn._isConfirmedStatus === true) {
                    $btn.blur();
                    $btn._isConfirmedStatus = undefined;
                    $btn.needConfirmation = true;
                }
            });
        });
    });
}
