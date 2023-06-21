/**
 * @name            ariaLabelledBy
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all the element that uses the `aria-labelledby` attributes points to an existing element
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaLabelledBy',
        name: 'Aria labelledby',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check that all the element that uses the `aria-labelledby` attributes points to an existing element',
        level: 1,
        check({ $context }) {
            const $elements = Array.from(
                $context.querySelectorAll('[aria-labelledby]') ?? [],
            );

            if ($elements.length) {
                // @ts-ignore
                for (let [idx, $elm] of $elements.entries()) {
                    if (
                        !$context.querySelector(
                            `#${$elm.getAttribute('aria-labelledby')}`,
                        )
                    ) {
                        return {
                            status: 'warning',
                            message:
                                'Some `[aria-labelledby]` elements points to none existant element',
                            example: null,
                            moreLink:
                                'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                            action: {
                                label: () => `Log them (${$elements.length})`,
                                handler: () => console.log($elements),
                            },
                        };
                    }
                }
            }

            return {
                status: 'success',
            };
        },
    };
}
