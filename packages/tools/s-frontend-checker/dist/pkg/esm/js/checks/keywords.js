/**
 * @name            keywords
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the keywords is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'keywords',
        name: 'Keywords',
        description: 'The document must contain a valid keywords declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            // @ts-ignore
            const $keywords = $context.querySelector('head meta[name="keywords"]');
            if (!$keywords) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'The document is missing Some keywords',
                    example: '<meta name="keywords" content="Frontend, Web, Development">',
                    moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $keywords,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxVQUFVO1FBQ2hCLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLGFBQWE7WUFDYixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyw0QkFBNEIsQ0FDL0IsQ0FBQztZQUNGLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztvQkFDekMsT0FBTyxFQUFFLHVDQUF1QztvQkFDaEQsT0FBTyxFQUNILDZEQUE2RDtvQkFDakUsUUFBUSxFQUFFLDZDQUE2QztpQkFDMUQsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztnQkFDekMsUUFBUSxFQUFFLFNBQVM7YUFDdEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9