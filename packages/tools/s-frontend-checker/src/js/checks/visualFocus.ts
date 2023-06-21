import { __wait } from '@coffeekraken/sugar/datetime';

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

export default function (__SFrontendChecker) {
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

            // @ts-ignore
            for (let [idx, $focusable] of $focusables.entries()) {
                const style = Object.assign(
                        {},
                        window.getComputedStyle($focusable),
                    ),
                    styleAfter = Object.assign(
                        {},
                        window.getComputedStyle($focusable, ':after'),
                    ),
                    styleBefore = Object.assign(
                        {},
                        window.getComputedStyle($focusable, ':before'),
                    );

                $focusable.focus();
                await __wait();

                const focusStyle = Object.assign(
                        {},
                        window.getComputedStyle($focusable),
                    ),
                    focusStyleAfter = Object.assign(
                        {},
                        window.getComputedStyle($focusable, ':after'),
                    ),
                    focusStyleBefore = Object.assign(
                        {},
                        window.getComputedStyle($focusable, ':before'),
                    );

                if (
                    JSON.stringify(focusStyle) === JSON.stringify(style) &&
                    JSON.stringify(focusStyleBefore) ===
                        JSON.stringify(styleBefore) &&
                    JSON.stringify(focusStyleAfter) ===
                        JSON.stringify(styleAfter)
                ) {
                    _console.log(
                        $focusable,
                        style.animation,
                        focusStyle.animation,
                    );

                    // restore focus
                    // @ts-ignore
                    $focusdElement?.focus?.();

                    return {
                        status: 'warning',
                        message: `The \`${$focusable.outerHTML}\` does not have any focused visual display`,
                        example: null,
                        moreLink:
                            'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                        action: {
                            label: () => `Log it`,
                            handler: () => console.log($focusable),
                        },
                    };
                }
            }

            // restore focus
            // @ts-ignore
            $focusdElement?.focus?.();

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
