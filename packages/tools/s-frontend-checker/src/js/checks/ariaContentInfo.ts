import type { ISFrontendChecker } from '../types.js';

/**
 * @name            ariaContentInfo
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 *
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaContentInfo',
        name: 'Aria content info',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'A <footer> tag should exist as a top level (not inside an article, aside, main, nav or section tag)',
        level: 1,
        check({ $context }) {
            const $footer = $context.querySelectorAll(
                'footer:not(article footer, aside footer, main footer, nav footer, section footer)',
            );

            if (!$footer) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Missing <footer> top level tag',
                    example:
                        '<body>\n&nbsp;&nbsp;<footer>...</footer>\n...\n</body>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html',
                };
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
