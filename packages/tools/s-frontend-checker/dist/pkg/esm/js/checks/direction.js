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
            var _a;
            // @ts-ignore
            if (!((_a = $context.querySelector('html')) === null || _a === void 0 ? void 0 : _a.hasAttribute('dir'))) {
                return {
                    status: 'error',
                    message: 'The document is missing the direction',
                    example: '<html dir="ltr">',
                    moreLink: 'https://www.w3schools.com/tags/att_global_dir.asp',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsV0FBVztRQUNmLElBQUksRUFBRSxXQUFXO1FBQ2pCLFdBQVcsRUFBRSxtREFBbUQ7UUFDaEUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxhQUFhO1lBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBRTtnQkFDdEQsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsdUNBQXVDO29CQUNoRCxPQUFPLEVBQUUsa0JBQWtCO29CQUMzQixRQUFRLEVBQ0osbURBQW1EO2lCQUMxRCxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==