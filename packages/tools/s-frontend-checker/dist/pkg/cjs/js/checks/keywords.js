"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            keywords
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the keywords is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    id: 'keywords',
    name: 'Keywords',
    description: 'The document must contain a valid keywords declaration',
    level: 1,
    check({ $context }) {
        // @ts-ignore
        if (!$context.querySelector('head meta[name="keywords"]')) {
            return {
                status: 'warning',
                message: 'The document is missing Some keywords',
                example: '<meta name="keywords" content="Frontend, Web, Development">',
                moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsa0JBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRSx3REFBd0Q7SUFDckUsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsRUFBRTtZQUN2RCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsdUNBQXVDO2dCQUNoRCxPQUFPLEVBQ0gsNkRBQTZEO2dCQUNqRSxRQUFRLEVBQUUsNkNBQTZDO2FBQzFELENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==