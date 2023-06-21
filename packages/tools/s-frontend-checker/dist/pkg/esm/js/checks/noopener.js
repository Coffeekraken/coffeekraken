/**
 * @name            noopener
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the noopener is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'noopener',
        name: 'External links (noopener)',
        description: 'Links with target="_blank" should have rel="noopener"',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 3,
        check({ $context }) {
            var _a;
            const $externalLinks = $context.querySelectorAll('a[target="_blank"]:not([rel="noopener"])');
            // @ts-ignore
            if (!((_a = $context.querySelector('html')) === null || _a === void 0 ? void 0 : _a.hasAttribute('dir'))) {
                return {
                    status: 'error',
                    message: 'Some of your external links does not have rel="noopener"',
                    example: '<a href="..." target="_blank" rel="noopener">',
                    action: {
                        label: () => `Log them (${$externalLinks.length})`,
                        handler: () => {
                            console.log($externalLinks);
                        },
                    },
                    moreLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSwyQkFBMkI7UUFDakMsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDNUMsMENBQTBDLENBQzdDLENBQUM7WUFFRixhQUFhO1lBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBRTtnQkFDdEQsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQ0gsMERBQTBEO29CQUM5RCxPQUFPLEVBQUUsK0NBQStDO29CQUN4RCxNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsY0FBYyxDQUFDLE1BQU0sR0FBRzt3QkFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUNoQyxDQUFDO3FCQUNKO29CQUNELFFBQVEsRUFDSix1RUFBdUU7aUJBQzlFLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9