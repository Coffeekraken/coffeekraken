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
                    status: 'error',
                    message: 'The document is missing the favicon',
                    example: '<link rel="icon" type="image/x-icon" href="/images/favicon.ico">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }
            // shortcut icon
            if (!$context.querySelector('link[rel="shortcut icon"]')) {
                return {
                    status: 'error',
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
                        status: 'error',
                        message: `The document is missing the \`${size}\` favicon`,
                        example: `<link rel="icon" type="image/png" sizes="${size}" href="/dist/favicon/favicon-${size}.png">`,
                        moreLink: 'https://github.com/itgalaxy/favicons',
                    };
                }
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsU0FBUztRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO1FBQ3BDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUVkLFVBQVU7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUM3QyxPQUFPO29CQUNILE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBQyxxQ0FBcUM7b0JBQzdDLE9BQU8sRUFBQyxrRUFBa0U7b0JBQzFFLFFBQVEsRUFBQyxzQ0FBc0M7aUJBQ2xELENBQUM7YUFDTDtZQUVELGdCQUFnQjtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO2dCQUN0RCxPQUFPO29CQUNILE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBQyxxQ0FBcUM7b0JBQzdDLE9BQU8sRUFBQyw2REFBNkQ7b0JBQ3JFLFFBQVEsRUFBQyxzQ0FBc0M7aUJBQ2xELENBQUM7YUFDTDtZQUVELGNBQWM7WUFDZCxhQUFhO1lBQ2IsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLElBQUksSUFBSSxDQUFDLEVBQUU7b0JBQzlELE9BQU87d0JBQ0gsTUFBTSxFQUFFLE9BQU87d0JBQ2YsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFlBQVk7d0JBQzFELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxpQ0FBaUMsSUFBSSxRQUFRO3dCQUN0RyxRQUFRLEVBQUUsc0NBQXNDO3FCQUNuRCxDQUFBO2lCQUNKO2FBQ0o7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==