import type { ISFrontendChecker } from '../types.js';

/**
 * @name            ariaSearch
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that the search input is inside a role="search" container
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaSearch',
        name: 'Aria search',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'The search form should be marked with the `role="search"` attribute',
        level: 1,
        check({ $context }) {
            const $search = $context.querySelectorAll(
                'input[type="search"]:not([role="search"] input[type="search"])',
            );

            if (!$search) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message:
                        'Search input is not inside a `role="search"` container',
                    example:
                        '<form role="search">\n&nbsp;&nbsp;<input type="search" />\n</form>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html',
                };
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $search,
            };
        },
    };
}
