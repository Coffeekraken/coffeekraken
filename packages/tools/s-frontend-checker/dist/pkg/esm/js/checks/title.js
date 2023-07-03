/**
 * @name            title
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the title is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'title',
        name: 'Title',
        description: 'The document must contain a valid title declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            const $title = $context.querySelector('head title');
            // @ts-ignore
            if (!$title) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the title',
                    example: '<title>My awesome title</title>',
                    moreLink: 'https://www.w3schools.com/tags/tag_title.asp',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $title,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsT0FBTztRQUNYLElBQUksRUFBRSxPQUFPO1FBQ2IsV0FBVyxFQUFFLHFEQUFxRDtRQUNsRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUN2QyxPQUFPLEVBQUUsbUNBQW1DO29CQUM1QyxPQUFPLEVBQUUsaUNBQWlDO29CQUMxQyxRQUFRLEVBQUUsOENBQThDO2lCQUMzRCxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2dCQUN6QyxRQUFRLEVBQUUsTUFBTTthQUNuQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=