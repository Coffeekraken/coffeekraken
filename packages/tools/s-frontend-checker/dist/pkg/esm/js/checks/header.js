/**
 * @name            header
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "header" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'header',
        name: 'Header tag',
        description: 'It\'s recommanded to wrap your header (menu, etc...) inside a "header" tag.',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $header = $context.querySelector('header:not(article header)');
            if (!$header) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<header>...</header>',
                    moreLink: 'https://www.w3schools.com/tags/tag_header.asp',
                    action: null,
                };
            }
            return {
                status: 'success',
                elements: $header,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsUUFBUTtRQUNaLElBQUksRUFBRSxZQUFZO1FBQ2xCLFdBQVcsRUFDUCw2RUFBNkU7UUFDakYsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDRCQUE0QixDQUMvQixDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxNQUFNLEVBQUUsSUFBSTtpQkFDZixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsT0FBTzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=