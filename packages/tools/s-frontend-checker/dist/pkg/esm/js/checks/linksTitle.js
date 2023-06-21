/**
 * @name            linksTitle
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * All the "<a>" tags must have a "title" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'linksTitle',
        name: 'Links title',
        description: 'All the links <a> tags must have a "title" attribute.',
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 1,
        check({ $context }) {
            const $a = $context.querySelectorAll('a:not([title])');
            if ($a.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<a href="https://coffeekraken.io" title="Coffeekraken website">...</a>',
                    moreLink: 'https://www.w3schools.com/tags/tag_a.asp',
                    action: {
                        label: () => `Log them (${$a.length})`,
                        handler: () => console.log($a),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFdkQsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFDSCx3RUFBd0U7b0JBQzVFLFFBQVEsRUFBRSwwQ0FBMEM7b0JBQ3BELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxHQUFHO3dCQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7cUJBQ2pDO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9