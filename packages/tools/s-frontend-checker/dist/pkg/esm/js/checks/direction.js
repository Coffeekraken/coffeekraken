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
                    status: 'error',
                    message: 'The document is missing the direction',
                    example: '<html dir="ltr">',
                    moreLink: 'https://www.w3schools.com/tags/att_global_dir.asp',
                };
            }
            return {
                status: 'success',
                elements: $html,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsV0FBVztRQUNmLElBQUksRUFBRSxXQUFXO1FBQ2pCLFdBQVcsRUFBRSxtREFBbUQ7UUFDaEUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsYUFBYTtZQUNiLElBQUksQ0FBQyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBRTtnQkFDN0IsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsdUNBQXVDO29CQUNoRCxPQUFPLEVBQUUsa0JBQWtCO29CQUMzQixRQUFRLEVBQ0osbURBQW1EO2lCQUMxRCxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=