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
export default {
    id: 'bTag',
    name: '<b> tag',
    description: 'It\'s recommanded to not use the "b" tag. Make use of the "strong" one instead',
    level: 0,
    check({ $context }) {
        const $b = $context.querySelectorAll('b');
        if ($b.length) {
            return {
                status: 'warning',
                message: null,
                example: '<strong>...</strong>',
                moreLink: 'https://www.w3schools.com/tags/tag_strong.asp',
                action: {
                    label: () => `Log them (${$b.length})`,
                    handler: () => console.log($b),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsTUFBTTtJQUNWLElBQUksRUFBRSxTQUFTO0lBQ2YsV0FBVyxFQUNQLGdGQUFnRjtJQUNwRixLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixRQUFRLEVBQUUsK0NBQStDO2dCQUN6RCxNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sR0FBRztvQkFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2lCQUNqQzthQUNKLENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==