import __SInterface from '@coffeekraken/s-interface';
class SSugarcssPluginThemeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
            },
            theme: {
                type: 'String',
            },
        };
    }
}
export { SSugarcssPluginThemeMixinInterface as interface };
/**
 * @name           theme
 * @as          @s.theme
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 *
 * @param       {String}            variant             The theme variant you want
 * @param       {String}            theme               The theme you want
 * @return      {Css}         The generated css
 *
 * @snippet         @s.theme($1)
 * @s.theme $1 {
 *      $2
 * }
 *
 * @example        css
 * .my-cool-element {
 *    @s.theme(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div theme="default-dark">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!atRule.nodes) {
        throw new Error(`<red>[@s.theme]</red> The <yellow>@s.theme(...)</yellow> mixin MUST contain some children...`);
    }
    let theme = finalParams.theme, variant = finalParams.variant;
    let container;
    if (theme && variant) {
        container = new postcssApi.Rule({
            selectors: [
                `[theme^="${theme}"][theme$="${variant}"] &`,
                `&[theme^="${theme}"][theme$="${variant}"]`,
            ],
        });
    }
    else if (theme) {
        container = new postcssApi.Rule({
            selectors: [`[theme^="${theme}"] &`, `&[theme^="${theme}"]`],
        });
    }
    else if (variant) {
        container = new postcssApi.Rule({
            selectors: [`[theme$="${variant}"] &`, `&[theme$="${variant}"]`],
        });
    }
    atRule.nodes.forEach((n) => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sa0NBQW1DLFNBQVEsWUFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU8zRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEdBS2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7UUFDZixNQUFNLElBQUksS0FBSyxDQUNYLDhGQUE4RixDQUNqRyxDQUFDO0tBQ0w7SUFFRCxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxFQUN6QixPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUVsQyxJQUFJLFNBQVMsQ0FBQztJQUVkLElBQUksS0FBSyxJQUFJLE9BQU8sRUFBRTtRQUNsQixTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLFNBQVMsRUFBRTtnQkFDUCxZQUFZLEtBQUssY0FBYyxPQUFPLE1BQU07Z0JBQzVDLGFBQWEsS0FBSyxjQUFjLE9BQU8sSUFBSTthQUM5QztTQUNKLENBQUMsQ0FBQztLQUNOO1NBQU0sSUFBSSxLQUFLLEVBQUU7UUFDZCxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUUsYUFBYSxLQUFLLElBQUksQ0FBQztTQUMvRCxDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksT0FBTyxFQUFFO1FBQ2hCLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDNUIsU0FBUyxFQUFFLENBQUMsWUFBWSxPQUFPLE1BQU0sRUFBRSxhQUFhLE9BQU8sSUFBSSxDQUFDO1NBQ25FLENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=