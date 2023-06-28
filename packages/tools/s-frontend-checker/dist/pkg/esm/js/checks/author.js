/**
 * @name            author
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the author is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'author',
        name: 'Author',
        description: 'The document must contain a valid author declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $author = $context.querySelector('head meta[name="author"]');
            if (!$author) {
                return {
                    status: 'error',
                    message: 'The document is missing an author',
                    example: '<meta name="author" content="Olivier Bossel">',
                    moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
                };
            }
            return {
                status: 'success',
                elements: $author,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsUUFBUTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHNEQUFzRDtRQUNuRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsbUNBQW1DO29CQUM1QyxPQUFPLEVBQUUsK0NBQStDO29CQUN4RCxRQUFRLEVBQUUsNkNBQTZDO2lCQUMxRCxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsT0FBTzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=