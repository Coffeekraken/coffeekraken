import __SInterface from '@coffeekraken/s-interface';
import { __intersection } from '@coffeekraken/sugar/array';
class SSugarcssPluginScopeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description: 'Specify the scope(s) you want to generate for the enclosed mixins calls',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScopeMixinInterface as interface };
/**
 * @name           scope
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you want to all the called mixins that have a "$scope" parameter like `@s.ui.button`, `@s.ui.avatar`, etc...
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope ($1) { $2 }
 * @s.scope $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope bare {
 *      @s.ui.button;
 *      // etc...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, registerPostProcessor, replaceWith, sharedData, }) {
    const finalParams = Object.assign({ scope: [] }, (params !== null && params !== void 0 ? params : {}));
    atRule.name = 'media';
    atRule.params = `s-scope-${finalParams.scope.join(',')}`;
    registerPostProcessor((root) => {
        let currentRule = atRule.parent;
        while (currentRule && currentRule !== root) {
            if (!currentRule.name) {
                currentRule = currentRule.parent;
                continue;
            }
            if (currentRule.params.startsWith('s-scope-only-')) {
                const onlyArray = currentRule.params
                    .trim()
                    .replace('s-scope-only-', '')
                    .split(',');
                if (!__intersection(finalParams.scope, onlyArray).length) {
                    atRule.remove();
                }
            }
            else if (currentRule.params.startsWith('s-scope-exclude-')) {
                const excludeArray = currentRule.params
                    .trim()
                    .replace('s-scope-exclude-', '')
                    .split(',');
                if (__intersection(finalParams.scope, excludeArray).length) {
                    atRule.remove();
                }
            }
            currentRule = currentRule.parent;
        }
        atRule.replaceWith(atRule.nodes);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELFdBQVcsRUFDUCx5RUFBeUU7Z0JBQzdFLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU0zRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixxQkFBcUIsRUFDckIsV0FBVyxFQUNYLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsRUFBRSxJQUNOLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUN0QixNQUFNLENBQUMsTUFBTSxHQUFHLFdBQVcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUV6RCxxQkFBcUIsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFaEMsT0FBTyxXQUFXLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbkIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pDLFNBQVM7YUFDWjtZQUNELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2hELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNO3FCQUMvQixJQUFJLEVBQUU7cUJBQ04sT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUM7cUJBQzVCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDdEQsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNuQjthQUNKO2lCQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDMUQsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU07cUJBQ2xDLElBQUksRUFBRTtxQkFDTixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO3FCQUMvQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUN4RCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ25CO2FBQ0o7WUFFRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNwQztRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9