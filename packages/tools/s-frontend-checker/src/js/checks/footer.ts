import type { ISFrontendChecker } from '../types';

/**
 * @name            footer
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "headfooterer" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'footer',
        name: 'Footer tag',
        description:
            'It\'s recommanded to wrap your footer (menu, etc...) inside a "footer" tag.',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $footer = $context.querySelector(
                'footer:not(article footer)',
            );

            if (!$footer) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<footer>...</footer>',
                    moreLink: 'https://www.w3schools.com/tags/tag_footer.asp',
                    action: null,
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
