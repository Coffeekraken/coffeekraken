/**
 * @name            manifest
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the manifest is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'manifest',
        name: 'App manifest',
        description: 'The page should have an app manifest defined',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // manifest
            const $manifest = $context.querySelector('link[rel="manifest"]');
            if (!$manifest) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the app manifest',
                    example: '<link rel="manifest" href="/dist/favicon/manifest.json">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $manifest,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxjQUFjO1FBQ3BCLFdBQVcsRUFBRSw4Q0FBOEM7UUFDM0QsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN0QyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxXQUFXO1lBQ1gsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLDBDQUEwQztvQkFDbkQsT0FBTyxFQUNILDBEQUEwRDtvQkFDOUQsUUFBUSxFQUFFLHNDQUFzQztpQkFDbkQsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztnQkFDekMsUUFBUSxFQUFFLFNBQVM7YUFDdEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9