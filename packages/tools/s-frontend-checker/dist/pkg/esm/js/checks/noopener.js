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
            const $externalLinks = Array.from((_a = $context.querySelectorAll('a[target="_blank"]:not([rel="noopener"])')) !== null && _a !== void 0 ? _a : []);
            // @ts-ignore
            if ($externalLinks.length) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'Some of your external links does not have rel="noopener"',
                    example: '<a href="..." target="_blank" rel="noopener">',
                    moreLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener',
                    elements: $externalLinks,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSwyQkFBMkI7UUFDakMsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQzdCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQiwwQ0FBMEMsQ0FDN0MsbUNBQUksRUFBRSxDQUNWLENBQUM7WUFFRixhQUFhO1lBQ2IsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUN2QixPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUN2QyxPQUFPLEVBQ0gsMERBQTBEO29CQUM5RCxPQUFPLEVBQUUsK0NBQStDO29CQUN4RCxRQUFRLEVBQ0osdUVBQXVFO29CQUMzRSxRQUFRLEVBQUUsY0FBYztpQkFDM0IsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYzthQUM1QyxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=