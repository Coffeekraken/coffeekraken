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
                    status: __SFrontendChecker.STATUS_SUCCESS
                };
            }
            if (!$canonicalLink.hasAttribute('href')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `canonical` link `href` attribute is missing',
                    example: `link rel="canonical" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls'
                };
            }
            if (!$canonicalLink.getAttribute('href').match(/^https?\:\/\//)) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: `The \`canonical\` link "${$canonicalLink.getAttribute('href')}" is invalid`,
                    example: `link rel="canonical" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls'
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsZUFBZTtRQUNuQixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN0QyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxZQUFZO1lBQ1osTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7aUJBQzVDLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUN2QyxPQUFPLEVBQUUsa0RBQWtEO29CQUMzRCxPQUFPLEVBQUUsMEVBQTBFO29CQUNuRixRQUFRLEVBQUUsd0ZBQXdGO2lCQUNyRyxDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQzdELE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLFlBQVk7b0JBQ3ZDLE9BQU8sRUFBRSwyQkFBMkIsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsY0FBYztvQkFDckYsT0FBTyxFQUFFLDBFQUEwRTtvQkFDbkYsUUFBUSxFQUFFLHdGQUF3RjtpQkFDckcsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=