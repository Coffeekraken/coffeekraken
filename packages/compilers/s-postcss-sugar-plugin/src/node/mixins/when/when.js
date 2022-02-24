import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           active
 * @namespace      node.mixins.when
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .myElement {
 *      display: none;
 *
 *      @sugar.when.mounted {
 *          display: block;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted', 'active', 'dark', 'light'],
                required: true,
            },
            context: {
                type: 'String',
                values: ['self', 'sibling', 'parent', 'ancestor', 'theme'],
                default: 'self',
                required: true
            },
        };
    }
}
export { postcssSugarPluginmountedMixinInterface as interface };
export default function ({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({ state: 'mounted', context: 'self' }, (params !== null && params !== void 0 ? params : {}));
    let selector;
    switch (finalParams.state) {
        case 'mounted':
            if (finalParams.context === 'parent') {
                selector = '*[mounted] > &, *.mounted > &';
            }
            else if (finalParams.context === 'ancestor') {
                selector = '*[mounted] &, *.mounted &';
            }
            else if (finalParams.context === 'sibling') {
                selector = '*[mounted] + &, *.mounted + &';
            }
            else {
                selector = '&[mounted], &.mounted';
            }
            break;
        case 'active':
            if (finalParams.context === 'parent') {
                selector = '*[active] > &. *.active > &';
            }
            else if (finalParams.context === 'ancestor') {
                selector = '*[active] &. *.active &';
            }
            else if (finalParams.context === 'sibling') {
                selector = '*[active] + &. *.active + &';
            }
            else {
                selector = '&[active], &.active';
            }
            break;
        case 'dark':
            selector = `@media (prefers-color-scheme: dark)`;
            break;
        case 'light':
            selector = `@media (prefers-color-scheme: light)`;
            break;
    }
    const wrapperRule = new postcssApi.Rule({
        selector,
    });
    // @ts-ignore
    atRule.nodes.forEach((node) => {
        wrapperRule.append(node);
    });
    atRule.replaceWith(wrapperRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUM5QyxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRyxVQUFVLEVBQUUsT0FBTyxDQUFDO2dCQUMzRCxPQUFPLEVBQUUsTUFBTTtnQkFDZixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsTUFBTSxJQUNaLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQztJQUViLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLFNBQVM7WUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxRQUFRLEdBQUcsK0JBQStCLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDM0MsUUFBUSxHQUFHLDJCQUEyQixDQUFDO2FBQzFDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFFBQVEsR0FBRywrQkFBK0IsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxRQUFRLEdBQUcsdUJBQXVCLENBQUM7YUFDdEM7WUFDRCxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsUUFBUSxHQUFHLDZCQUE2QixDQUFDO2FBQzVDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQzNDLFFBQVEsR0FBRyx5QkFBeUIsQ0FBQzthQUN4QztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxRQUFRLEdBQUcsNkJBQTZCLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsUUFBUSxHQUFHLHFCQUFxQixDQUFDO2FBQ3BDO1lBQ0QsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLFFBQVEsR0FBRyxxQ0FBcUMsQ0FBQztZQUNyRCxNQUFNO1FBQ04sS0FBSyxPQUFPO1lBQ1IsUUFBUSxHQUFHLHNDQUFzQyxDQUFDO1lBQ3RELE1BQU07S0FDVDtJQUVELE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztRQUNwQyxRQUFRO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsYUFBYTtJQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsQ0FBQyJ9