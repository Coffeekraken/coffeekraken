import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String'
            },
            theme: {
                type: 'String'
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT2xFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGtCQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxFQUN6QixPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUNsQyxzREFBc0Q7SUFDdEQsNERBQTREO0lBRTVELElBQUksU0FBUyxDQUFDO0lBRWQsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO1FBQ2xCLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDNUIsU0FBUyxFQUFFO2dCQUNQLFlBQVksS0FBSyxjQUFjLE9BQU8sTUFBTTtnQkFDNUMsYUFBYSxLQUFLLGNBQWMsT0FBTyxJQUFJO2FBQzlDO1NBQ0osQ0FBQyxDQUFDO0tBQ047U0FBTSxJQUFJLEtBQUssRUFBRTtRQUNkLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDNUIsU0FBUyxFQUFFO2dCQUNQLFlBQVksS0FBSyxNQUFNO2dCQUN2QixhQUFhLEtBQUssSUFBSTthQUN6QjtTQUNKLENBQUMsQ0FBQztLQUNOO1NBQU0sSUFBSSxPQUFPLEVBQUU7UUFDaEIsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsWUFBWSxPQUFPLE1BQU07Z0JBQ3pCLGFBQWEsT0FBTyxJQUFJO2FBQzNCO1NBQ0osQ0FBQyxDQUFDO0tBQ047SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3ZCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMifQ==