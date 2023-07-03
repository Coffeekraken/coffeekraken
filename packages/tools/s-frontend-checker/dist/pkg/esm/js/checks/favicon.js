/**
 * @name            favicon
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the favicon is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'favicon',
        name: 'Favicon',
        description: 'The page should have a favicon defined correctly',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_HIGH,
        check({ $context }) {
            // favicon
            if (!$context.querySelector('link[rel="icon"]')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the favicon',
                    example: '<link rel="icon" type="image/x-icon" href="/images/favicon.ico">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }
            // shortcut icon
            if (!$context.querySelector('link[rel="shortcut icon"]')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the favicon',
                    example: '<link rel="shortcut icon" href="/dist/favicon/favicon.ico">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }
            // icons sizes
            // @ts-ignore
            for (let [i, size] of ['16x16', '32x32', '48x48'].entries()) {
                if (!$context.querySelector(`link[rel="icon"][sizes="${size}"]`)) {
                    return {
                        status: __SFrontendChecker.STATUS_ERROR,
                        message: `The document is missing the \`${size}\` favicon`,
                        example: `<link rel="icon" type="image/png" sizes="${size}" href="/dist/favicon/favicon-${size}.png">`,
                        moreLink: 'https://github.com/itgalaxy/favicons',
                    };
                }
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsU0FBUztRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO1FBQ3BDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLFVBQVU7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUM3QyxPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUN2QyxPQUFPLEVBQUUscUNBQXFDO29CQUM5QyxPQUFPLEVBQ0gsa0VBQWtFO29CQUN0RSxRQUFRLEVBQUUsc0NBQXNDO2lCQUNuRCxDQUFDO2FBQ0w7WUFFRCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsRUFBRTtnQkFDdEQsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLHFDQUFxQztvQkFDOUMsT0FBTyxFQUNILDZEQUE2RDtvQkFDakUsUUFBUSxFQUFFLHNDQUFzQztpQkFDbkQsQ0FBQzthQUNMO1lBRUQsY0FBYztZQUNkLGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN6RCxJQUNJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsSUFBSSxJQUFJLENBQUMsRUFDOUQ7b0JBQ0UsT0FBTzt3QkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTt3QkFDdkMsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFlBQVk7d0JBQzFELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxpQ0FBaUMsSUFBSSxRQUFRO3dCQUN0RyxRQUFRLEVBQUUsc0NBQXNDO3FCQUNuRCxDQUFDO2lCQUNMO2FBQ0o7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2FBQzVDLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==