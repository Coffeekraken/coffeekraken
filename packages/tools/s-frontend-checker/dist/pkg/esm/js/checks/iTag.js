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
export default function (__SFrontendChecker) {
    return {
        id: 'iTag',
        name: '<i> tag',
        description: 'It\'s recommanded to not use the "i" tag to emphasis something. Make use of the "em" one instead',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            var _a;
            const $i = Array.from((_a = $context.querySelectorAll('i:not(:empty)')) !== null && _a !== void 0 ? _a : []);
            if ($i.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<em>...</em>',
                    moreLink: 'https://www.w3schools.com/tags/tag_em.asp',
                    elements: $i,
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsTUFBTTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUNQLGtHQUFrRztRQUN0RyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ2pCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxtQ0FBSSxFQUFFLENBQ25ELENBQUM7WUFFRixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSwyQ0FBMkM7b0JBQ3JELFFBQVEsRUFBRSxFQUFFO2lCQUNmLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9