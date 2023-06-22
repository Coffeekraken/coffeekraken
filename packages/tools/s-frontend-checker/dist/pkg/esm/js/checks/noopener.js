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
            var _a, _b;
            const $externalLinks = Array.from((_a = $context.querySelectorAll('a[target="_blank"]:not([rel="noopener"])')) !== null && _a !== void 0 ? _a : []);
            // @ts-ignore
            if (!((_b = $context.querySelector('html')) === null || _b === void 0 ? void 0 : _b.hasAttribute('dir'))) {
                return {
                    status: 'error',
                    message: 'Some of your external links does not have rel="noopener"',
                    example: '<a href="..." target="_blank" rel="noopener">',
                    action: {
                        label: () => `Log them (${$externalLinks.length})`,
                        handler: () => {
                            $externalLinks.forEach(($elm) => {
                                console.log($elm);
                            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSwyQkFBMkI7UUFDakMsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQzdCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQiwwQ0FBMEMsQ0FDN0MsbUNBQUksRUFBRSxDQUNWLENBQUM7WUFFRixhQUFhO1lBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBRTtnQkFDdEQsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQ0gsMERBQTBEO29CQUM5RCxPQUFPLEVBQUUsK0NBQStDO29CQUN4RCxNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsY0FBYyxDQUFDLE1BQU0sR0FBRzt3QkFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDVixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3RCLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUM7cUJBQ0o7b0JBQ0QsUUFBUSxFQUNKLHVFQUF1RTtpQkFDOUUsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=