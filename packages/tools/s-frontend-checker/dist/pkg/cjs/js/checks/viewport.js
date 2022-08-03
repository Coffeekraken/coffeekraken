"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            viewport
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the viewport is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    id: 'viewport',
    name: 'Viewport',
    description: 'The document must contain a valid viewport declaration',
    level: 0,
    check({ $context }) {
        // @ts-ignore
        if (!$context.querySelector('meta[name="viewport"]')) {
            return {
                status: 'error',
                message: 'The document is missing a viewport',
                example: '<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">',
                moreLink: 'https://www.w3schools.com/css/css_rwd_viewport.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsa0JBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRSx3REFBd0Q7SUFDckUsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUNsRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxvQ0FBb0M7Z0JBQzdDLE9BQU8sRUFDSCx1RkFBdUY7Z0JBQzNGLFFBQVEsRUFBRSxvREFBb0Q7YUFDakUsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9