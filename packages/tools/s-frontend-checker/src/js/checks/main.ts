import type { ISFrontendChecker } from '../types.js';

/**
 * @name            main
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "main" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'main',
        name: 'Main tag',
        description:
            'It\'s recommanded to wrap your main content inside a "main" tag.',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $main = $context.querySelector('main');

            if (!$main) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message:
                        'Your page is missing a proper `<main>` tag to enclose correctly the content',
                    example: '<main id="content">...</main>',
                    moreLink: 'https://www.w3schools.com/tags/tag_main.asp',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $main,
            };
        },
    };
}
