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
export default function (__SFrontendChecker) {
    return {
        id: 'main',
        name: 'Main tag',
        description: 'It\'s recommanded to wrap your main content inside a "main" tag.',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $main = $context.querySelector('main');
            if (!$main) {
                return {
                    status: 'warning',
                    message: 'Your page is missing a proper `<main>` tag to enclose correctly the content',
                    example: '<main id="content">...</main>',
                    moreLink: 'https://www.w3schools.com/tags/tag_main.asp',
                };
            }
            return {
                status: 'success',
                elements: $main,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsTUFBTTtRQUNWLElBQUksRUFBRSxVQUFVO1FBQ2hCLFdBQVcsRUFDUCxrRUFBa0U7UUFDdEUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQ0gsNkVBQTZFO29CQUNqRixPQUFPLEVBQUUsK0JBQStCO29CQUN4QyxRQUFRLEVBQUUsNkNBQTZDO2lCQUMxRCxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=