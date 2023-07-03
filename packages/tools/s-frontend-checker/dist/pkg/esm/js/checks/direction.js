/**
 * @name            direction
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the direction is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'direction',
        name: 'Direction',
        description: 'The document must contain a valid dir declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            const $html = $context.querySelector('html');
            // @ts-ignore
            if (!($html === null || $html === void 0 ? void 0 : $html.hasAttribute('dir'))) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the direction',
                    example: '<html dir="ltr">',
                    moreLink: 'https://www.w3schools.com/tags/att_global_dir.asp',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $html,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsV0FBVztRQUNmLElBQUksRUFBRSxXQUFXO1FBQ2pCLFdBQVcsRUFBRSxtREFBbUQ7UUFDaEUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsYUFBYTtZQUNiLElBQUksQ0FBQyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBRTtnQkFDN0IsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLHVDQUF1QztvQkFDaEQsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsUUFBUSxFQUNKLG1EQUFtRDtpQkFDMUQsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztnQkFDekMsUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9