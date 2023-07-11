import type { ISFrontendChecker } from '../types.js';

/**
 * @name            ariaLabelForm
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all <label> tags contains a descriptive text or at least a valid aria-labelledby attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaLabelForm',
        name: 'Aria label form',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check that the `<label>` tags contains a descriptive text or a valid `aria-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $labels = Array.from(
                $context.querySelectorAll('label') ?? [],
            );

            if (!$labels.length) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            }

            for (let [idx, $label] of $labels.entries()) {
                // @ts-ignore
                if (
                    ($label.querySelector('input,select,textarea') &&
                        $label.childNodes.length === 1) ||
                    ($label.hasAttribute('for') &&
                        !$context.querySelector(
                            `#${$label.getAttribute('for')}`,
                        ))
                ) {
                    return {
                        status: __SFrontendChecker.STATUS_WARNING,
                        message:
                            'A `<label>` tag must contain at least a descriptive text',
                        example:
                            '<label>\n<input type="text" />\nEnter your name</label>',
                        moreLink:
                            'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                        elements: $labels,
                    };
                }
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $labels,
            };
        },
    };
}
