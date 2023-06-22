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
        level: 1,
        check({ $context }) {
            // @ts-ignore
            if (!$context.querySelector('meta[property^="twitter:"]')) {
                return {
                    status: 'error',
                    message: 'The document is missing the twitterCard metas',
                    example: '<meta name="twitter:card" content="summary" />\n<meta name="twitter:site" content="@nytimesbits" />',
                    moreLink: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsYUFBYTtRQUNqQixJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsUUFBUSxFQUFFLGtCQUFrQixDQUFDLGVBQWU7UUFDNUMsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxhQUFhO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsRUFBRTtnQkFDdkQsT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsK0NBQStDO29CQUN4RCxPQUFPLEVBQ0gscUdBQXFHO29CQUN6RyxRQUFRLEVBQ0oseUZBQXlGO2lCQUNoRyxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==