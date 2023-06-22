import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaFieldsetLegend
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that each <fieldset> tags have a proper <legend> into it
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaFieldsetLegend',
        name: 'Aria fieldset legend',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Each `<fieldset>` elements should have a proper `<legend>` into it',
        level: 1,
        check({ $context }) {
            const $fieldsets = Array.from(
                $context.querySelectorAll('fieldset:not(:has(> legend))') ?? [],
            );
            if ($fieldsets.length) {
                return {
                    status: 'warning',
                    message:
                        'Your `<fieldset>` tags should have a proper `<legend>` into it',
                    example:
                        '<fieldset\n<legend>My cool form</legend>\n</fieldset>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    action: {
                        label: () => `Log them (${$fieldsets.length})`,
                        handler: () => {
                            $fieldsets.forEach(($elm) => {
                                console.log($elm);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$fieldsets.length})`,
                    handler: () => {
                        $fieldsets.forEach(($elm) => {
                            console.log($elm);
                        });
                    },
                },
            };
        },
    };
}
