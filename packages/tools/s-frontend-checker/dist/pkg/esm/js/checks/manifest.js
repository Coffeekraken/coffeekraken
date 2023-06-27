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
            if (!$context.querySelector('link[rel="manifest"]')) {
                return {
                    status: 'error',
                    message: 'The document is missing the app manifest',
                    example: '<link rel="manifest" href="/dist/favicon/manifest.json">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxjQUFjO1FBQ3BCLFdBQVcsRUFBRSw4Q0FBOEM7UUFDM0QsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN0QyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxXQUFXO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDakQsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsMENBQTBDO29CQUNuRCxPQUFPLEVBQ0gsMERBQTBEO29CQUM5RCxRQUFRLEVBQUUsc0NBQXNDO2lCQUNuRCxDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==