import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaButtonLabel
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that the buttons (input[type="submit"]) have a proper descriptive value or at least an aria-label attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaButtonLabel',
        name: 'Aria button label',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check that the buttons (input[type="submit"]) have a proper descriptive value or at least an aria-label attribute',
        level: 1,
        check({ $context }) {
            const $buttons = Array.from(
                $context.querySelectorAll(
                    'button, input[type="submit"], input[type="button"]',
                ) ?? [],
            );
            if ($buttons.length) {
                // @ts-ignore
                for (let [idx, $button] of $buttons.entries()) {
                    if (!$button.hasAttribute('aria-label')) {
                        const innerText = $button.innerText.trim();
                        if (
                            innerText === '' ||
                            (innerText.split(' ') === 1 && innerText.length < 3)
                        ) {
                            return {
                                status: 'warning',
                                message: `Your \`${$button.outerHTML}\` button does not have a proper descriptive label or content`,
                                example: '<button>Send my info</button>',
                                moreLink:
                                    'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                                action: {
                                    label: () =>
                                        `Log them (${$buttons.length})`,
                                    handler: () => {
                                        $buttons.forEach(($button) => {
                                            console.log($button);
                                        });
                                    },
                                },
                            };
                        }
                    }
                }
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$buttons.length})`,
                    handler: () => {
                        $buttons.forEach(($button) => {
                            console.log($button);
                        });
                    },
                },
            };
        },
    };
}
