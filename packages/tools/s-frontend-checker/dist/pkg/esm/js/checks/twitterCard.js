/**
 * @name            twitterCard
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the twitterCard metas are well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'twitterCard',
        name: 'Twitter Card Metas',
        description: 'Specifying the twitter card metas is recommanded',
        category: __SFrontendChecker.CATEGORY_SOCIAL,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            const $twitter = $context.querySelectorAll('meta[property^="twitter:"]');
            // @ts-ignore
            if (!$twitter) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the twitterCard metas',
                    example: '<meta name="twitter:card" content="summary" />\n<meta name="twitter:site" content="@nytimesbits" />',
                    moreLink: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $twitter,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsYUFBYTtRQUNqQixJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsUUFBUSxFQUFFLGtCQUFrQixDQUFDLGVBQWU7UUFDNUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFlBQVk7UUFDdEMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUN0Qyw0QkFBNEIsQ0FDL0IsQ0FBQztZQUNGLGFBQWE7WUFDYixJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLFlBQVk7b0JBQ3ZDLE9BQU8sRUFBRSwrQ0FBK0M7b0JBQ3hELE9BQU8sRUFDSCxxR0FBcUc7b0JBQ3pHLFFBQVEsRUFDSix5RkFBeUY7aUJBQ2hHLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7Z0JBQ3pDLFFBQVEsRUFBRSxRQUFRO2FBQ3JCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==