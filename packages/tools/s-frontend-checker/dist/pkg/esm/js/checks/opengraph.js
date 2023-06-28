/**
 * @name            opengraph
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the opengraph metas are well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'opengraph',
        name: 'Open Graph Metas',
        description: 'Specifying the open graph metas is recommanded',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $og = $context.querySelectorAll('meta[property^="og:"]');
            // @ts-ignore
            if (!$og.length) {
                return {
                    status: 'error',
                    message: 'The document is missing the opengraph metas',
                    example: '<meta property="og:title" content="The Rock" />\n<meta property="og:type" content="video.movie" />',
                    moreLink: 'https://ogp.me/',
                };
            }
            return {
                status: 'success',
                elements: $og,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsV0FBVztRQUNmLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFL0QsYUFBYTtZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUNiLE9BQU87b0JBQ0gsTUFBTSxFQUFFLE9BQU87b0JBQ2YsT0FBTyxFQUFFLDZDQUE2QztvQkFDdEQsT0FBTyxFQUNILG9HQUFvRztvQkFDeEcsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUIsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsUUFBUSxFQUFFLEdBQUc7YUFDaEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9