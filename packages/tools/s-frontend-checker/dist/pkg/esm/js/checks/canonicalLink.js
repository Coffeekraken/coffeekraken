/**
 * @name            canonicalLink
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the canonical link is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'canonicalLink',
        name: 'Canonical link',
        description: 'Check if a canonical link is present and that it is valid',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // canonical
            const $canonicalLink = $context.querySelector('link[rel="canonical"]');
            if (!$canonicalLink) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            }
            if (!$canonicalLink.hasAttribute('href')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `canonical` link `href` attribute is missing',
                    example: `<link rel="canonical" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $canonicalLink,
                };
            }
            if (!$canonicalLink.getAttribute('href').match(/^https?\:\/\//)) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: `The \`canonical\` link "${$canonicalLink.getAttribute('href')}" is invalid`,
                    example: `<link rel="canonical" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $canonicalLink,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $canonicalLink,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsZUFBZTtRQUNuQixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFDUCwyREFBMkQ7UUFDL0QsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN0QyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxZQUFZO1lBQ1osTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsdUJBQXVCLENBQzFCLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNqQixPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2lCQUM1QyxDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLGtEQUFrRDtvQkFDM0QsT0FBTyxFQUFFLDJFQUEyRTtvQkFDcEYsUUFBUSxFQUNKLHdGQUF3RjtvQkFDNUYsUUFBUSxFQUFFLGNBQWM7aUJBQzNCLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDN0QsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLDJCQUEyQixjQUFjLENBQUMsWUFBWSxDQUMzRCxNQUFNLENBQ1QsY0FBYztvQkFDZixPQUFPLEVBQUUsMkVBQTJFO29CQUNwRixRQUFRLEVBQ0osd0ZBQXdGO29CQUM1RixRQUFRLEVBQUUsY0FBYztpQkFDM0IsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztnQkFDekMsUUFBUSxFQUFFLGNBQWM7YUFDM0IsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9