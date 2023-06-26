import { __wait } from '@coffeekraken/sugar/datetime';

import type { ISFrontendChecker } from '../types';

import { __injectStyle } from '@coffeekraken/sugar/dom';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name            visualFocus
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all focusable elements have a visual state setted
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

let _$styles: HTMLStyleElement[] = [];

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'visualFocus',
        name: 'Visual focus',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check that all focusable elements have a visual state setted',
        lazy: true,
        level: __SFrontendChecker.LEVEL_HIGH,
        async check({ $context }) {
            const $focusables = Array.from(
                $context.querySelectorAll(
                    ':is([tabindex], button, input, select, a[href]):not([tabindex="-1"])',
                ) ?? [],
            );

            const $nonVisualFocusElements: HTMLElement[] = [];

            // remove old styles
            _$styles = _$styles.filter(($style) => {
                $style.remove();
                return false;
            });

            // @ts-ignore
            for (let [idx, $focusable] of $focusables.entries()) {
                // make sure the container has a s-frontend-checker-id
                if (!$focusable.hasAttribute('s-frontend-checker-id')) {
                    $focusable.setAttribute(
                        's-frontend-checker-id',
                        __uniqid(),
                    );
                }

                const style = JSON.stringify(
                        window.getComputedStyle($focusable),
                    ),
                    styleAfter = JSON.stringify(
                        window.getComputedStyle($focusable, ':after'),
                    ),
                    styleBefore = JSON.stringify(
                        window.getComputedStyle($focusable, ':before'),
                    );

                $focusable.focus();
                await __wait();

                const focusStyle = JSON.stringify(
                        window.getComputedStyle($focusable),
                    ),
                    focusStyleAfter = JSON.stringify(
                        window.getComputedStyle($focusable, ':after'),
                    ),
                    focusStyleBefore = JSON.stringify(
                        window.getComputedStyle($focusable, ':before'),
                    );

                if (
                    focusStyle === style &&
                    focusStyleBefore === styleBefore &&
                    focusStyleAfter === styleAfter
                ) {
                    $nonVisualFocusElements.push($focusable);

                    const id = $focusable.getAttribute('s-frontend-checker-id');
                    const $style = __injectStyle(
                        `
                    [s-frontend-checker-id="${id}"] {
                        position: ${
                            $focusable.style.position !== ''
                                ? $focusable.style.position
                                : 'relative'
                        }
                    }
                    [s-frontend-checker-id="${id}"]:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        border: 5px dotted #ff0000;
                    }
                    `,
                        {
                            // @ts-ignore
                            rootNode: $context.head ?? $context,
                        },
                    );

                    // add this style tag to the styles stack to remove them at each check start
                    _$styles.push($style);

                    await __wait();
                }
            }

            // restore focus
            // @ts-ignore
            // $focusdElement?.focus?.();
            window.parent.scrollTo(0, 0);

            if ($nonVisualFocusElements.length) {
                return {
                    status: 'warning',
                    message: `Some interactive elements does not have any focused visual display`,
                    example: null,
                    moreLink:
                        'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                    action: {
                        label: () =>
                            `Log them (${$nonVisualFocusElements.length})`,
                        handler: () =>
                            $nonVisualFocusElements.forEach(($elm) =>
                                console.log($elm),
                            ),
                    },
                };
            }

            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$focusables.length})`,
                    handler: () => console.log($focusables),
                },
            };
        },
    };
}
