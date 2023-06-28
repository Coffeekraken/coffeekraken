/**
 * @name            alternateLink
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the alternate link is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'alternateLink',
        name: 'Alternate link',
        description: 'Check if an alternate link is present and that it is valid',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // canonical
            const $alternateLink = $context.querySelector('link[rel="alternate"]');
            if (!$alternateLink) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            }
            if (!$alternateLink.hasAttribute('href')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `alternate` link `href` attribute is missing',
                    example: `link rel="alternate" media="only screen and (max-width: 640px)" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $alternateLink,
                };
            }
            if (!$alternateLink.getAttribute('href').match(/^https?\:\/\//)) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: `The \`alternate\` link "${$alternateLink.getAttribute('href')}" is invalid`,
                    example: `link rel="alternate" media="only screen and (max-width: 640px)" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $alternateLink,
                };
            }
            if (!$alternateLink.hasAttribute('media') &&
                !$alternateLink.hasAttribute('hreflang')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `alternate` link `hreflang`|`media` attribute is missing',
                    example: `link rel="alternate" media="only screen and (max-width: 640px)" href="https://example.com/dresses/green-dresses" />`,
                    moreLink: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $alternateLink,
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsZUFBZTtRQUNuQixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFDUCw0REFBNEQ7UUFDaEUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN0QyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxZQUFZO1lBQ1osTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsdUJBQXVCLENBQzFCLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNqQixPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2lCQUM1QyxDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLGtEQUFrRDtvQkFDM0QsT0FBTyxFQUFFLHFIQUFxSDtvQkFDOUgsUUFBUSxFQUNKLHdGQUF3RjtvQkFDNUYsUUFBUSxFQUFFLGNBQWM7aUJBQzNCLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDN0QsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLDJCQUEyQixjQUFjLENBQUMsWUFBWSxDQUMzRCxNQUFNLENBQ1QsY0FBYztvQkFDZixPQUFPLEVBQUUscUhBQXFIO29CQUM5SCxRQUFRLEVBQ0osd0ZBQXdGO29CQUM1RixRQUFRLEVBQUUsY0FBYztpQkFDM0IsQ0FBQzthQUNMO1lBRUQsSUFDSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQzFDO2dCQUNFLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLFlBQVk7b0JBQ3ZDLE9BQU8sRUFDSCw4REFBOEQ7b0JBQ2xFLE9BQU8sRUFBRSxxSEFBcUg7b0JBQzlILFFBQVEsRUFDSix3RkFBd0Y7b0JBQzVGLFFBQVEsRUFBRSxjQUFjO2lCQUMzQixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==