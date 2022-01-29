import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
                default: __SSugarConfig.get('theme.variant'),
            },
            theme: {
                type: 'String',
                default: __SSugarConfig.get('theme.theme'),
            },
        };
    }
}
export { postcssSugarPluginThemeWhenMixinInterface as interface };
/**
 * @name           when
 * @namespace      node.mixins.rhythm
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 * This will mainly scope your css under a class named ```.s-theme:{name}``` but it's
 * nice to use this mixin to make this easier and more modulable
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.theme.when(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div class="s-theme\:dark">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    let theme = finalParams.theme, variant = finalParams.variant;
    // if (!theme) theme = __STheme.config('theme.theme');
    // if (!variant) variant = __STheme.config('theme.variant');
    let container;
    if (theme && variant) {
        container = new postcssApi.Rule({
            selectors: [
                `[theme^="${theme}"][theme$="${variant}"] &`,
                `&[theme^="${theme}"][theme$="${variant}"]`
            ]
        });
    }
    else if (theme) {
        container = new postcssApi.Rule({
            selectors: [
                `[theme^="${theme}"] &`,
                `&[theme^="${theme}"]`
            ]
        });
    }
    else if (variant) {
        container = new postcssApi.Rule({
            selectors: [
                `[theme$="${variant}"] &`,
                `&[theme$="${variant}"]`
            ]
        });
    }
    atRule.nodes.forEach((n) => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFHMUQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQy9DO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQzthQUM3QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQUtiO0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQ3pCLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQ2xDLHNEQUFzRDtJQUN0RCw0REFBNEQ7SUFFNUQsSUFBSSxTQUFTLENBQUM7SUFFZCxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7UUFDbEIsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsWUFBWSxLQUFLLGNBQWMsT0FBTyxNQUFNO2dCQUM1QyxhQUFhLEtBQUssY0FBYyxPQUFPLElBQUk7YUFDOUM7U0FDSixDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksS0FBSyxFQUFFO1FBQ2QsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsWUFBWSxLQUFLLE1BQU07Z0JBQ3ZCLGFBQWEsS0FBSyxJQUFJO2FBQ3pCO1NBQ0osQ0FBQyxDQUFDO0tBQ047U0FBTSxJQUFJLE9BQU8sRUFBRTtRQUNoQixTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLFNBQVMsRUFBRTtnQkFDUCxZQUFZLE9BQU8sTUFBTTtnQkFDekIsYUFBYSxPQUFPLElBQUk7YUFDM0I7U0FDSixDQUFDLENBQUM7S0FDTjtJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9