/**
 * @name            iTag
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * The "i" tag should be avoided for none "icon" purpose
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'iTag',
    name: '<i> tag',
    description: 'It\'s recommanded to not use the "i" tag to emphasis something. Make use of the "em" one instead',
    level: 0,
    check({ $context }) {
        const $i = $context.querySelectorAll('i:not(:empty)');
        if ($i.length) {
            return {
                status: 'warning',
                message: null,
                example: '<em>...</em>',
                moreLink: 'https://www.w3schools.com/tags/tag_em.asp',
                action: {
                    label: () => `Log them (${$i.length})`,
                    handler: () => console.log($i),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsTUFBTTtJQUNWLElBQUksRUFBRSxTQUFTO0lBQ2YsV0FBVyxFQUNQLGtHQUFrRztJQUN0RyxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV0RCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsY0FBYztnQkFDdkIsUUFBUSxFQUFFLDJDQUEyQztnQkFDckQsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLEdBQUc7b0JBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQkFDakM7YUFDSixDQUFDO1NBQ0w7UUFDRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDIn0=