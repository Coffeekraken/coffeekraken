/**
 * @name            ariaBanner
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
export default function (__SFrontendChecker) {
    return {
        id: 'ariaBanner',
        name: 'Aria banner',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'A <header> tag should exist as a top level (not inside an article, aside, main, nav or section tag)',
        level: 1,
        check({ $context }) {
            const $header = $context.querySelectorAll(
                'header:not(article header, aside header, main header, nav header, section header)',
            );

            if (!$header) {
                return {
                    status: 'warning',
                    message: 'Missing <header> top level tag',
                    example:
                        '<body>\n&nbsp;&nbsp;<header>...</header>\n...\n</body>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html',
                };
            }

            return {
                status: 'success',
            };
        },
    };
}
