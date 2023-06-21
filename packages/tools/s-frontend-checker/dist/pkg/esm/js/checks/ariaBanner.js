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
        description: 'A <header> tag should exist as a top level (not inside an article, aside, main, nav or section tag)',
        level: 1,
        check({ $context }) {
            const $header = $context.querySelectorAll('header:not(article header, aside header, main header, nav header, section header)');
            if (!$header) {
                return {
                    status: 'warning',
                    message: 'Missing <header> top level tag',
                    example: '<body>\n&nbsp;&nbsp;<header>...</header>\n...\n</body>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixRQUFRLEVBQUUsa0JBQWtCLENBQUMsc0JBQXNCO1FBQ25ELFdBQVcsRUFDUCxxR0FBcUc7UUFDekcsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQ3JDLG1GQUFtRixDQUN0RixDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsZ0NBQWdDO29CQUN6QyxPQUFPLEVBQ0gsd0RBQXdEO29CQUM1RCxRQUFRLEVBQ0oseUVBQXlFO2lCQUNoRixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==