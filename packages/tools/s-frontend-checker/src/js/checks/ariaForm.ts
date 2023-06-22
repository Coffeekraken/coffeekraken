import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaForm
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if each forms have correct aria-label / arial-labelled-by
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaForm',
        name: 'Aria form',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Each forms must have an "aria-label" or an "aria-labelledby" attribute',
        level: 1,
        check({ $context }) {
            const $forms = Array.from(
                $context.querySelectorAll(
                    'form:not([aria-label],[aria-labelledby])',
                ) ?? [],
            );
            if ($forms.length) {
                return {
                    status: 'warning',
                    message: 'Some forms are not aria compliant',
                    example:
                        '<form aria-label="Register to the event">...</form>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/form.html',
                    action: {
                        label: () => `Log them (${$forms.length})`,
                        handler: () => {
                            $forms.forEach(($form) => {
                                console.log($form);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
