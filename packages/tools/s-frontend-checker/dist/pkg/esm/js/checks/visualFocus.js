/**
 * @name            visualFocus
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all focusable elements have a visual state setted
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getCssPropertyForRule(rule, prop) {
    var sheets = document.styleSheets;
    var slen = sheets.length;
    for (var i = 0; i < slen; i++) {
        var rules = document.styleSheets[i].cssRules;
        var rlen = rules.length;
        for (var j = 0; j < rlen; j++) {
            if (rules[j].selectorText == rule) {
                return rules[j].style[prop];
            }
        }
    }
}
export default function (__SFrontendChecker) {
    return {
        id: 'visualFocus',
        name: 'Visual focus',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that all focusable elements have a visual state setted',
        level: 1,
        check({ $context }) {
            var _a;
            const $focusables = Array.from((_a = $context.querySelectorAll(':is([tabindex], button, input, select, a):not([tabindex="-1"])')) !== null && _a !== void 0 ? _a : []);
            // @ts-ignore
            for (let [idx, $focusable] of $focusables.entries()) {
                const style = window.getComputedStyle($focusable), focusStyle = window.getComputedStyle($focusable, 'hover'), focusWithinStyle = window.parent.getComputedStyle($focusable, ':focus-within');
                _console.log('FOF', $focusable);
                _console.log(getCssPropertyForRule());
                if (JSON.stringify(focusStyle) === JSON.stringify(style)) {
                    // _console.log(
                    //     $focusable,
                    //     style.backgroundColor,
                    //     focusStyle.backgroundColor,
                    // );
                    // return {
                    //     status: 'warning',
                    //     message: `The \`${$focusable.outerHTML}\` does not have any focused visual display`,
                    //     example: null,
                    //     moreLink:
                    //         'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                    //     action: {
                    //         label: () => `Log it`,
                    //         handler: () => console.log($focusable),
                    //     },
                    // };
                }
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$focusables.length})`,
                    handler: () => console.log($focusables),
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILFNBQVMscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUk7SUFDckMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUNsQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQjtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxrQkFBa0I7SUFDdkMsT0FBTztRQUNILEVBQUUsRUFBRSxhQUFhO1FBQ2pCLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLDhEQUE4RDtRQUNsRSxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUMxQixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDckIsZ0VBQWdFLENBQ25FLG1DQUFJLEVBQUUsQ0FDVixDQUFDO1lBRUYsYUFBYTtZQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFDN0MsVUFBVSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQ3pELGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQzdDLFVBQVUsRUFDVixlQUFlLENBQ2xCLENBQUM7Z0JBRU4sUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBRWhDLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEQsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLDZCQUE2QjtvQkFDN0Isa0NBQWtDO29CQUNsQyxLQUFLO29CQUNMLFdBQVc7b0JBQ1gseUJBQXlCO29CQUN6QiwyRkFBMkY7b0JBQzNGLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQix3R0FBd0c7b0JBQ3hHLGdCQUFnQjtvQkFDaEIsaUNBQWlDO29CQUNqQyxrREFBa0Q7b0JBQ2xELFNBQVM7b0JBQ1QsS0FBSztpQkFDUjthQUNKO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLFdBQVcsQ0FBQyxNQUFNLEdBQUc7b0JBQy9DLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztpQkFDMUM7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=