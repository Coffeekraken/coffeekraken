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
export default {
    id: 'linksTitle',
    name: 'Links title',
    description: 'All the links <a> tags must have a "title" attribute.',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsWUFBWTtJQUNoQixJQUFJLEVBQUUsYUFBYTtJQUNuQixXQUFXLEVBQUUsdURBQXVEO0lBQ3BFLEtBQUssRUFBRSxDQUFDO0lBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1FBQ2QsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdkQsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsT0FBTyxFQUNILHdFQUF3RTtnQkFDNUUsUUFBUSxFQUFFLDBDQUEwQztnQkFDcEQsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLEdBQUc7b0JBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQkFDakM7YUFDSixDQUFDO1NBQ0w7UUFDRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDIn0=