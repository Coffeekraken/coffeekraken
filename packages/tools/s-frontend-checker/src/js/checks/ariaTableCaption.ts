import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaTableCaption
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that each <table> tags have a proper <legend> into it
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaTableCaption',
        name: 'Aria table caption',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Each `<table>` elements should have a proper `<caption>` into it',
        level: 1,
        check({ $context }) {
            const $tables = Array.from(
                $context.querySelectorAll('table:not(:has(> caption))') ?? [],
            );
            if ($tables.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message:
                        'Your `<table>` tags should have a proper `<legend>` into it',
                    example:
                        '<table\n<caption>My cool table</caption>\n</table>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    elements: $tables,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $tables,
            };
        },
    };
}
