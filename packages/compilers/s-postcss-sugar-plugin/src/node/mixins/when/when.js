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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted', 'active'],
                required: true,
            },
            context: {
                type: 'String',
                values: ['self', 'sibling', 'parent', 'ancestor'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUcsVUFBVSxDQUFDO2dCQUNsRCxPQUFPLEVBQUUsTUFBTTtnQkFDZixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsTUFBTSxJQUNaLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQztJQUViLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLFNBQVM7WUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxRQUFRLEdBQUcsK0JBQStCLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDM0MsUUFBUSxHQUFHLDJCQUEyQixDQUFDO2FBQzFDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFFBQVEsR0FBRywrQkFBK0IsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxRQUFRLEdBQUcsdUJBQXVCLENBQUM7YUFDdEM7WUFDRCxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsUUFBUSxHQUFHLDZCQUE2QixDQUFDO2FBQzVDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQzNDLFFBQVEsR0FBRyx5QkFBeUIsQ0FBQzthQUN4QztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxRQUFRLEdBQUcsNkJBQTZCLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsUUFBUSxHQUFHLHFCQUFxQixDQUFDO2FBQ3BDO1lBQ0QsTUFBTTtLQUNiO0lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3BDLFFBQVE7S0FDWCxDQUFDLENBQUM7SUFFSCxhQUFhO0lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDIn0=