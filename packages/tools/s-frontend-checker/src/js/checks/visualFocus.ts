import { __wait } from '@coffeekraken/sugar/datetime';

import type { ISFrontendChecker } from '../types';

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

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'visualFocus',
        name: 'Visual focus',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check that all focusable elements have a visual state setted',
        level: 1,
        async check({ $context }) {
            const $focusdElement = (window.parent ?? window).document
                .activeElement;

            const $focusables = Array.from(
                $context.querySelectorAll(
                    ':is([tabindex], button, input, select, a[href]):not([tabindex="-1"])',
                ) ?? [],
            );

            const $nonVisualFocusElements: HTMLElement[] = [];

            // @ts-ignore
            for (let [idx, $focusable] of $focusables.entries()) {
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
