/**
 * @name            cssOrder
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the cssOrder is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'cssOrder',
    name: 'CSS Order',
    description: 'All css must be loaded before any js in the head',
    level: 1,
    check({ $context }) {
        const $styles = $context.querySelectorAll('head link[rel="stylesheet"]'), $scripts = $context.querySelectorAll('head script');
        if (!$styles.length || !$scripts.length) {
            return {
                status: 'success',
            };
        }
        let $lastStyle = $styles[$styles.length - 1], $firstScript = $scripts[0];
        let highestStylesIndex = Array.prototype.indexOf.call($lastStyle.parentNode.children, $lastStyle), lowestScriptsIndex = Array.prototype.indexOf.call($firstScript.parentNode.children, $firstScript);
        // // @ts-ignore
        if (lowestScriptsIndex > highestStylesIndex) {
            return {
                status: 'warning',
                message: "It's better to have link tags before scrips ones",
                example: '<link rel="stylesheet" href="..." />\n<script src="..."></script>',
                moreLink: 'https://stackoverflow.com/questions/9271276/should-css-always-precede-javascript',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILGVBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxXQUFXO0lBQ2pCLFdBQVcsRUFBRSxrREFBa0Q7SUFDL0QsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQ2pDLDZCQUE2QixDQUNoQyxFQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3JDLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztTQUNMO1FBQ0QsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ3hDLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzdDLFVBQVUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUM5QixVQUFVLENBQ2IsRUFDRCxrQkFBa0IsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzdDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUNoQyxZQUFZLENBQ2YsQ0FBQztRQUVOLGdCQUFnQjtRQUNoQixJQUFJLGtCQUFrQixHQUFHLGtCQUFrQixFQUFFO1lBQ3pDLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxrREFBa0Q7Z0JBQzNELE9BQU8sRUFDSCxtRUFBbUU7Z0JBQ3ZFLFFBQVEsRUFDSixrRkFBa0Y7YUFDekYsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9