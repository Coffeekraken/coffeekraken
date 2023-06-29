/**
 * @name            bTag
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * The "b" tag should be avoided.
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'bTag',
        name: '<b> tag',
        description: 'It\'s recommanded to not use the "b" tag. Make use of the "strong" one instead',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            var _a;
            const $b = Array.from((_a = $context.querySelectorAll('b')) !== null && _a !== void 0 ? _a : []);
            if ($b.length) {
                return {
                    status: 'warning',
                    message: `It's recommanded to not use the \`<b>\` tag. Use the \`<strong>\` tag instead`,
                    example: '<strong>...</strong>',
                    moreLink: 'https://www.w3schools.com/tags/tag_strong.asp',
                    elements: $b,
                };
            }
            return {
                status: 'success',
                elements: $b,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsTUFBTTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUNQLGdGQUFnRjtRQUNwRixRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRTVELElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsK0VBQStFO29CQUN4RixPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxRQUFRLEVBQUUsRUFBRTtpQkFDZixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==