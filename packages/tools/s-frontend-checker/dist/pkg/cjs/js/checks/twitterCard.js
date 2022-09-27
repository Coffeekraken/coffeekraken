"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    id: 'twitterCard',
    name: 'Twitter Card Metas',
    description: 'Specifying the twitter card metas is recommanded',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsa0JBQWU7SUFDWCxFQUFFLEVBQUUsYUFBYTtJQUNqQixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLFdBQVcsRUFBRSxrREFBa0Q7SUFDL0QsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsRUFBRTtZQUN2RCxPQUFPO2dCQUNILE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSwrQ0FBK0M7Z0JBQ3hELE9BQU8sRUFDSCxxR0FBcUc7Z0JBQ3pHLFFBQVEsRUFDSix5RkFBeUY7YUFDaEcsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9