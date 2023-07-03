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
export default function (__SFrontendChecker) {
    return {
        id: 'cssOrder',
        name: 'CSS Order',
        description: 'All css must be loaded before any js in the head',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $styles = $context.querySelectorAll('head link[rel="stylesheet"]'), $scripts = $context.querySelectorAll('head script');
            if (!$styles.length || !$scripts.length) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            }
            let $lastStyle = $styles[$styles.length - 1], $firstScript = $scripts[0];
            let highestStylesIndex = Array.prototype.indexOf.call($lastStyle.parentNode.children, $lastStyle), lowestScriptsIndex = Array.prototype.indexOf.call($firstScript.parentNode.children, $firstScript);
            // // @ts-ignore
            if (lowestScriptsIndex > highestStylesIndex) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: "It's better to have link tags before scrips ones",
                    example: '<link rel="stylesheet" href="..." />\n<script src="..."></script>',
                    moreLink: 'https://stackoverflow.com/questions/9271276/should-css-always-precede-javascript',
                    elements: $styles,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $styles,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxXQUFXO1FBQ2pCLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDakMsNkJBQTZCLENBQ2hDLEVBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7aUJBQzVDLENBQUM7YUFDTDtZQUNELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUN4QyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDOUIsVUFBVSxDQUNiLEVBQ0Qsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDaEMsWUFBWSxDQUNmLENBQUM7WUFFTixnQkFBZ0I7WUFDaEIsSUFBSSxrQkFBa0IsR0FBRyxrQkFBa0IsRUFBRTtnQkFDekMsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztvQkFDekMsT0FBTyxFQUFFLGtEQUFrRDtvQkFDM0QsT0FBTyxFQUNILG1FQUFtRTtvQkFDdkUsUUFBUSxFQUNKLGtGQUFrRjtvQkFDdEYsUUFBUSxFQUFFLE9BQU87aUJBQ3BCLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7Z0JBQ3pDLFFBQVEsRUFBRSxPQUFPO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==